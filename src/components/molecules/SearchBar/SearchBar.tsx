import React from 'react';
import styled from 'styled-components';
import { Input } from '../../atoms';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 32rem;
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  pointer-events: none;
`;

const StyledSearchInput = styled(Input)`
  padding-left: 3rem;
`;

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search products...',
}) => {
  return (
    <SearchBarContainer>
      <SearchIcon
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </SearchIcon>
      <StyledSearchInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        fullWidth
      />
    </SearchBarContainer>
  );
};
