import React from 'react';
import styled from "styled-components"
import { NavLink } from 'react-router-dom' 

const Footer = ({userData}) => {
  return (
    <Wrapper>
      <div className="footer">
        <NavLink to={'/'}><img src="/assets/home-button.png" width={'45px'} style={{backgroundColor: 'white', borderRadius: '25px'}} alt="home-icon" /></NavLink>
        <NavLink to={'/addPost'}><img src="/assets/plus.png" width={'45px'} style={{backgroundColor: 'white', borderRadius: '25px'}} alt="user-profile-icon" /></NavLink>
        <NavLink to={'/userinfo'}><img src={userData.image !== undefined ? userData.image: '/assets/user.png'} width={'45px'} height={'45px'} style={{backgroundColor: 'white', borderRadius: '25px'}} alt="add-post-icon" /></NavLink>
      </div>
      </Wrapper>
  )
}

const Wrapper = styled.section`

  .footer {
    background: #000;
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    margin-top: 5rem;
    border-top: 1px solid white;
    
  }

`;


export default Footer