import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';

const URL = "https://ecomm-server-sepia.vercel.app/"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLengthValid = password.length >= 8;
  const emailValid = email.includes('@gmail.com');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(URL + 'login', {
        email: email,
        password: password,
      })

      const success = res.data.success;
      const data = res.data.findUser;

      if (success) {
        Cookies.set("coolTalks", data.email, { expires: 1000 * 60 * 60 * 24 * 180, path: '/' });
        window.location.href = "http://localhost:3000/"
      }
    } catch (error) {
      const message = error.response.data.message;
      

      if (message == "Incorrect Password") {
        return alert("Incorrect Password")
      }
      if (message == "No Account Found") {
        return alert("No Account Found")
      }
    }

  };

  return (
    <Wrapper>
      <FormContainer>
        <FormHeader>
          <h2>Login</h2>
          <span>
            Need an account? <Link to="/signup"><b>Sign Up</b></Link>
          </span>
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            {isLengthValid ? (
              <label style={{ color: 'green' }}>
                Password must be at least 8 characters long! &#10004;
              </label>
            ) : (
              <label style={{ color: 'red' }}>
                Password must be at least 8 characters long! &times;
              </label>
            )}

            <br />
            {emailValid ? (
              <label style={{ color: 'green' }}>
                Email must contain '@gmail.com!' &#10004;
              </label>
            ) : (
              <label style={{ color: 'red' }}>
                Email must contain '@gmail.com!' &times;
              </label>
            )}
          </FormGroup>
          {
            isLengthValid && emailValid ? <SubmitButton type="submit">Login</SubmitButton> : <SubmitButton style={{ backgroundColor: 'gray' }} disabled type="submit">Login</SubmitButton>
          }
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    margin-bottom: 0.5rem;
    font-family: fantasy;
  }

  span {
    color: #3498db;
    cursor: pointer;
    font-size: 1.4rem;

    a {
      color: inherit;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 35rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    display: block;
    font-family: monospace;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const SubmitButton = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Login;
