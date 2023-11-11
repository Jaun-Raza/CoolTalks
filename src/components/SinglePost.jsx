import React, { useEffect, useState } from 'react'
import Post from './Post'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const URL = 'https://ecomm-server-sepia.vercel.app/posts/'

const SinglePost = ({ getSinglePosts, singleposts, userData }) => {

  const { id } = useParams();
  const [comment, setComment] = useState({ commentId: "",userImg: "", username: "", userComment: "" });

  const handleChange = (e) => {
    const randomNum = Math.random()
    setComment({
      commentId: randomNum,
      userImg: userData.image,
      username: userData.username,
      userComment: e.target.value
    });
  }

  const handleDeleteComment = async(userName, commentId) => {
    const email = userData.username
    if(email) {
      const res = await axios.post(URL + 'delete', {
        commentId: commentId,
        postId: id,
        userName: userName,
        checkName: email
      })
      window.location.href = `http://localhost:3000/post/${id}`;
    }
  }


  const handleClick = async () => {

    const { commentId, userImg, username, userComment } = comment;

    if (userComment !== "") {
      const res = await axios.post(URL + 'comment', {
        commentId: commentId,
        post_id: id,
        userImg: userImg,
        username: username,
        comment: userComment
      })
      window.location.href = `http://localhost:3000/post/${id}`;
    }

  }
  console.log(comment);
  useEffect(() => {
    getSinglePosts(URL + id)
  }, [])

  return (
    <Wrapper>
      <div className="container">
        <Post {...singleposts} />
      </div>
      <CommentSection>
        <InputContainer>
          <input
            type="text"
            name="comment"
            placeholder="Add a public comment..."
            onChange={handleChange}
          />
          <button type="button" onClick={handleClick}>
            Comment
          </button>
        </InputContainer>
        <CommentList>
          {singleposts.comments ?
            singleposts.comments.map((currElem, index) => (
              <Comment key={index}><div style={{
                display: 'flex', marginBottom: '5px'}}>
                <img
                  src={currElem.userImg}
                  alt="User Profile"
                  className="profile-image"
                /><p style={{ color: 'gray' }}>{currElem.username}</p></div>{currElem.comment}<form action={`http://localhost:3000/post/${id}`}>
                  <button style={{float: 'right', padding: '0.5rem 1rem', backgroundColor: '#065fd4',color: '#fff',border: 'none', borderRadius: '4px', cursor: 'pointer'}} onClick={() => {
                  handleDeleteComment(currElem.username, currElem.commentId)
                }} >Delete</button></form></Comment>
            )) : null}
        </CommentList>
      </CommentSection>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    margin-top: 9rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-right: 5rem;
  gap: 2rem;
  }

  .comments {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .profile-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .container {
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
    .container {
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

const CommentSection = styled.div`
width: 100%;
color: #fff;
padding: 1rem;
display: flex;
flex-direction: column;
align-items: center;
gap: 1rem;
margin-bottom: 15rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  justify-content: center;

  input {
    flex-grow: 0.8;
    outline: none;
    border: none;
    border-bottom: 2px solid #555;
    color: #cfcfcf;
    background-color: #0a0a0a;
    height: 42px;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #065fd4;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 88%;
  gap: 1rem;
`;

const Comment = styled.div`
width: 100%;
padding: 2rem;
border-bottom: 1px solid #555;
font-size: medium;
font-family: system-ui;
`;


export default SinglePost