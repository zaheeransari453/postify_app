import React from 'react';
import styles from './UserPosts.module.css';
import { IoIosArrowBack } from 'react-icons/io';

import { useSelector } from 'react-redux';

const UserLikedPosts = ({ setShowUserLiked, userId }) => {
  const { postsList } = useSelector((store) => store.posts);

  // Filter posts bookmarked by the current user
  const likedPosts = postsList.filter((post) =>
    post.likes?.some((like) => like.userId === userId)
  );

  return (
    <>
      <div className={styles.closeIcon}>
        <span onClick={() => setShowUserLiked(false)}>
          <IoIosArrowBack />
          <span>Back</span>
        </span>
      </div>
      {likedPosts.length === 0 ? (
        <h1 className='text-center text-white mt-5'>No Posts</h1>
      ) : (
        likedPosts.map((post) => (
          <div className={styles.postContent} key={post.id}>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </>
  );
};

export default UserLikedPosts;
