import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/partials/Header"
import Footer from "./components/partials/Footer"
import Home from "./components/Home";
import UserInfo from "./components/UserInfo";
import AddPost from "./components/AddPost";
import SinglePost from "./components/SinglePost";
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './GlobalStyle';
import { usePostContext } from './context/HomeContext'
import Signup from './components/Signup';
import Login from './components/Login';
import AuthPage from './components/AuthPage';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfoUser from './components/UserInfoUser'

const cookie = Cookies.get('coolTalks');
const URL = 'https://ecomm-server-sepia.vercel.app/'

function App() {

  const [userData, setUserData] = useState({});
  const [isAuthenticated, setisAuthenticated] = useState(false)

  const {posts, getSinglePosts, singleposts} = usePostContext();

  const loadUserData = async(url) => {  
    if(cookie) {
      const res = await axios.post(url + 'userData', {
        email: cookie
      });

      const data = res.data.foundUser;
      setisAuthenticated(true);
      setUserData(data)
    }
  }

  useEffect(() => {
    loadUserData(URL)
  }, [])

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };



  return (
    <>
      <ThemeProvider theme={theme} >
        <Router>
        <GlobalStyle />
        <Header />
          <Routes>
            <Route path="/" element={<Home userData={userData} posts={posts} />} />
            <Route path="/userinfo" element={isAuthenticated ? <UserInfo userData={userData} posts={posts} /> : <AuthPage />} />
            <Route path="/addPost" element={isAuthenticated ? <AddPost userData={userData} /> : <AuthPage />} />
            <Route path="/userinfo/:username" element={<UserInfoUser  data={userData} posts={posts} />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post/:id" element={isAuthenticated ? <SinglePost getSinglePosts={getSinglePosts} singleposts={singleposts} userData={userData} />: <AuthPage />} />
          </Routes>
        <Footer userData={userData}/>
        </Router>
      </ThemeProvider>
    </>
  );
}



export default App;
