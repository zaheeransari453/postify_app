import React from 'react';
import styles from './UserPosts.module.css';
import { IoIosArrowBack } from 'react-icons/io';

import { useSelector } from 'react-redux';

const UserSavedPosts = ({ setShowUserSaved, userId }) => {
  const { postsList } = useSelector((store) => store.posts);

  // Filter posts bookmarked by the current user
  const bookmarkedPosts = postsList.filter((post) =>
    post.bookMarks?.some((bookmark) => bookmark.userId === userId)
  );

  return (
    <>
      <div className={styles.closeIcon}>
        <span onClick={() => setShowUserSaved(false)}>
          <IoIosArrowBack />
          <span>Back</span>
        </span>
      </div>
      {bookmarkedPosts.length === 0 ? (
        <h1 className='text-center text-white mt-5'>No Posts</h1>
      ) : (
        bookmarkedPosts.map((post) => (
          <div className={styles.postContent} key={post.id}>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </>
  );
};

export default UserSavedPosts;
