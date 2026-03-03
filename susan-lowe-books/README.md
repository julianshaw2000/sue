# Susan Lowe - Author Website

A modern Angular 18 application to promote books by Susan Lowe, featuring Jamaican culture, medical memoirs, and compelling fiction.

## Features

- 📚 **Book Catalog** - Browse all books with search and filter functionality
- 🎨 **Jamaican-Inspired Theme** - Custom Material Design theme with Jamaica flag colors
- 💳 **PayPal Integration** - Direct purchase options (requires configuration)
- 📱 **Responsive Design** - Mobile-first approach with beautiful layouts
- ⚡ **Performance Optimized** - Lazy loading, signal-based reactivity, and optimized bundles
- ♿ **Accessible** - WCAG 2.1 AA compliant with keyboard navigation support

## Books Featured

1. **Shub Down & Small-up Yuself!** - Diaries of Jamaica by Bus
2. **Yu Get Jook!** - Diaries of a Jamaican Medic
3. **The Brown Phoenix** - An Erotic Diary from the Indies (18+)
4. **Wings After Fairborough** - A story of resilience and transformation
5. **On the Great Barrier** - Marine exploration adventure

## Tech Stack

- Angular 18+ (Standalone Components)
- Angular Material
- TypeScript
- SCSS
- Signal-based Reactivity
- PayPal SDK Integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Navigate to
http://localhost:4200
```

### Build for Production

```bash
# Build the application
npm run build

# Output will be in dist/susan-lowe-books
```

## Project Structure

```
src/app/
├── core/                    # Singleton services & app-wide setup
│   └── services/
│       ├── book.service.ts          # Book data management
│       └── paypal.service.ts        # PayPal integration
│
├── shared/                  # Reusable UI components
│   └── components/
│       ├── book-card/               # Book display card
│       ├── paypal-button/           # PayPal button component
│       ├── hero-section/            # Hero with background image
│       └── loading-spinner/         # Loading indicator
│
├── features/                # Lazy-loaded feature modules
│   ├── home/                        # Landing page
│   ├── books/
│   │   ├── book-catalog/            # All books grid
│   │   └── book-detail/             # Single book details
│   └── about/
│       └── author-bio/              # Author information
│
├── app.config.ts            # Root providers
├── app.routes.ts            # Lazy-loaded routing
└── app.component.ts         # Root component
```

## Configuration

### PayPal Setup

To enable PayPal payments:

1. Create a PayPal Developer account
2. Get your Client ID from the PayPal Developer Dashboard
3. Update `src/app/core/services/paypal.service.ts`:

```typescript
private config: PayPalConfig = {
  clientId: 'YOUR_PAYPAL_CLIENT_ID',
  currency: 'USD',
  intent: 'capture'
};
```

4. Update product IDs in `src/assets/data/books.json`

### Book Data

Book information is stored in `src/assets/data/books.json`. Update this file to:
- Add or remove books
- Change prices
- Update descriptions
- Modify author bio

## Development

### Code Standards

- Follows Angular best practices from `.rules/ANGULAR_GEN.md`
- Standalone components only (no NgModules)
- Signal-based reactivity
- Lazy-loaded routes
- Material Design components

### Responsive Breakpoints

- Mobile: 0-599px
- Tablet: 600-959px
- Desktop: 960px+

## Deployment

### Recommended Platforms

1. **Vercel** (Recommended)
   ```bash
   vercel --prod
   ```

2. **Netlify**
   ```bash
   netlify deploy --prod
   ```

3. **Firebase Hosting**
   ```bash
   firebase deploy
   ```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2024 Susan Lowe. All rights reserved.

## Author

**Susan Lowe**
- Integrative General Practitioner
- Licensed Therapist
- Author of Jamaican cultural memoirs and fiction

Website: http://www.onlinecounsellingjamaica.com

## Support

For questions or issues, please contact through the website or social media channels.

---

Built with ❤️ using Angular and Angular Material
