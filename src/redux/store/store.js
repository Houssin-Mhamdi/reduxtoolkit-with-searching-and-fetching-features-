import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../slice/postSlice";

const store = configureStore({
    reducer: {
        posts: postsReducer,
    }
})

export default store