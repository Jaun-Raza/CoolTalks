import React, {useState, useReducer, useEffect, useContext, createContext} from "react";
import Axios from 'axios';
import reducer from '../reducer/HomeReducer';

const HomeContext = createContext();

const URL = "https://ecomm-server-sepia.vercel.app/foryou";

const initialState = {
    posts: [],
    singleposts : {}
}

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const getPosts = async (url) => {
        try {
            const res = await Axios.get(url)
            const posts = await res.data.foundPosts;
            dispatch({ type: "SET-API-DATA", payload: posts });
        } catch (error) {
            dispatch({ type: "API-ERROR" });
        }
    }

    const getSinglePosts = async (url) => {
        try {
            const res = await Axios.get(url)
            const singlePost = await res.data.foundPosts;
            dispatch({ type: "SET-SINGLE-DATA", payload: singlePost });
        } catch (error) {
            dispatch({ type: "SET-SINGLE-ERROR" });
        }
    }

    useEffect(() => {
        getPosts(URL); 
    }, []);

    return <HomeContext.Provider value={{ ...state , getSinglePosts}} >{children}</HomeContext.Provider>

}

const usePostContext = () => {
    return useContext(HomeContext);
}

export { AppProvider, usePostContext };