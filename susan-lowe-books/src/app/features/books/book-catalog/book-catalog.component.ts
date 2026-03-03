import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookCardComponent } from '../../../shared/components/book-card/book-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-book-catalog',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    BookCardComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './book-catalog.component.html',
  styleUrl: './book-catalog.component.scss'
})
export class BookCatalogComponent {
  private bookService = inject(BookService);

  books = this.bookService.filteredBooks;
  allGenres = this.bookService.allGenres;

  searchQuery = signal<string>('');
  selectedGenre = signal<string>('all');

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    this.bookService.setSearchQuery(query);
  }

  onGenreChange(genre: string): void {
    this.selectedGenre.set(genre);
    this.bookService.setGenreFilter(genre);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedGenre.set('all');
    this.bookService.clearFilters();
  }
}
