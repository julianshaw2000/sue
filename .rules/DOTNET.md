# C# Website Project – Coding Rules (ASP.NET Core)

These rules are mandatory for all C# code in this repository.

---

## 1. Project & Language Settings

- Enable nullable reference types.
- Treat nullable warnings as errors.
- Use the latest stable ASP.NET Core.
- Use **either** Minimal APIs **or** Controllers per project. Do not mix without a clear reason.
- Enforce formatting via `.editorconfig` and `dotnet format`.

---

## 2. Naming & Style Rules

- `PascalCase`: classes, records, enums, public methods, properties.
- `camelCase`: parameters, local variables, private fields.
- One public type per file.
- No vague names (`Helper`, `Manager`, `Data`, `Stuff`).
- Methods must be short and do one thing.
- Prefer clarity over cleverness.

---

## 3. Architecture Rules

Use clear layer separation:

- **Web/API**
  - HTTP concerns only
  - authentication, authorization
  - request validation
  - response shaping

- **Application**
  - business rules
  - use cases
  - interfaces

- **Infrastructure**
  - EF Core
  - external APIs
  - storage
  - email

Dependency direction is one-way:

Web → Application → Infrastructure

Application and domain code must not reference Web.

---

## 4. Dependency Injection Rules

- Register services by interface.
- Keep constructors small.
- Lifetimes:
  - `Scoped`: request services, DbContext
  - `Singleton`: stateless services only
- Do not use service locator patterns.
- Do not inject `IServiceProvider` into business logic.

---

## 5. Configuration Rules

- Do not read raw config values throughout the codebase.
- Use the Options pattern.
- Bind config sections to typed option classes.
- Inject options using `IOptions<T>` or `IOptionsSnapshot<T>`.

---

## 6. Async & Concurrency Rules

- All I/O paths must be async end-to-end.
- Do not use `.Result`, `.Wait()`, or blocking calls.
- Support `CancellationToken` in:
  - controllers/endpoints
  - EF Core queries
  - outbound HTTP calls
- Async is a design choice, not a patch.

---

## 7. Data Access Rules (EF Core)

- `DbContext` must be scoped per request.
- Use tracking only when updating data.
- Use `AsNoTracking()` for read-only queries.
- Project to DTOs for API responses.
- Avoid loading full object graphs without need.

---

## 8. API Design Rules

- Validate input early.
- Return consistent error responses.
- Use appropriate HTTP status codes.
- Do not leak internal exceptions or stack traces.
- Keep response models stable and explicit.

---

## 9. Logging & Error Handling

- Use `ILogger<T>` only.
- Log structured data, not string concatenation.
- Centralised exception handling only.
- Always log:
  - correlation/request id
  - user or tenant id (if present)
  - key business identifiers
- Never log secrets or sensitive personal data.

---

## 10. Security Rules

- HTTPS only.
- Use standard auth (OIDC / JWT).
- Enforce authorization policies, not inline checks.
- Store secrets outside the repository.
- Validate uploads and apply size limits.
- Apply rate limiting on public endpoints.

---

## 11. Testing Rules

Code is not complete unless:

- Application logic has unit tests.
- API endpoints have integration tests.
- Auth failures are tested.
- CI runs:
  - build
  - tests
  - formatting checks

---

## 12. Code Review Enforcement

Claude must:
- Flag violations of these rules.
- Refactor code to comply.
- Reject patterns that break layering, async rules, or DI rules.
- Prefer simple, explicit solutions.
