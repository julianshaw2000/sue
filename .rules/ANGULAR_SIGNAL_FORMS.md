# Claude Code Rules — Angular Signal Forms (@angular/forms/signals)

## Goal
Refactor and build forms using Angular Signal Forms. Keep a strict, repeatable pattern across the app.

## Hard rules (must follow)
1. Use **one model signal** as the single source of truth:
   - `model = signal<T>(initialData)`
2. Build the form with `form(model, (p) => { ...rules... })`
3. Define validation rules in a **separate file** next to the model:
   - `customer.model.ts` (interface + initialData + rules function)
4. Bind inputs in templates using **`[formField]` only**.
5. Read field state using **signal calls**:
   - `field().valid()`, `field().invalid()`, `field().errors()`, `field().touched()`, `field().dirty()`
6. Submit handling must prevent refresh:
   - `(submit)="onSubmit($event)"` and `event.preventDefault()`
7. No `ReactiveFormsModule` `FormGroup/FormControl`, no `ngModel`.
8. No manual `(input)` handlers for simple binding.
9. No `.path.*` accessors unless the project already proves it exists.

## File structure
- `src/app/features/<feature>/models/<thing>.model.ts`
  - `export interface Thing { ... }`
  - `export const initialThing: Thing = { ... }`
  - `export function thingRules(p: SchemaPath<Thing>) { ... }`
- `src/app/features/<feature>/<thing>-form.component.ts`
- `src/app/features/<feature>/<thing>-form.component.html`

## Model + schema rules
- Prefer `string: ''`, `boolean: false`, `number: null` (use `number | null`)
- Avoid `NaN` in initial data.
- Put all messages in the schema rules.
- Use `when` for conditional validation.
- Range checks should only run when a value exists:
  - `when: ({ value }) => value() != null`

## Component rules
- Imports:
  - `import { FormField, form } from '@angular/forms/signals';`
- Component pattern:
  - `model = signal<T>(initialData);`
  - `theForm = form(this.model, (p) => rules(p));`
- Do not duplicate state in extra signals unless you need derived UI state via `computed`.

## Template rules
- Use:
  - `<input [formField]="theForm().name" />`
  - `<input type="checkbox" [formField]="theForm().useEmail" />`
- Error rendering pattern:
  - Show errors only after touched (or after submit attempt if you add that).
  - Prefer listing all errors:
    - `@for (e of theForm().name().errors(); track e) { ... }`

## Refactor rules (when converting old forms)
Delete:
- `FormGroup`, `FormControl`, `FormBuilder`
- `Validators.*` usage
- `[(ngModel)]`
- `(input)="..."` setters for plain fields
- Manual `isValid()` helpers

Replace with:
- model signal + `form(model, rules)`
- `[formField]` bindings
- schema-based validators from `@angular/forms/signals`

## Required output format from Claude
When you change code, output:
1. Files changed (with paths)
2. Full updated code for each changed file (no diffs)
3. Short note listing removed patterns (FormGroup/ngModel/etc.)

## Quick example skeleton

### models/customer.model.ts
```ts
import { email, min, max, minLength, required } from '@angular/forms/signals';

export interface Customer {
  name: string;
  email: string;
  useEmail: boolean;
  age: number | null;
}

export const initialCustomer: Customer = {
  name: '',
  email: '',
  useEmail: true,
  age: null,
};

export function customerRules(p: any) {
  required(p.name, { message: 'Name is required' });
  minLength(p.name, 3, { message: 'Name must be at least 3 characters' });

  required(p.email, {
    message: 'Email is required',
    when: ({ valueOf }: any) => valueOf(p.useEmail),
  });
  email(p.email, { message: 'Email is invalid' });

  min(p.age, 13, { message: 'Age must be > 13', when: ({ value }: any) => value() != null });
  max(p.age, 120, { message: 'Age must be < 120', when: ({ value }: any) => value() != null });
}
