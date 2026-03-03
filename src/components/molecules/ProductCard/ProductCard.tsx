import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../atoms';
import type { Product } from '../../../types';

interface ProductCardProps {
  product: Product;
}

const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 12rem;
  overflow: hidden;
  background-color: #f9fafb;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const ProductId = styled.span`
  color: #0ea5e9;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

const Label = styled.span`
  color: #6b7280;
  font-weight: 500;
`;

const Value = styled.span`
  color: #111827;
  font-weight: 600;
`;

const PriceValue = styled(Value)`
  color: #0ea5e9;
  font-size: 1.25rem;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StarIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  color: #fbbf24;
  fill: currentColor;
`;

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${product.id}`);
  };

  const handleIdClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/details/${product.id}`);
  };

  return (
    <Card onClick={handleCardClick}>
      <ImageContainer>
        <Image src={product.thumbnail} alt={product.title} loading="lazy" />
      </ImageContainer>
      <CardContent>
        <CardHeader>
          <ProductId onClick={handleIdClick}>ID: {product.id}</ProductId>
          <Badge variant="info" size="sm">
            {product.category}
          </Badge>
        </CardHeader>
        <Title>{product.title}</Title>
        <Description>{product.description}</Description>
        <CardFooter>
          <InfoRow>
            <Label>Price:</Label>
            <PriceValue>${product.price.toFixed(2)}</PriceValue>
          </InfoRow>
          <InfoRow>
            <Label>Brand:</Label>
            <Value>{product.brand || 'N/A'}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Stock:</Label>
            <Value>
              {product.stock > 0 ? (
                <Badge variant="success" size="sm">
                  {product.stock} units
                </Badge>
              ) : (
                <Badge variant="error" size="sm">
                  Out of stock
                </Badge>
              )}
            </Value>
          </InfoRow>
          <InfoRow>
            <Label>Rating:</Label>
            <RatingContainer>
              <StarIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </StarIcon>
              <Value>{product.rating.toFixed(1)}</Value>
            </RatingContainer>
          </InfoRow>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
