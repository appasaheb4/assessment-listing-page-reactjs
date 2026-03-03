import React from 'react';
import styled from 'styled-components';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'sm' | 'md';
}

const StyledBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 9999px;
  white-space: nowrap;

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return 'padding: 0.125rem 0.5rem; font-size: 0.75rem;';
      default:
        return 'padding: 0.25rem 0.75rem; font-size: 0.875rem;';
    }
  }}

  ${({ variant }) => {
    switch (variant) {
      case 'success':
        return `
          background-color: #d1fae5;
          color: #065f46;
        `;
      case 'warning':
        return `
          background-color: #fef3c7;
          color: #92400e;
        `;
      case 'error':
        return `
          background-color: #fee2e2;
          color: #991b1b;
        `;
      case 'info':
        return `
          background-color: #dbeafe;
          color: #1e40af;
        `;
      default:
        return `
          background-color: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
}) => {
  return (
    <StyledBadge variant={variant} size={size}>
      {children}
    </StyledBadge>
  );
};
