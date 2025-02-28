import { useEffect, useState, useContext } from 'react';
import Post from '../post';
import { getPosts } from '../../service/apiClient';
import { AuthContext } from '../../context/auth';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    getPosts()
    .then(setPosts)
    .catch((error) => {
      console.error(error.message);
      if (error.message === "Unauthorized (Likely expired token)") {
        authContext.onLogout();
      }
    })}, []);


  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            name={`${post.author.firstName} ${post.author.lastName}`}
            date={post.createdAt}
            content={post.content}
            comments={post.comments}
          />
        );
      })}
    </>
  );
};

export default Posts;
