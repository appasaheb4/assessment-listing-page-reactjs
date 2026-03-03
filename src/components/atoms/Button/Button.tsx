import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return 'padding: 0.5rem 1rem; font-size: 0.875rem;';
      case 'lg':
        return 'padding: 0.875rem 1.5rem; font-size: 1.125rem;';
      default:
        return 'padding: 0.625rem 1.25rem; font-size: 1rem;';
    }
  }}

  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: #6b7280;
          color: white;
          &:hover:not(:disabled) {
            background-color: #4b5563;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: #0ea5e9;
          border-color: #0ea5e9;
          &:hover:not(:disabled) {
            background-color: #f0f9ff;
          }
        `;
      default:
        return `
          background-color: #0ea5e9;
          color: white;
          &:hover:not(:disabled) {
            background-color: #0284c7;
          }
        `;
    }
  }}

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid #0ea5e9;
    outline-offset: 2px;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton variant={variant} size={size} fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
};
