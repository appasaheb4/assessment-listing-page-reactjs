# Product Listing Application

A modern, professional React application built with TypeScript, featuring a product listing page with search functionality and detailed product views.

## 🚀 Tech Stack

- **React 19** - Latest React version with TypeScript
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **styled-components** - CSS-in-JS styling
- **MobX** - State management
- **React Router** - Client-side routing
- **Atomic Design Pattern** - Component architecture

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic building blocks (Button, Input, Badge, Spinner)
│   ├── molecules/       # Simple component combinations (SearchBar, ProductCard)
│   └── organisms/       # Complex components (ProductGrid, Header)
├── pages/               # Page-level components (Templates)
│   ├── ProductListingPage/
│   └── ProductDetailPage/
├── stores/              # MobX stores for state management
│   └── ProductStore.ts
├── services/            # API service layer
│   └── api.service.ts
├── types/               # TypeScript type definitions
│   └── product.types.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## ✨ Features

### Product Listing Page
- Displays products in a responsive grid layout
- Shows key product information:
  - Product ID (clickable)
  - Title
  - Price
  - Brand
  - Stock status
  - Rating
  - Category
- Real-time search functionality across multiple fields
- Loading states with spinner
- Empty state handling
- Error handling

### Product Detail Page
- Comprehensive product information display
- Image gallery with thumbnail navigation
- Detailed specifications:
  - Price with discount information
  - Stock availability
  - Dimensions and weight
  - Shipping and warranty information
  - Customer reviews with ratings
  - Product tags
- Back navigation to listing page

### Global Search
- Real-time filtering without page reload
- Searches across multiple fields:
  - Product title
  - Product ID
  - Category
  - Brand
  - Description
- Shows filtered results count

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎯 API Integration

The application uses the DummyJSON API:
- **List Products:** `https://dummyjson.com/products`
- **Product Details:** `https://dummyjson.com/products/{id}`

## 🏗️ Architecture Highlights

### Atomic Design Pattern
The component structure follows Atomic Design principles:
- **Atoms:** Basic UI elements (Button, Input, Badge, Spinner)
- **Molecules:** Simple component combinations (SearchBar, ProductCard)
- **Organisms:** Complex UI sections (ProductGrid, Header)
- **Pages:** Complete page layouts (ProductListingPage, ProductDetailPage)

### State Management (MobX)
- Centralized state management with MobX
- Observable stores with automatic reactivity
- Computed values for derived state
- Actions for state mutations

### Type Safety
- Comprehensive TypeScript interfaces
- Type-safe API calls
- Props validation
- Strict type checking

### Styling Approach
- Tailwind CSS for utility classes and global styles
- styled-components for component-specific styling
- Responsive design with mobile-first approach
- Consistent design system with custom color palette

## 🎨 Design Features

- Modern, clean UI with professional styling
- Responsive grid layouts
- Smooth transitions and hover effects
- Loading states and error handling
- Empty state designs
- Accessible color contrast
- Mobile-optimized layouts

## 🔍 Code Quality

- Senior developer best practices
- Clean, maintainable code structure
- Proper separation of concerns
- Reusable components
- Type-safe implementations
- Error handling throughout
- Performance optimizations

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Progressive enhancement

## 🚦 Development

The application runs on `http://localhost:5173` by default.

Hot Module Replacement (HMR) is enabled for fast development.

## 📄 License

MIT License
