---
title: Authorization in APISIX Using Casbin
description: Enforce and update Casbin RBAC on the APISIX request path with reproducible allow, deny, and cleanup checks.
authors: [rushitote, yilialin]
---

## Introduction

[Apache APISIX](https://apisix.apache.org/) can enforce Casbin authorization
policies at the gateway with its built-in
[`authz-casbin`](https://apisix.apache.org/docs/apisix/plugins/authz-casbin/)
plugin. The plugin uses
[Lua Casbin](https://github.com/apache/casbin-lua-casbin) and supports access
control models such as ACL, RBAC, and ABAC.

This guide puts a small RBAC policy on the APISIX request path. You will verify
allowed and denied requests, then update a shared policy through plugin
metadata without changing the route.

The Casbin community originally proposed the integration in
[APISIX Issue #4674](https://github.com/apache/apisix/issues/4674), and
[APISIX PR #4710](https://github.com/apache/apisix/pull/4710) added the plugin.

:::info August 2026 refresh

This guide was refreshed in August 2026. The examples were validated with
Apache APISIX 3.17.0. The original 2021 author remains credited, and Yilia Lin
is added for the 2026 refresh.

:::

<!-- truncate -->

:::warning Authentication boundary

Casbin performs authorization, not authentication. The example uses a `user`
request header as the subject only to keep the test small. In production, do
not trust an identity header supplied directly by a client. An authentication
layer or trusted proxy should establish the identity and remove or overwrite
untrusted values before Casbin evaluates the request.

:::

## Prerequisites and starting state

This guide starts with a disposable Apache APISIX 3.17.0 instance already
running. If you need a local instance, follow the
[APISIX Docker deployment guide](https://apisix.apache.org/docs/docker/manual/)
and pin the APISIX image to `apache/apisix:3.17.0-debian`.

The instance must have:

- the data plane available at `http://127.0.0.1:9080`;
- the Admin API available at `http://127.0.0.1:9180`;
- the built-in `authz-casbin` and `mocking` plugins enabled.

You also need `curl` and `jq`. Set `admin_key` to the key configured for your
Admin API:

```sh
export admin_key='<your-admin-api-key>'
```

Replace the placeholder before continuing. Confirm that the Admin API is
reachable and the plugin is enabled:

```sh
curl --fail-with-body \
  "http://127.0.0.1:9180/apisix/admin/plugins/list" \
  -H "X-API-KEY: $admin_key" | \
jq -e '(["authz-casbin", "mocking"] - .) | length == 0'
```

The command should print `true`. Do not publish the Admin API to an untrusted
network or reuse demonstration credentials in another environment.

## Define the model and policy

The plugin evaluates three request values:

- `sub`: the subject from the configured request header;
- `obj`: the request URI path; and
- `act`: the HTTP method.

Create `model.conf`:

```ini
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = (g(r.sub, p.sub) || keyMatch(r.sub, p.sub)) && keyMatch(r.obj, p.obj) && keyMatch(r.act, p.act)
```

Create `policy.csv`:

```csv
p, *, /anything, GET
p, admin, *, *
g, alice, admin
```

This policy allows any subject to send `GET /anything`. It also assigns
`alice` the `admin` role, which can access every path with every method.

## Store the shared policy in plugin metadata

Load the files as JSON strings and write them to APISIX plugin metadata:

```sh
jq -n \
  --rawfile model model.conf \
  --rawfile policy policy.csv \
  '{model: $model, policy: $policy}' | \
curl --fail-with-body \
  "http://127.0.0.1:9180/apisix/admin/plugin_metadata/authz-casbin" \
  -H "X-API-KEY: $admin_key" \
  -H "Content-Type: application/json" \
  -X PUT \
  --data-binary @-
```

Plugin metadata provides one model and policy to routes that enable
`authz-casbin` without defining their own route-local model and policy.

## Enable authorization on a route

Create a route and tell the plugin to read the subject from the `user` header:

```sh
curl --fail-with-body \
  "http://127.0.0.1:9180/apisix/admin/routes/casbin-demo" \
  -H "X-API-KEY: $admin_key" \
  -H "Content-Type: application/json" \
  -X PUT \
  -d '{
    "uri": "/*",
    "plugins": {
      "authz-casbin": {
        "username": "user"
      },
      "mocking": {
        "_meta": {
          "priority": 1000
        },
        "response_status": 200,
        "response_example": "{\"message\":\"authorized\"}"
      }
    },
    "upstream": {
      "type": "roundrobin",
      "nodes": {
        "127.0.0.1:1": 1
      }
    }
  }'
```

The route uses the model and policy from plugin metadata because it only
defines the `username` field locally. A route-local model and policy, when
configured, take precedence over plugin metadata.

The `mocking` plugin gives allowed requests a deterministic local response, so
the example does not depend on a public upstream. Its route-local priority is
lower than `authz-casbin`, which makes the authorization decision run first.
The unreachable upstream is therefore not contacted. This priority override
and mock response are test fixtures, not production recommendations.

## Verify allow and deny decisions

An anonymous request to the public path is allowed:

```sh
curl -i http://127.0.0.1:9080/anything
```

Expected status:

```text
HTTP/1.1 200 OK
{"message":"authorized"}
```

`bob` does not have the `admin` role, so a different path is denied:

```sh
curl -i http://127.0.0.1:9080/anything/res -H 'user: bob'
```

Expected result:

```text
HTTP/1.1 403 Forbidden
{"message":"Access Denied"}
```

`alice` has the `admin` role, so the same request is allowed:

```sh
curl -i http://127.0.0.1:9080/anything/res -H 'user: alice'
```

Expected status:

```text
HTTP/1.1 200 OK
{"message":"authorized"}
```

## Update the shared policy

Add a direct permission for `bob` to `policy.csv`:

```csv
p, *, /anything, GET
p, admin, *, *
p, bob, /anything/res, GET
g, alice, admin
```

Run the plugin metadata command again. Routes that reference this metadata use
the updated policy without changing their route configuration. Repeat the
request:

```sh
curl -i http://127.0.0.1:9080/anything/res -H 'user: bob'
```

The expected result is now:

```text
HTTP/1.1 200 OK
{"message":"authorized"}
```

## Choosing the configuration scope

Use plugin metadata when several routes should share one model and policy. Use
a route-local model and policy when a route needs an independent authorization
shape. For the complete configuration schema and file-based alternative, see
the [APISIX `authz-casbin` plugin reference](https://apisix.apache.org/docs/apisix/plugins/authz-casbin/).

## Clean up

Remove the test route:

```sh
curl --fail-with-body \
  "http://127.0.0.1:9180/apisix/admin/routes/casbin-demo" \
  -H "X-API-KEY: $admin_key" \
  -X DELETE
```

Remove the shared plugin metadata:

```sh
curl --fail-with-body \
  "http://127.0.0.1:9180/apisix/admin/plugin_metadata/authz-casbin" \
  -H "X-API-KEY: $admin_key" \
  -X DELETE
```
