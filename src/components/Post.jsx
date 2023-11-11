import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const URL = 'https://ecomm-server-sepia.vercel.app/'

const Post = ({ _id, postId, userImg, postImg, username, content, likesCount, date, comments, userData }) => {

  const [liked, setLiked] = useState(false);
  const [likes, setlikesCount] = useState(likesCount);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const POSTid = postId;

  const handleComment = (id) => {
    window.location.href = `/post/${_id}`;
  }


  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const deleteItem = async(e) => {
    // e.preventDefault();
    const name = userData.username
    if(name) {
      const res = await axios.post(URL + 'deletePost', {
        postId: postId,
        userName: username,
        checkName: name
      })
    }
  }


  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    if (likedPosts.includes(_id)) {
      setLiked(true);
    }
  }, [_id]);

  const handleLikeClick = async () => {
    try {
      // Toggle the liked status locally
      setLiked((prevLiked) => !prevLiked);

      const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
      if (liked) {
        const updatedLikedPosts = likedPosts.filter((id) => id !== _id);
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
      } else {
        likedPosts.push(_id);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      }

      // Send a POST request to update the like count on the server
      const response = await axios.post('https://ecomm-server-sepia.vercel.app/api/posts/like', {
        POSTid: POSTid,
        username: username,
        postId: _id,
        liked: !liked,
      });

      const postlikes = response.data.likesCount;

      setlikesCount(postlikes)


    } catch (error) {
      console.error('Error liking/unliking the post:', error);
      // Revert the liked status if there's an error
      setLiked((prevLiked) => !prevLiked);
    }

  };

  return (
    <Wrapper>
      <div className="tweet">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <div className="user-info">
          <img
            src={userImg}
            alt="User Profile"
            className="profile-image"
          />
          <div className="user-details">
              <NavLink to={'/userinfo/' + username} ><p className="username">{username}</p></NavLink>
            <p className="date">{date}</p>
          </div>
        </div>
        <div className="menu-container">
              <div className="three-dots" onClick={toggleMenu}>
                ...
              </div>
              {isMenuOpen && (
                <div className="menu-options">
                  <form action="/">
                  <button className="delete-option" type={'submit'} onClick={() => {
                    deleteItem(_id, username)
                  }}>
                    Delete
                  </button>
                  </form>
                </div>
              )}
            </div>
        </div>
            
        <p className="tweet-text">{content}</p>
        <div>
          {
            postImg !== undefined && postImg !== "" ? <img src={postImg} style={{
              borderRadius: '1rem',
              width: '100%',
              height: '35rem'
            }} alt="" /> : null
          }
        </div>
        <div className="actions">
          <div style={{ display: "flex", alignItems: 'center' }}>
            <img src="/assets/like.png" width={'38px'} style={{ backgroundColor: liked ? 'red' : 'white', borderRadius: '50px', cursor: "pointer" }} alt="like Btn" onClick={handleLikeClick} />
            <p className="action-button" style={{ backgroundColor: "black", color: "white" }}>{likes} Likes</p>
          </div>
          <div style={{ display: "flex", alignItems: 'center' }}>
            <p style={{ color: 'white' }}>{comments !== undefined ? comments.length : null}</p><button className="action-button comment-button" onClick={() => {
              handleComment(_id)
            }}>Comment</button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
/* Tweet.css */
.tweet {
  border: 1px solid white; /* White thin border */
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: black; /* Black background */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: white; /* White text color */
  margin: 0 auto; /* Center align the tweet */
  border: 1px solid white;
  margin: 2rem;
  padding: 2rem;
  gap: 1rem;
  border-radius: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  color: white;
}

.date {
  color: #657786;
  font-size: 14px;
  color: gray;
  margin-top: 5px;
}

.tweet-text {
  margin-top: 10px;
  word-wrap: break-word;
  color: white;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.action-button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.like-button {
  background-color: #e0245e;
  color: white;
}

.comment-button {
  background-color: #1da1f2;
  color: white;
  margin-left: 10px;
}

.menu-container {
  position: relative;
}

.three-dots {
  cursor: pointer;
  font-size: 24px;
}

.menu-options {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.delete-option {
  color: red;
  padding: 5px;
  font-size: 1.3rem;
  cursor: pointer;
  background-color: rgb(10, 10, 10);
  outline: none;
  border: none;
}

.delete-option:hover {
  background-color: #ffe6e6;
}


`

export default Post