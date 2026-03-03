import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section.component';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { BookService } from '../../core/services/book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    HeroSectionComponent,
    BookCardComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private bookService = inject(BookService);

  featuredBooks = this.bookService.featuredBooks;
  author = this.bookService.author;
  isLoading = computed(() => this.featuredBooks().length === 0);
}
