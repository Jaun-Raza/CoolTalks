const HomeReducer = (state, action) => {
    switch (action.type) {
        case "SET-API-DATA":

            const allPosts = action.payload;

            return {
                ...state,
                posts: [...allPosts]
            }
        
        case "SET-SINGLE-DATA":

            const singlePost = action.payload;

            return {
                ...state,
                singleposts: singlePost
            }
    
        default:
            return state;
    }
}

export default HomeReducer;