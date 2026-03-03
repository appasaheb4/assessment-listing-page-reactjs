import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div<SpinnerProps>`
  border: 3px solid #f3f4f6;
  border-top: 3px solid ${({ color }) => color || '#0ea5e9'};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return 'width: 1.25rem; height: 1.25rem;';
      case 'lg':
        return 'width: 3rem; height: 3rem;';
      default:
        return 'width: 2rem; height: 2rem;';
    }
  }}
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color }) => {
  return (
    <SpinnerContainer>
      <StyledSpinner size={size} color={color} />
    </SpinnerContainer>
  );
};
