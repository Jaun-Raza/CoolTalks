import React from 'react';
import styled from 'styled-components';
import Post from './Post';

const UserInfo = ({ userData, posts }) => {
    
  const userPosts = posts.filter((currElem) => currElem.username === userData.username);
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likesCount, 0);

  return (
    <Wrapper>
      <div className="userInfo">
        <div>
          <ProfileImage src={userData.image} alt={userData.username} />
          <Username>{userData.username}</Username>
        </div>
        <div>
          <PostsInfo>
            <strong>{userData.post.length}</strong> 
            <strong>Posts</strong>
          </PostsInfo>
          <br />
          <br />
          <LikesInfo>
            <strong>{totalLikes}</strong>

            <strong>Likes</strong>
          </LikesInfo>
        </div>
      </div>
        <hr style={{marginTop: '7rem'}} />
      <div className="userPost">
        {userPosts.map((currElem) => (
          <Post key={currElem.postId} {...currElem} userData={userData} />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 8rem;
  margin-bottom: 5rem;

  .userInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    div {
      display: flex;
      align-items: center;
      gap: 1rem;  

      &:first-child {
        img {
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
  }

  .userPost {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    gap: 3rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .userPost {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-right: 34px;
    }
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const Username = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: white;
  
`;

const PostsInfo = styled.h1`
  margin: 0;
  color: white;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  text-align:center;
  gap:10px;
`;

const LikesInfo = styled.div`
  color: white;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
`;

export default UserInfo;
