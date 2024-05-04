import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './PostDetails.css';

const getShortValue = (value, maxLength) => {
  if (value.length > maxLength) {
    return value.substring(0, maxLength) + '...';
  }
  return value;
};

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleMore = () => {
    console.log(useParams);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="block2">
      {post ? (
        <div>
          <h1>{post.id}</h1>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>
            <button onClick={handleBack}>Back</button>
          </p>
        </div>
      ) : (
        <p>post cant resolve</p>
      )}
    </div>
  );
};

export default PostDetails;
