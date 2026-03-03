import React from 'react';
import styled from 'styled-components';
import { ProductCard } from '../../molecules';
import type { Product } from '../../../types';

interface ProductGridProps {
  products: Product[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
`;

const EmptyStateIcon = styled.svg`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  color: #d1d5db;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
`;

const EmptyStateDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
`;

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <Grid>
        <EmptyState>
          <EmptyStateIcon
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </EmptyStateIcon>
          <EmptyStateTitle>No products found</EmptyStateTitle>
          <EmptyStateDescription>
            Try adjusting your search criteria to find what you're looking for.
          </EmptyStateDescription>
        </EmptyState>
      </Grid>
    );
  }

  return (
    <Grid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};
