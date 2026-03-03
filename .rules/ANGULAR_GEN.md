# CLAUDE.md (Claude Rule)

You are working in an Angular app using modern Angular best practices (standalone components by default).
Follow the rules below exactly.

## 1) Project structure (Deborah Kurata-style)
Use these top-level folders under `src/app/`:

- `core/` (singleton services + app-wide setup)
  - auth/session, http interceptors, route guards, global error handling
  - app shell layout, app config helpers
  - only things used across many features and created once

- `shared/` (reusable building blocks)
  - dumb UI components, pipes, directives, small utilities
  - MUST be feature-agnostic (no feature business rules)

- `features/` (vertical slices)
  - each feature owns its pages, UI, state, and domain logic
  - feature folder examples:
    - `features/properties/`
    - `features/tenants/`
    - `features/billing/`

- `app.config.ts` (root providers)
- `app.routes.ts` (root routing)

Keep routing close to the feature:
- each feature should have `feature.routes.ts` (or `routes.ts`) and be lazy-loaded from `app.routes.ts`.

Angular workspace basics:
- app code lives in `src/app/` with `app.config.ts`, `app.routes.ts`, and standalone components. :contentReference[oaicite:1]{index=1}

## 2) Dependency rules (hard rules)
- `core/` can depend on Angular + shared utilities, but NOT on `features/`.
- `shared/` can depend on Angular only. No dependencies on `core/` or `features/`.
- `features/` can depend on `core/` and `shared/`.
- Never import one feature into another feature directly.
  - share code via `shared/` or extract a cross-feature service into `core/`.

## 3) Naming + files (Angular style guide)
- Use hyphen-separated file names: `user-profile.ts`, `property-details.ts`. :contentReference[oaicite:2]{index=2}
- Spec files end with `.spec.ts`. :contentReference[oaicite:3]{index=3}
- Keep folders small and obvious. Don't create deep nesting unless it prevents name collisions.

## 4) Standalone-first rules
- Default every component, directive, and pipe to `standalone: true`.
- Use `imports: []` on components instead of NgModules.
- Use route-level lazy loading for features via `loadChildren` / `loadComponent` in `app.routes.ts`.

## 5) Signal Forms rules (Angular v21+)
Signal Forms are experimental. Use them intentionally and consistently. :contentReference[oaicite:4]{index=4}

### Form architecture
- One `signal<TModel>` is the single source of truth for the form model.
- Create the field tree with `form(modelSignal, ...)`.
- Bind inputs using `[formField]` (NOT `[field]`). :contentReference[oaicite:5]{index=5}
- Read field state via `field()` then signals like `value()`, `valid()`, `touched()`.
- Update values via `field().value.set(...)` when needed (no manual `(input)` syncing).

### Template rules
- DELETE manual `[value]` bindings, `(input)` handlers, and "updateField(...)" helpers.
- Prefer native inputs or signal-form custom controls.
- Only use ControlValueAccessor for backwards compatibility. :contentReference[oaicite:6]{index=6}

## 6) Change strategy (how to refactor safely)
When refactoring existing code:
1. Identify the model shape and create `signal<TModel>(initialValue)`.
2. Build the FieldTree with `form(...)`.
3. Replace template bindings with `[formField]="..."`.
4. Move validation into the form/schema layer.
5. Remove obsolete reactive-forms plumbing and custom value handlers.

## 7) What to output (required)
When you generate code:
- Provide file paths at the top of each snippet.
- Keep feature code inside `src/app/features/<feature>/...`.
- Keep global singletons in `src/app/core/...`.
- Keep reusable UI/util in `src/app/shared/...`.
- Keep changes small and consistent with existing conventions in the repo.

## 8) Non-negotiables
- Do not introduce NgModules unless the repo already depends on them for legacy areas.
- Do not duplicate logic across features.
- Keep public APIs small: export only what a consumer needs.
