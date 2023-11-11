import React, { useState, useEffect } from 'react'
import Post from './Post';
import styled from "styled-components";

const Home = ({posts, userData}) => {

  const [shuffledPost, setShuffledPost] = useState([]);
  const [Error, setError] = useState("");

  useEffect(() => {
    const shuffled = [...posts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledPost(shuffled);
  }, [posts])


  return (
    <Wrapper>
      <div className='home' >
        {
          shuffledPost.map((currElem, index) => {
            return <Post key={index} {...currElem} userData={userData}/>
          })
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .home {
    margin-top: 9rem;
    margin-bottom: 9rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-right: 4rem;
    gap: 2rem;
  }

  .error-msg{
    color: red;
    font-size: 4rem;
    text-align: center;
    font-family: meth;
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .home {
      margin-top: 9rem;
      margin-bottom: 9rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding-right: 4rem;
      gap: 2rem;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .home {
      margin-top: 9rem;
      margin-bottom: 9rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      padding-right: 4rem;
      gap: 2rem;
    }
  }
`;



export default Home