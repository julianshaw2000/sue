# CLAUDE_RULE__ANGULAR_HTTP_RESPONSE.md

## Rule Name
Angular HTTP response: signals-first + httpResource

## Goal
Enforce a single, consistent Angular **HTTP response** pattern:
- `httpResource` owns request lifecycle
- components consume signals only
- explicit loading/success/error states
- typed responses end-to-end
- no manual subscriptions

---

## Hard Requirements (MUST)

### 1) Where HTTP calls live
- MUST put all `httpResource(...)` and `HttpClient` usage in a **data access service** or **facade**.
- MUST NOT use `HttpClient` or `httpResource` directly in components.

✅ OK
- `src/app/data-access/*`
- `src/app/features/*/data/*`
- `src/app/features/*/*.facade.ts`

❌ Not OK
- `*.component.ts` calling `HttpClient` or creating `httpResource`

---

### 2) Subscriptions
- MUST NOT call `.subscribe()` in services, facades, or components for normal data flow.
- MUST NOT use `async` pipe with `httpResource` output (it is signal-based).
- If side effects are required, MUST use `effect(...)` and keep the side effect minimal and local.

---

### 3) HTTP response states are explicit
- MUST expose these as signals for every resource:
  - `isLoading` (from resource)
  - `value` mapped to domain-ready data via `computed`
  - `error` via `computed`
  - `errorMessage` via `computed` (UI-friendly string)

Example shape (required pattern):
```ts
isLoading = this.resource.isLoading;
data = computed(() => this.resource.value()?.results ?? []);
error = computed(() => this.resource.error());
errorMessage = computed(() => this.error() ? `Error loading X: ${this.error()?.message}` : null);
