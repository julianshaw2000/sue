import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { BookService } from '../../../core/services/book.service';
import { PaypalButtonComponent } from '../../../shared/components/paypal-button/paypal-button.component';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    PaypalButtonComponent
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);

  private bookId = toSignal(
    this.route.params.pipe(map(params => params['id'])),
    { initialValue: '' }
  );

  book = computed(() => {
    const id = this.bookId();
    return id ? this.bookService.getBookById(id) : undefined;
  });
}
