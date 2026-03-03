import { Routes } from '@angular/router';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./book-catalog/book-catalog.component')
        .then(m => m.BookCatalogComponent),
    title: 'All Books - Susan Lowe'
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./book-detail/book-detail.component')
        .then(m => m.BookDetailComponent),
    title: 'Book Details - Susan Lowe'
  }
];
