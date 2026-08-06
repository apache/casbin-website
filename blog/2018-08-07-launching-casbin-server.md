---
title: Casbin Server is Launched!
authors: [BetaCat0]
---

People often ask whether Casbin can run as a service instead of a library. The answer is **yes**. We have launched [Casbin Server](https://github.com/apache/casbin-server) as a concrete **Access Control as a Service** solution.

<!-- truncate -->

**Casbin Server** is under active development by the core team. Current features:

- Written in Go.
- Manages many Casbin instances so you can centralize policy enforcement from multiple services.
- **gRPC** for all client communication; **REST** support is planned.
- A web admin UI for managing instances, models, policy storage, and load balancing.

Source code: https://github.com/apache/casbin-server

Issues and pull requests are welcome.
