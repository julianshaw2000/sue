import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Susan Lowe - Author'
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./features/books/books.routes').then(m => m.BOOKS_ROUTES),
    title: 'Books by Susan Lowe'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/author-bio/author-bio.component')
        .then(m => m.AuthorBioComponent),
    title: 'About Susan Lowe'
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/services/services.component')
        .then(m => m.ServicesComponent),
    title: 'Healthcare Services - Susan Lowe'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
