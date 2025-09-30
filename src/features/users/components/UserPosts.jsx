import React from 'react';
import styles from './UserPosts.module.css';
import { IoIosArrowBack } from 'react-icons/io';

import { useSelector } from 'react-redux';

const UserPosts = ({ setShowUserPosts, userId }) => {
  const { postsList } = useSelector((store) => store.posts);
  const userPost = postsList.filter((post) => post.userId === userId);
  return (
    <>
      <div className={styles.closeIcon}>
        <span onClick={() => setShowUserPosts(false)}>
          <IoIosArrowBack />
          <span>Back</span>
        </span>
      </div>
      {userPost.length === 0 ? (
        <h1 className='text-center text-white mt-5'>No Posts</h1>
      ) : (
        userPost.map((post) => (
          <div className={styles.postContent} key={post.id}>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </>
  );
};

export default UserPosts;
