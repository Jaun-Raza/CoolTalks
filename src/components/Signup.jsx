import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie'


const URL = "https://ecomm-server-sepia.vercel.app/"

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaiHNXjxQrlFFFHdMGtUpH1nLDjHzyfTms6A&usqp=CAU');

    const isLengthValid = password.length >= 8;
    const emailValid = email.includes('@gmail.com');


    const handleImageChange = (e) => {

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = err => {
            console.log("Error: ", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(URL + 'signup', {
                username: username,
                email: email,
                password: password,
                image: image
            })

            const success = res.data.success;
            const data = res.data.foundUser;
            const message = res.data.message;

            if (message == "Username already exists") {
                return alert("Username already exists")
            }

            if (message == 'Email is already in use') {
                return alert('Email is already in use')
            }

            if (success) {
                Cookies.set("coolTalks", data.email, { expires: 1000 * 60 * 60 * 24 * 180, path: '/' });
                window.location.href = "http://localhost:3000/"
            }
        } catch (error) {  
            console.log(error);
        }

    };

    return (
        <Wrapper>
            <FormContainer>
                <FormHeader>
                    <h2>Sign Up</h2>
                    <span>
                        Already have an account? <Link to="/login"><b>Login</b></Link>
                    </span>
                </FormHeader>
                <div className="imgPreview">
                    <img src={image} alt="" />
                </div>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label>Username:</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
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
                    <FormGroup>
                        <label>Profile Image:</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} required />
                    </FormGroup>
                    {
                        isLengthValid && emailValid ? <SubmitButton type="submit">Sign Up</SubmitButton> : <SubmitButton style={{ backgroundColor: 'gray' }} disabled type="submit">Sign Up</SubmitButton>
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
  margin-top: 6rem;
  margin-bottom: 5rem;

  .imgPreview{
    display: flex;
    justify-content: center;
    margin: 1rem;
    img {
        width: 95px;
        height: 90px;
        border: 1px solid black;
        border-radius: 25rem;
    }
  }
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
  margin-bottom: 1rem;

  h2 {
    margin-bottom: 0.5rem;
    font-family: fantasy;
  }

  span {
    color: #3498db;
    cursor: pointer;
    font-size: 1.3rem;

    a {
      color: inherit;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

export default Signup;