# CLAUDE.md — Angular Signals Input/Output Rules (v17+)

Use these rules when writing or refactoring Angular components that use **signals**, `input()`, `output()`, and `computed()`.

---

## Core rules

### Rule 1 — Inputs are signal-based by default
- Use `input<T>()` for all new component inputs.
- Always type inputs.
- Always provide a safe default.
- Do data cleanup at the boundary using `transform`.

```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-snacklist',
  standalone: true,
  template: `...`,
})
export class SnacklistComponent {
  filterCriteria = input('', {
    transform: (v: string | undefined) => (v ?? '').trim().toLowerCase(),
  });
}
Rule 2 — Inputs are read-only inside the child
Never mutate input state in the child.

Treat inputs as immutable signals.

Any change request must go through an output.

Rule 3 — Derived UI state uses computed()
Any value derived from inputs, services, or local state must live in computed().

Computed functions must be pure.

No logging, HTTP calls, or state writes inside computed().

import { computed, inject } from '@angular/core';

export class SnacklistComponent {
  private snackService = inject(SnackService);

  snacks = this.snackService.snacks;

  filteredSnacks = computed(() => {
    const filter = this.filterCriteria();
    return this.snacks().filter(s =>
      s.name.toLowerCase().includes(filter)
    );
  });
}
Rule 4 — Outputs use output<T>()
Use output<T>() for all new outputs.

Emit only from explicit user actions or clear state transitions.

Name outputs using:

Past tense: snackSelected, saved, closed

Change events: filterCriteriaChange, valueChange

import { output } from '@angular/core';

export class SnacklistComponent {
  snackSelected = output<Snackitem>();

  onSnackClick(snack: Snackitem) {
    this.snackSelected.emit(snack);
  }
}
Rule 5 — Parent owns writable state
Parent components own writable signal() state.

Children receive data via inputs.

Children emit intent via outputs.

Parent decides what happens next.

Parent
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-snack',
  standalone: true,
  template: `
    <input
      [value]="filterCriteria()"
      (input)="filterCriteria.set(($any($event.target).value))"
    />

    <app-snacklist
      [filterCriteria]="filterCriteria()"
      (snackSelected)="onSnackSelected($event)"
    />
  `,
})
export class SnackComponent {
  filterCriteria = signal('');

  onSnackSelected(snack: Snackitem) {
    // routing, dialogs, persistence, etc.
  }
}
Child
@Component({
  selector: 'app-snacklist',
  standalone: true,
  template: `
    <ul>
      @for (snack of filteredSnacks(); track snack.name) {
        <li (click)="onSnackClick(snack)">
          {{ snack.name }}
        </li>
      }
    </ul>
  `,
})
export class SnacklistComponent {
  filterCriteria = input('', {
    transform: v => (v ?? '').trim().toLowerCase(),
  });

  snackSelected = output<Snackitem>();

  filteredSnacks = computed(() => {
    const filter = this.filterCriteria();
    return this.snacks().filter(s =>
      s.name.toLowerCase().includes(filter)
    );
  });

  onSnackClick(snack: Snackitem) {
    this.snackSelected.emit(snack);
  }
}
Boundary rules
Input boundary
Use transform for:

trimming

case normalisation

null or undefined cleanup

simple parsing that cannot fail

Do not put validation logic in templates.

Output boundary
Emit plain data only.

Avoid emitting services, DOM nodes, or large object graphs.

Anti-patterns
Do not use ngOnChanges where computed() works.

Do not duplicate input state inside the child.

Do not emit outputs from effect() unless strictly required.

Do not mix signal inputs with @Input() in new components.

Checklist
 Inputs declared with input<T>()

 Defaults provided

 transform used for cleanup

 Derived state in computed()

 Outputs declared with output<T>()

 Parent owns writable state

 Child emits intent only
