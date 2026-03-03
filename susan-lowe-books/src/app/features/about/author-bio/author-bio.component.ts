import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-author-bio',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './author-bio.component.html',
  styleUrl: './author-bio.component.scss'
})
export class AuthorBioComponent {
  private bookService = inject(BookService);

  author = this.bookService.author;
  featuredBooks = this.bookService.featuredBooks;
}
