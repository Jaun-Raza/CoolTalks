import React from 'react';
import { Outlet, Link, Route } from 'react-router-dom';
import styled from 'styled-components';

const AuthPage = () => {
    return (
        <Wrapper>
            <Content>
                <Title>Go register yourself</Title>
                <ButtonsContainer>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button>Sign Up</Button>
                    </Link>
                </ButtonsContainer>
                <Outlet />
            </Content>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h2`
font-style: inherit;
color: white;
font-family: serif;
font-variant: all-petite-caps;
line-height: 9rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default AuthPage;
