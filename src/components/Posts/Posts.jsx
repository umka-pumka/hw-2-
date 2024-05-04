import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './posts.css';

const getShortValue = (value, maxLength) => {
  if (value.length > maxLength) {
    return value.substring(0, maxLength) + '...';
  }
  return value;
};

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleMoreClick = (postId) => {
    console.log(`Ещё: ${postId}`);
  };

  return (
    <div className='block-content'>
      {posts.map((post) => (
        <div className='key' key={post.id}>
          <div className="block">
            <div className="text">
          <h1>{post.id}</h1>
          <h2>{post.title}</h2>
          <h4>{getShortValue(post.body, 20)}</h4>
          <div>
            <Link className='more' to={`/posts/${post.id}`}>More...</Link>
            <button className='details' onClick={() => handleMoreClick(post.id)}>
              <Link to={`/posts/${post.id}`}>Details</Link>
            </button>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
