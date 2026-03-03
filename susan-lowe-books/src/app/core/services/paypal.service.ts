import { Injectable, signal } from '@angular/core';

export interface PayPalConfig {
  clientId: string;
  currency: string;
  intent: 'capture' | 'authorize';
}

export interface PurchaseResult {
  orderId: string;
  status: 'COMPLETED' | 'APPROVED' | 'FAILED';
  bookId: string;
  amount: number;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PayPalService {
  private scriptLoaded = signal<boolean>(false);
  private config: PayPalConfig = {
    clientId: 'YOUR_PAYPAL_CLIENT_ID', // Replace with actual client ID
    currency: 'USD',
    intent: 'capture'
  };

  loadPayPalScript(): Promise<void> {
    if (this.scriptLoaded()) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${this.config.clientId}&currency=${this.config.currency}`;
      script.onload = () => {
        this.scriptLoaded.set(true);
        resolve();
      };
      script.onerror = (error) => {
        console.error('Failed to load PayPal SDK', error);
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  createOrder(bookId: string, amount: number): Promise<string> {
    // This would typically call your backend to create an order
    // For now, using PayPal SDK directly
    if (!window.paypal) {
      return Promise.reject('PayPal SDK not loaded');
    }

    return Promise.resolve('ORDER_ID_PLACEHOLDER');
  }

  captureOrder(orderId: string, bookId: string, amount: number): Promise<PurchaseResult> {
    // This would typically call your backend to capture the payment
    // For now, returning a mock result
    return Promise.resolve({
      orderId,
      status: 'COMPLETED',
      bookId,
      amount
    });
  }

  isScriptLoaded(): boolean {
    return this.scriptLoaded();
  }
}
