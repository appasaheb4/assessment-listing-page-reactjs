import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const HeaderContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0ea5e9;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #0284c7;
  }
`;

const LogoIcon = styled.svg`
  width: 2rem;
  height: 2rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled.button`
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    color: #0ea5e9;
    background-color: #f0f9ff;
  }
`;

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={() => navigate('/')}>
          <LogoIcon
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </LogoIcon>
          Product Store
        </Logo>
        <Nav>
          <NavLink onClick={() => navigate('/')}>Products</NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
