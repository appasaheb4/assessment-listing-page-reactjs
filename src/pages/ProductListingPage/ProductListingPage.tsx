import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { productStore } from '../../stores';
import { SearchBar } from '../../components/molecules';
import { ProductGrid } from '../../components/organisms';
import { Spinner } from '../../components/atoms';

const PageContainer = styled.div`
  min-height: calc(100vh - 4rem);
  background-color: #f9fafb;
`;

const ContentWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ResultsCount = styled.span`
  font-weight: 600;
  color: #111827;
`;

const ErrorContainer = styled.div`
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const ErrorText = styled.p`
  color: #991b1b;
  margin: 0;
  font-weight: 500;
`;

export const ProductListingPage: React.FC = observer(() => {
  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  const handleSearchChange = (value: string) => {
    productStore.setSearchQuery(value);
  };

  if (productStore.isLoading && !productStore.hasProducts) {
    return (
      <PageContainer>
        <ContentWrapper>
          <Spinner size="lg" />
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader>
          <Title>Product Catalog</Title>
          <Subtitle>
            Discover our wide range of quality products at competitive prices
          </Subtitle>
        </PageHeader>

        {productStore.error && (
          <ErrorContainer>
            <ErrorText>Error: {productStore.error}</ErrorText>
          </ErrorContainer>
        )}

        <SearchSection>
          <SearchBar
            value={productStore.filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title, ID, category, brand..."
          />
          <ResultsInfo>
            Showing <ResultsCount>{productStore.filteredProducts.length}</ResultsCount> of{' '}
            <ResultsCount>{productStore.products.length}</ResultsCount> products
          </ResultsInfo>
        </SearchSection>

        <ProductGrid products={productStore.filteredProducts} />
      </ContentWrapper>
    </PageContainer>
  );
});
