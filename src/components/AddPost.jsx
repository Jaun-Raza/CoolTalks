import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const URL = 'https://ecomm-server-sepia.vercel.app/'

const AddPost = ({ userData }) => {

  const userImg = userData.image;

  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState("");

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleImageChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.onerror = err => {
      console.log("Error: ", err);
    }
  };

  const handlePostSubmit = async() => {
    const res = await axios.post(URL + 'addPost', {
      text: postText,
      image: selectedImage,
      username: userData.username,
      email: userData.email,
      profilePic: userImg
    })

  };

  return (
    <Wrapper>
      <div className="container">
        <div className="tweet">
          <div className="user-info">
            <img
              src={userImg}
              alt="User Profile"
              className="profile-image"
            />
            <div className="user-details">
              <p className="username">{userData.username}</p>
            </div>
          </div>
          <p className="tweet-text">{postText}</p>
          <div>
            {
              selectedImage !== "" ? <img src={selectedImage} style={{
                borderRadius: '1rem',
                width: '100%',
                height: '35rem'
              }} alt="" /> : null
            }
          </div>
        </div>
      </div>
      <form action="/">
        <TextInput
          placeholder="What's on your mind?"
          value={postText}
          onChange={handleTextChange}
        />
        <ImageInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      <br />
      {postText !== "" ? <PostButton onClick={handlePostSubmit}>Post</PostButton> : <PostButton style={{ backgroundColor: 'gray' }} disabled onClick={handlePostSubmit}>Post</PostButton>}
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
width: 100%;
max-width: 600px;
margin: 0 auto;
padding: 20px;
background-color: #fff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
margin-top: 9rem;
margin-bottom: 9rem;

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

  .container {
  width: 100%;
  padding-right: 4rem;

  }
  
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .container {
      width: 100%;
      padding-right: 8rem;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .container {
      width: 100%;
      padding-right: 8rem;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  span {
    font-weight: bold;
    font-size: 18px;
    margin-left: 10px;
    color: #333;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const TextInput = styled.textarea`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
`;

const ImageInput = styled.input`
border: none;
border-bottom: 1px solid #ddd;  
  margin-bottom: 20px;
`;

const PostButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export default AddPost;

