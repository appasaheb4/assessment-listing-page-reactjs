import type { Product, ProductsResponse } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

class ApiService {
  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getAllProducts(): Promise<ProductsResponse> {
    return this.fetchWithErrorHandling<ProductsResponse>(
      `${API_BASE_URL}/products?limit=100`
    );
  }

  async getProductById(id: number): Promise<Product> {
    return this.fetchWithErrorHandling<Product>(
      `${API_BASE_URL}/products/${id}`
    );
  }

  async searchProducts(query: string): Promise<ProductsResponse> {
    return this.fetchWithErrorHandling<ProductsResponse>(
      `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`
    );
  }
}

export const apiService = new ApiService();
