---
title: Authorization in APISIX Using Casbin
authors: [rushitote]
---

## Introduction

[APISIX](https://apisix.apache.org/) is a high-performance, scalable, cloud-native API gateway built on Nginx and etcd, and an Apache Software Foundation project. It ships with many plugins for authentication, monitoring, routing, and more. Plugins are hot-reloaded without restarts, so you can change behavior on the fly.

When you need **authorization** beyond simple checks, the **authz-casbin** plugin can help. It is an APISIX plugin built on [Lua Casbin](https://github.com/apache/casbin-lua-casbin/) that enforces flexible authorization using models such as ACL, RBAC, and ABAC. [Casbin](/) is an authorization library (originally in Go, now ported to many languages); Lua Casbin is the Lua port. We proposed the plugin in the APISIX repo ([#4674](https://github.com/apache/apisix/issues/4674)); after review and improvements, it was merged ([#4710](https://github.com/apache/apisix/pull/4710)).

<!-- truncate -->

This post shows how to implement **Role-Based Access Control (RBAC)** in APISIX using authz-casbin.

**Note:** Casbin handles **authorization** only. Use another plugin or your own logic for **authentication** (identifying the user).

## Creating a model

The plugin authorizes each request using three parameters: **subject**, **object**, and **action**. The subject comes from a header (e.g. `username: alice`), the object is the URL path, and the action is the HTTP method.

Suppose we have three paths: `/`, `/res1`, and `/res2`. We want a model like this:

![image](/img/blog/model.png)

So: any user (e.g. `jack`) can access `/`; users with the `admin` role (e.g. `alice`, `bob`) can access everything; and non-admin users are limited to `GET`. Here is a model that does that:

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

## Creating a policy

For the scenario above, the policy could be:

```csv
p, *, /, GET
p, admin, *, *
g, alice, admin
g, bob, admin
```

The matcher means:

1. **`(g(r.sub, p.sub) || keyMatch(r.sub, p.sub))`** — The request subject either has the policy subject as a role or matches it via `keyMatch`. For `keyMatch` and other built-ins, see [Lua Casbin BuiltInFunctions](https://github.com/apache/casbin-lua-casbin/blob/master/src/util/BuiltInFunctions.lua).
2. **`keyMatch(r.obj, p.obj)`** — The request path matches the policy object.
3. **`keyMatch(r.act, p.act)`** — The request method matches the policy action.

## Enabling the plugin on a route

After creating the model and policy, enable the plugin on a route via the APISIX Admin API. Using **file paths**:

```sh
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "authz-casbin": {
            "model_path": "/path/to/model.conf",
            "policy_path": "/path/to/policy.csv",
            "username": "username"
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "uri": "/*"
}'
```

The `username` field is the **header name** that carries the subject (e.g. if the header is `user: alice`, set `"username": "user"`).

To use **inline** model and policy text instead of files, use the `model` and `policy` fields:

```sh
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "authz-casbin": {
            "model": "[request_definition]
            r = sub, obj, act

            [policy_definition]
            p = sub, obj, act

            [role_definition]
            g = _, _

            [policy_effect]
            e = some(where (p.eft == allow))

            [matchers]
            m = (g(r.sub, p.sub) || keyMatch(r.sub, p.sub)) && keyMatch(r.obj, p.obj) && keyMatch(r.act, p.act)",

            "policy": "p, *, /, GET
            p, admin, *, *
            g, alice, admin
            g, bob, admin",

            "username": "username"
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "uri": "/*"
}'
```

## Using a global model and policy

To use one model and policy for **all** routes, store them in the plugin’s metadata. Send a `PUT` request:

```sh
curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/authz-casbin -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -i -X PUT -d '
{
"model": "[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = (g(r.sub, p.sub) || keyMatch(r.sub, p.sub)) && keyMatch(r.obj, p.obj) && keyMatch(r.act, p.act)",

"policy": "p, *, /, GET
p, admin, *, *
g, alice, admin
g, bob, admin"
}'
```

Then enable the plugin on a route (it will use the metadata). Example:

```sh
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "authz-casbin": {
            "username": "username"
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "uri": "/route1/*"
}'
```

The route then uses the shared model and policy from metadata. To change them, send another `PUT` to the plugin metadata; all routes using it will pick up the update.

## Use cases

- **Per-route authorization** — Attach the plugin to any route with your model and policy. Good when different routes need different permissions or when policies are large (each route only loads what it needs).
- **Global model/policy** — Store one model and policy in plugin metadata and reference it from many routes. Updating policy in one place (e.g. etcd) updates all those routes.
