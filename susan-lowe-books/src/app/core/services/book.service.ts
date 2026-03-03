import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  isbn: string;
  publishedDate: string;
  coverImage: string;
  description: string;
  longDescription: string;
  price: number;
  currency: string;
  paypalProductId: string;
  genres: string[];
  pageCount: number;
  language: string;
  featured: boolean;
  amazonLink?: string;
  koboLink?: string;
  goodreadsLink?: string;
  ageRating?: string;
}

export interface Author {
  name: string;
  penName: string;
  bio: string;
  credentials: string[];
  photo: string;
  socialMedia: {
    website?: string;
    smashwords?: string;
    appleBooks?: string;
    amazon?: string;
  };
}

export interface BooksData {
  books: Book[];
  author: Author;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksData = toSignal(
    this.http.get<BooksData>('/assets/data/books.json'),
    { initialValue: { books: [], author: { name: '', penName: '', bio: '', credentials: [], photo: '', socialMedia: {} } } }
  );

  // Public signals
  books = computed(() => this.booksData()?.books ?? []);
  author = computed(() => this.booksData()?.author);
  featuredBooks = computed(() => this.books().filter(book => book.featured));

  private searchQuery = signal<string>('');
  private selectedGenre = signal<string>('all');

  // Filtered books based on search and genre
  filteredBooks = computed(() => {
    let result = this.books();

    // Filter by search query
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        book.genres.some(g => g.toLowerCase().includes(query))
      );
    }

    // Filter by genre
    const genre = this.selectedGenre();
    if (genre && genre !== 'all') {
      result = result.filter(book =>
        book.genres.some(g => g.toLowerCase() === genre.toLowerCase())
      );
    }

    return result;
  });

  // Get all unique genres
  allGenres = computed(() => {
    const genresSet = new Set<string>();
    this.books().forEach(book => {
      book.genres.forEach(genre => genresSet.add(genre));
    });
    return Array.from(genresSet).sort();
  });

  constructor(private http: HttpClient) {}

  getBookById(id: string): Book | undefined {
    return this.books().find(book => book.id === id);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setGenreFilter(genre: string): void {
    this.selectedGenre.set(genre);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedGenre.set('all');
  }
}
