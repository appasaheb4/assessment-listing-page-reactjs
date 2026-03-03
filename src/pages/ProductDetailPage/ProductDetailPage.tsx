import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { productStore } from '../../stores';
import { Button, Spinner, Badge } from '../../components/atoms';

const PageContainer = styled.div`
  min-height: calc(100vh - 4rem);
  background-color: #f9fafb;
`;

const ContentWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const BackButton = styled(Button)`
  margin-bottom: 1.5rem;
`;

const DetailCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageSection = styled.div`
  padding: 2rem;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 28rem;
  object-fit: contain;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  margin-bottom: 1rem;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.75rem;
`;

const Thumbnail = styled.img<{ isActive?: boolean }>`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 0.375rem;
  cursor: pointer;
  border: 2px solid ${({ isActive }) => (isActive ? '#0ea5e9' : 'transparent')};
  transition: all 0.2s;

  &:hover {
    border-color: #0ea5e9;
  }
`;

const InfoSection = styled.div`
  padding: 2rem;
`;

const ProductHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ProductId = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: #f0f9ff;
  border-radius: 0.5rem;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0ea5e9;
`;

const OriginalPrice = styled.div`
  font-size: 1.25rem;
  color: #6b7280;
  text-decoration: line-through;
`;

const Discount = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #059669;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const DetailSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
`;

const DetailGrid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const DetailItem = styled.div`
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
`;

const DetailLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const ReviewSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f9fafb;
`;

const ReviewCard = styled.div`
  background: white;
  padding: 1.25rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;
`;

const ReviewerName = styled.div`
  font-weight: 600;
  color: #111827;
`;

const ReviewDate = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ReviewComment = styled.p`
  color: #374151;
  margin: 0;
  line-height: 1.5;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const StarIcon = styled.svg<{ filled?: boolean }>`
  width: 1rem;
  height: 1rem;
  color: ${({ filled }) => (filled ? '#fbbf24' : '#d1d5db')};
  fill: currentColor;
`;

const ErrorContainer = styled.div`
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
`;

const ErrorText = styled.p`
  color: #991b1b;
  margin: 0 0 1rem 0;
  font-weight: 500;
`;

export const ProductDetailPage: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = React.useState<string>('');

  useEffect(() => {
    if (id) {
      productStore.fetchProductById(Number(id));
    }

    return () => {
      productStore.clearCurrentProduct();
    };
  }, [id]);

  useEffect(() => {
    if (productStore.currentProduct) {
      setSelectedImage(productStore.currentProduct.thumbnail);
    }
  }, [productStore.currentProduct]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (productStore.isLoading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <Spinner size="lg" />
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (productStore.error || !productStore.currentProduct) {
    return (
      <PageContainer>
        <ContentWrapper>
          <BackButton onClick={handleBackClick} variant="outline">
            ← Back to Products
          </BackButton>
          <ErrorContainer>
            <ErrorText>
              {productStore.error || 'Product not found'}
            </ErrorText>
            <Button onClick={handleBackClick}>Return to Products</Button>
          </ErrorContainer>
        </ContentWrapper>
      </PageContainer>
    );
  }

  const product = productStore.currentProduct;
  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        filled={index < Math.floor(rating)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </StarIcon>
    ));
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <BackButton onClick={handleBackClick} variant="outline">
          ← Back to Products
        </BackButton>

        <DetailCard>
          <DetailGrid>
            <ImageSection>
              <MainImage src={selectedImage} alt={product.title} />
              <ThumbnailGrid>
                {product.images.map((image, index) => (
                  <Thumbnail
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    isActive={selectedImage === image}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </ThumbnailGrid>
            </ImageSection>

            <InfoSection>
              <ProductHeader>
                <ProductId>Product ID: {product.id}</ProductId>
                <ProductTitle>{product.title}</ProductTitle>
                <BadgeContainer>
                  <Badge variant="info">{product.category}</Badge>
                  {product.brand && <Badge variant="default">{product.brand}</Badge>}
                  <Badge variant={product.stock > 0 ? 'success' : 'error'}>
                    {product.availabilityStatus}
                  </Badge>
                </BadgeContainer>
              </ProductHeader>

              <PriceSection>
                <Price>${product.price.toFixed(2)}</Price>
                {product.discountPercentage > 0 && (
                  <>
                    <OriginalPrice>${originalPrice.toFixed(2)}</OriginalPrice>
                    <Discount>-{product.discountPercentage.toFixed(0)}% OFF</Discount>
                  </>
                )}
              </PriceSection>

              <Description>{product.description}</Description>

              <DetailSection>
                <SectionTitle>Product Details</SectionTitle>
                <DetailGrid2>
                  <DetailItem>
                    <DetailLabel>SKU</DetailLabel>
                    <DetailValue>{product.sku}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Stock</DetailLabel>
                    <DetailValue>{product.stock} units</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Rating</DetailLabel>
                    <DetailValue>{product.rating.toFixed(1)} / 5.0</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Weight</DetailLabel>
                    <DetailValue>{product.weight} kg</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Dimensions</DetailLabel>
                    <DetailValue>
                      {product.dimensions.width} × {product.dimensions.height} ×{' '}
                      {product.dimensions.depth} cm
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Min. Order Qty</DetailLabel>
                    <DetailValue>{product.minimumOrderQuantity}</DetailValue>
                  </DetailItem>
                </DetailGrid2>
              </DetailSection>

              <DetailSection>
                <SectionTitle>Shipping & Warranty</SectionTitle>
                <DetailGrid2>
                  <DetailItem>
                    <DetailLabel>Shipping</DetailLabel>
                    <DetailValue>{product.shippingInformation}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Warranty</DetailLabel>
                    <DetailValue>{product.warrantyInformation}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Return Policy</DetailLabel>
                    <DetailValue>{product.returnPolicy}</DetailValue>
                  </DetailItem>
                </DetailGrid2>
              </DetailSection>

              {product.tags.length > 0 && (
                <DetailSection>
                  <SectionTitle>Tags</SectionTitle>
                  <BadgeContainer>
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="default" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </BadgeContainer>
                </DetailSection>
              )}
            </InfoSection>
          </DetailGrid>

          {product.reviews.length > 0 && (
            <ReviewSection>
              <SectionTitle>Customer Reviews ({product.reviews.length})</SectionTitle>
              {product.reviews.map((review, index) => (
                <ReviewCard key={index}>
                  <ReviewHeader>
                    <div>
                      <ReviewerName>{review.reviewerName}</ReviewerName>
                      <RatingStars>{renderStars(review.rating)}</RatingStars>
                    </div>
                    <ReviewDate>
                      {new Date(review.date).toLocaleDateString()}
                    </ReviewDate>
                  </ReviewHeader>
                  <ReviewComment>{review.comment}</ReviewComment>
                </ReviewCard>
              ))}
            </ReviewSection>
          )}
        </DetailCard>
      </ContentWrapper>
    </PageContainer>
  );
});
