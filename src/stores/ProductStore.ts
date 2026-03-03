import { makeAutoObservable, runInAction } from 'mobx';
import type { Product, ProductFilters } from '../types';
import { apiService } from '../services';

export class ProductStore {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentProduct: Product | null = null;
  filters: ProductFilters = {
    searchQuery: '',
  };
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProducts(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await apiService.getAllProducts();
      
      runInAction(() => {
        this.products = response.products;
        this.filteredProducts = response.products;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to fetch products';
        this.isLoading = false;
      });
    }
  }

  async fetchProductById(id: number): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const product = await apiService.getProductById(id);
      
      runInAction(() => {
        this.currentProduct = product;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to fetch product';
        this.isLoading = false;
      });
    }
  }

  setSearchQuery(query: string): void {
    this.filters.searchQuery = query;
    this.applyFilters();
  }

  private applyFilters(): void {
    const query = this.filters.searchQuery.toLowerCase().trim();

    if (!query) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter((product) => {
      return (
        product.title.toLowerCase().includes(query) ||
        product.id.toString().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });
  }

  clearCurrentProduct(): void {
    this.currentProduct = null;
  }

  get hasProducts(): boolean {
    return this.products.length > 0;
  }

  get hasFilteredProducts(): boolean {
    return this.filteredProducts.length > 0;
  }
}

export const productStore = new ProductStore();
