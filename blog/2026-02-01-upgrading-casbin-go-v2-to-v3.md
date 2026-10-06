---
title: "Upgrading Casbin (Go) from v2 to v3: A Complete Migration Guide"
slug: upgrading-casbin-go-v2-to-v3
authors: [hsluoyz]
tags: [casbin, go, migration, upgrade, v3]
---

If you're running Casbin v2 in production and wondering about the upgrade path to v3, this guide is for you. We'll cover everything you need to know about the transition, from understanding what changed to executing a safe production migration.

<!--truncate-->

## What Changed in v3?

The good news: **v3 is primarily a module path change with full backward compatibility**. The core authorization logic, APIs, and functionality remain unchanged. This was an intentional decision to minimize disruption while following Go's semantic versioning conventions.

### The Main Change: Module Path

The only breaking change in v3 is the Go module path:

```go
// v2
import "github.com/casbin/casbin/v2"

// v3
import "github.com/casbin/casbin/v3"
```

That's it. Your existing policies, models, and code logic don't need to change. The migration is mechanical: update import statements and your go.mod file.

### Why Release v3?

You might wonder why release a new major version for just an import path change. The answer is semantic versioning. Go's module system uses the major version number in the import path (`/v2`, `/v3`, etc.). This allows multiple major versions to coexist in the same dependency tree, which is crucial for large applications with many dependencies.

By releasing v3, we've:
- Aligned with Go's semantic import versioning
- Enabled gradual migration in complex dependency graphs
- Set the stage for future enhancements without breaking existing v2 users

## What Stayed the Same?

Everything else. Seriously.

- **All APIs remain identical** - `Enforce()`, `AddPolicy()`, `GetAllRoles()`, and every other method works exactly as before
- **Model and policy syntax unchanged** - Your existing `.conf` model files and `.csv` policy files work without modification
- **Adapter interface unchanged** - The `persist.Adapter` methods are the same; adapters only need a release built against the v3 module path
- **Performance characteristics** - No performance regressions or improvements; it's the same engine
- **Middleware integrations** - Middleware works the same way once it imports the same major version as your enforcer

## New Features in v3

Since the v3.0.0 release in December 2025, several new features have been added:

### v3.7.0+: Enhanced Logger Integration
You can now integrate custom loggers into Casbin's core enforcement and policy management operations, providing better observability:

```go
enforcer.SetLogger(yourCustomLogger)
```

### v3.8.0+: GetAllUsers() API
A new API to distinguish users from roles:

```go
users, err := enforcer.GetAllUsers()
```

This is particularly useful in RBAC systems where you need to list actual users separately from role definitions.

### v3.9.0+: Built-in Cycle Detection
The enforcer now includes automatic detection of cycles in role hierarchies, preventing infinite loops:

```go
// Automatically detects and prevents circular role assignments
enforcer.AddGroupingPolicy("alice", "admin")
enforcer.AddGroupingPolicy("admin", "alice") // Will be detected as a cycle
```

### v3.10.0+: Explain() API for AI-Powered Authorization Insights
The latest feature leverages LLM APIs to explain authorization decisions in natural language:

```go
enforcer.SetAIConfig(casbin.AIConfig{
    Endpoint: "https://api.openai.com/v1/chat/completions",
    APIKey:   os.Getenv("OPENAI_API_KEY"),
    Model:    "gpt-4",
})

explanation, err := enforcer.Explain("alice", "data1", "read")
// e.g. "Alice can read data1 because she has the 'reader' role..."
```

This is particularly valuable for debugging complex policies and helping non-technical stakeholders understand authorization decisions.

## Migration Strategy

### For New Projects

Simple: just use v3 from the start.

```bash
go get github.com/casbin/casbin/v3
```

```go
import "github.com/casbin/casbin/v3"
```

### For Existing v2 Projects

The migration involves three steps:

#### Step 1: Update Your go.mod

```bash
go get github.com/casbin/casbin/v3
go mod tidy
```

#### Step 2: Update Import Statements

Find and replace all Casbin imports across your codebase:

```bash
# Using sed on Unix/Linux/Mac
find . -type f -name '*.go' -exec sed -i 's|github.com/casbin/casbin/v2|github.com/casbin/casbin/v3|g' {} +

# Or manually in your editor
# Find: github.com/casbin/casbin/v2
# Replace: github.com/casbin/casbin/v3
```

#### Step 3: Update Adapter Imports (If Applicable)

An adapter implements `persist.Adapter` from one specific major version, because `model.Model` in `casbin/v2` and `casbin/v3` are different Go types. A v3 enforcer therefore needs an adapter release that imports `github.com/casbin/casbin/v3`. Check the adapter's `go.mod`:

```go
// Example: the PostgreSQL adapter already depends on casbin/v3
import pgadapter "github.com/apache/casbin-pg-adapter"

// The file adapter is built in and ships with each major version
```

If your adapter has not been updated yet, stay on v2 for that service until it is, or open an issue in the adapter's repository.

### Rollback Plan

If you need to rollback:

1. **Code level**: Revert import changes (use version control)
2. **Dependency level**: `go get github.com/casbin/casbin/v2@latest`
3. **Deploy**: Use your standard deployment process to revert

The beauty of this migration is that rollback is trivial - just revert the import changes and redeploy.

## Do I Need to Migrate My Policy Database?

**No.** Your existing policy data remains unchanged. The policies are stored as simple strings (subject, object, action, etc.) and have no dependency on the Casbin version.

## Testing Your Migration

### Automated Testing

Your existing tests should pass without modification:

```go
func TestPolicyEnforcement(t *testing.T) {
    // This test works identically in v2 and v3
    e, _ := casbin.NewEnforcer("model.conf", "policy.csv")
    
    ok, _ := e.Enforce("alice", "data1", "read")
    if !ok {
        t.Error("Expected alice to have read access to data1")
    }
}
```

### Integration Testing

Middleware that takes a `*casbin.Enforcer` is tied to one major version in the same way as adapters. If your middleware still imports `casbin/v2`, calling the enforcer directly is a few lines:

```go
// Example with Gin
import (
    "net/http"

    "github.com/casbin/casbin/v3"
    "github.com/gin-gonic/gin"
)

func Authorizer(e *casbin.Enforcer) gin.HandlerFunc {
    return func(c *gin.Context) {
        ok, err := e.Enforce(c.GetString("user"), c.Request.URL.Path, c.Request.Method)
        if err != nil || !ok {
            c.AbortWithStatus(http.StatusForbidden)
            return
        }
        c.Next()
    }
}
```

### Load Testing

Run your standard load tests against the v3 build. Performance characteristics should be identical to v2.

### Policy Verification

Compare policy evaluation across versions:

```bash
# Export policies from v2
# Load into v3
# Run test cases against both
# Compare results
```

If you see any differences, it's likely a bug - please report it!

## Common Pitfalls

### Pitfall 1: Mixed v2/v3 Dependencies

**Problem**: Some dependencies use Casbin v2, others use v3, causing conflicts.

**Solution**: The build itself is fine: Go's module system treats v2 and v3 as separate packages, so both can sit in the same dependency tree. What you cannot do is pass a v3 enforcer to a library that expects a v2 one. Keep the enforcer, its adapter, and its middleware on the same major version.

### Pitfall 2: Adapter Version Mismatch

**Problem**: Using a v2 adapter with Casbin v3 (or vice versa).

**Solution**: This shows up as a compile error, not a runtime surprise. Check which Casbin major version the adapter's `go.mod` requires and use a release that matches your enforcer.

### Pitfall 3: Forgetting Internal Packages

**Problem**: Updated main application imports but forgot internal packages or tools.

**Solution**: Use `go mod graph` and `go mod why` to find all Casbin dependencies:

```bash
go mod graph | grep casbin
```

### Pitfall 4: Custom Adapter Compilation Issues

**Problem**: Custom adapter won't compile after upgrade.

**Solution**: The adapter interface didn't change, so this suggests an import issue. Check that all Casbin imports in your adapter use v3:

```go
import (
    "github.com/casbin/casbin/v3"
    "github.com/casbin/casbin/v3/persist"
)
```

## FAQ

### Q: Is v2 still maintained?

As of this writing, v2 receives critical bug fixes, but new features are developed for v3. Plan to migrate within the next 6-12 months.

### Q: Can I gradually migrate by having some services on v2 and others on v3?

Yes! They can even share the same policy database. This is one of the benefits of the minimal changes in v3.

### Q: Will my middleware (Gin, Echo, Fiber, etc.) work?

Only if it imports the same major version as your enforcer. Check the middleware's `go.mod`; if it is still on v2, call `Enforce()` from a small handler of your own as shown above.

### Q: Do I need to update my .conf model files?

No. Model file syntax is unchanged.

### Q: Do I need to update my .csv policy files?

No. Policy file format is unchanged.

### Q: What about WatcherEx, FilteredAdapter, and other interfaces?

All interfaces remain unchanged. If your code implements these interfaces, no modifications needed (beyond import paths).

### Q: Performance impact?

None. v3 uses the same evaluation engine as v2.

### Q: Can I use v3 with Go 1.16?

Check the go.mod in the Casbin v3 repository for the minimum supported Go version. Generally, using the latest stable Go version is recommended.

Happy upgrading!
