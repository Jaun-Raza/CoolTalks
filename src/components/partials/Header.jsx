import React from 'react';
import styled from "styled-components"

const Header = () => {
  return (
    <Wrapper>
      <div className="navbar">
        <h3 className='nav-heading' >Cool Talks</h3>
      </div>
      </Wrapper>
  )
}

const Wrapper = styled.section`

  .navbar {
    background: #000;
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white;
    position: fixed;
    top: 0;
  }

  .nav-heading {
    font-size: 2.5rem;
    font-family: monospace;
  }
`;

export default Header