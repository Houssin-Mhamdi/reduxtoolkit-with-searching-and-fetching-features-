import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../utils/apiUrl.js'

const initialState = {
    posts: [],
    loading: false,
    error: undefined,
}

//actions
export const fetchPosts = createAsyncThunk('posts/fetch', async (payload,{rejectWithValue,getState,dispatch}) => {
   try {
    const res = await axios.get(apiUrl);
    return res.data;
   } catch (error) {
        return rejectWithValue(error.response.status)
   }
})
export const searchPost = createAsyncThunk('posts/search', async (id,{rejectWithValue,getState,dispatch}) => {
    try {
     const res = await axios.get(`${apiUrl}/${id}`);
     return res.data;
    } catch (error) {
         return rejectWithValue(error.response.status)
    }
 })

// slice 

const postSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        //handle actions
        //pending 
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.loading = true
        });
        //fulfild
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
        })
        //rejected
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false
            state.posts = []
            state.error = action.payload
        });

        builder.addCase(searchPost.pending, (state, action) => {
            state.loading = true
        });
        //fulfild
        builder.addCase(searchPost.fulfilled, (state, action) => {
            state.loading = false
            state.posts = [action.payload]
        })
        //rejected
        builder.addCase(searchPost.rejected, (state, action) => {
            state.loading = false
            state.posts = []
            state.error = action.payload
        });




    }

})

//generate reducer 
const postsReducer = postSlice.reducer
export default postsReducer