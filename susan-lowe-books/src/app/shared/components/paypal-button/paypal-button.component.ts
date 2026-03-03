import { Component, input, output, effect, signal, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PayPalService, PurchaseResult } from '../../../core/services/paypal.service';

@Component({
  selector: 'app-paypal-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.scss'
})
export class PaypalButtonComponent implements AfterViewInit {
  // Signal inputs
  bookId = input.required<string>();
  price = input.required<number>();
  disabled = input<boolean>(false);

  // Signal outputs
  purchaseComplete = output<PurchaseResult>();
  purchaseError = output<Error>();

  // View child
  paypalContainer = viewChild<ElementRef>('paypalContainer');

  // Local state
  isLoading = signal<boolean>(false);
  showPayPalButton = signal<boolean>(false);

  constructor(
    private paypalService: PayPalService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    // Note: PayPal integration requires a valid client ID
    // For demo purposes, we'll show a placeholder button
    // Uncomment the code below when you have a valid PayPal client ID

    /*
    this.loadPayPalButton();
    */
  }

  private async loadPayPalButton(): Promise<void> {
    try {
      this.isLoading.set(true);
      await this.paypalService.loadPayPalScript();
      this.renderPayPalButton();
      this.showPayPalButton.set(true);
    } catch (error) {
      console.error('Failed to load PayPal button:', error);
      this.snackBar.open('Failed to load payment option', 'Close', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  private renderPayPalButton(): void {
    const container = this.paypalContainer()?.nativeElement;
    if (!container || !window.paypal) {
      return;
    }

    window.paypal.Buttons({
      createOrder: async () => {
        try {
          return await this.paypalService.createOrder(this.bookId(), this.price());
        } catch (error) {
          this.snackBar.open('Failed to create order', 'Close', { duration: 3000 });
          throw error;
        }
      },
      onApprove: async (data: any) => {
        try {
          const result = await this.paypalService.captureOrder(data.orderID, this.bookId(), this.price());
          this.purchaseComplete.emit(result);
          this.snackBar.open('Purchase successful! Thank you for your order.', 'Close', { duration: 5000 });
        } catch (error) {
          this.snackBar.open('Payment failed. Please try again.', 'Close', { duration: 3000 });
          this.purchaseError.emit(error as Error);
        }
      },
      onError: (err: Error) => {
        this.snackBar.open('Payment error occurred', 'Close', { duration: 3000 });
        this.purchaseError.emit(err);
      }
    }).render(container);
  }

  // Temporary method for demo - opens PayPal in new tab
  openPayPalDemo(): void {
    this.snackBar.open(
      'PayPal integration requires configuration. For now, please use Amazon or other retailers.',
      'Close',
      { duration: 4000 }
    );
  }
}
