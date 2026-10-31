---
title: "How AWS Uses Apache Casbin in Its Visual Asset Management System"
description: "AWS's open-source Visual Asset Management System uses pycasbin for a two-tier ABAC/RBAC permission model, from API route checks to object-level access."
slug: aws-visual-asset-management-system-casbin
authors: [hsluoyz]
tags: [casbin, aws, abac, rbac, adopters]
---

[AWS Visual Asset Management System (VAMS)](https://github.com/awslabs/visual-asset-management-system) is AWS's open-source platform for managing and distributing visual assets for physical AI. When AWS shipped VAMS 2.0, it replaced Cognito groups with a Casbin-based ABAC/RBAC permission system. The recently announced [2.6 release](https://aws.amazon.com/blogs/physical-ai/visual-asset-management-system-2-6-release/) keeps the same design and adds a centralized API authorizer on top of it.

<!--truncate-->

## Two tiers, one enforcer

VAMS checks every API request against two independent tiers. Tier 1 decides whether the user's role may call the endpoint, comparing the HTTP method against the route path. Tier 2 decides whether that role may act on the specific object, comparing the method against entity attributes such as `databaseId`, `assetName` and `tags`. Both tiers must allow the request. If either denies, the call is rejected.

The backend uses [pycasbin](https://github.com/casbin/pycasbin). Each user gets a `CasbinEnforcer` wrapping a `FastEnforcer` built from an in-memory model and a string adapter. The policy is assembled at runtime from the user's roles and constraints stored in DynamoDB and cached per user for 60 seconds. If the policy cannot be fetched, the enforcer falls back to a deny-all policy rather than failing open.

The model's matcher is `g(r.sub, p.sub) && eval(p.obj_rule) && r.act == p.act`, so a role's constraints can carry the object-level expression for a resource and action. Casbin's role links handle the user-to-role mapping, and the constraints supply the ABAC part.

## What changed in 2.6

The 2.6 release adds a single centralized authorizer for the API layer, consolidating the multi-factor and claims logic that previously lived in individual handlers. It also adds advanced AWS IAM role customization and Cognito OIDC federation. The authorization model itself is unchanged: Casbin still evaluates the two tiers, and custom Lambda authorizers can add IP restrictions on top.

The VAMS documentation describes the full model, object types and constraint fields in [Permissions Model](https://github.com/awslabs/visual-asset-management-system/blob/main/documentation/docusaurus-site/docs/concepts/permissions-model.md). The enforcer implementation is in [the authz module](https://github.com/awslabs/visual-asset-management-system/blob/main/backend/backend/handlers/authz/__init__.py).

## Learn more

- [AWS blog: Visual Asset Management System 2.6 release](https://aws.amazon.com/blogs/physical-ai/visual-asset-management-system-2-6-release/)
- [VAMS on GitHub](https://github.com/awslabs/visual-asset-management-system)
- [Apache Casbin adopters](https://casbin.apache.org/docs/adopters)

AWS is one of many organizations using Apache Casbin. If your project uses Casbin, we would be glad to add it to the adopters list.