import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  fullWidth?: boolean;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 0.625rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ hasError }) => (hasError ? '#ef4444' : '#d1d5db')};
  border-radius: 0.5rem;
  transition: all 0.2s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? '#ef4444' : '#0ea5e9')};
    box-shadow: 0 0 0 3px ${({ hasError }) => (hasError ? '#fee2e2' : '#e0f2fe')};
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const Input: React.FC<InputProps> = ({ error, fullWidth = false, ...props }) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      <StyledInput hasError={!!error} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};
