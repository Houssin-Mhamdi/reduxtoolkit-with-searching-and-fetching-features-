import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slice/postSlice.js';
import Loading from "./Loading/Loading.jsx";
import "./Posts.css";
import SearchPost from "./SearchPost";

const PostsList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])
  const { posts, loading, error } = useSelector((state) => {
    return state.posts
  })

  return (
    <>
      <SearchPost />
      <div className="posts-list">
        <h1>Total Posts 100</h1>
        {loading ? <Loading /> : error ? <h2>{error}</h2> : posts.map((post) => {
          return (
            <div key={post.id} className="post-details">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default PostsList;
