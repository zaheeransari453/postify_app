import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Posts.module.css";

import PostCard from "./PostCard";
import PostComments from "./components/PostComments";

const BookMarkPosts = () => {
  const { postsList, loading, error } = useSelector((store) => store.posts);
  const { currentUser, users } = useSelector((store) => store.users);

  // Filter posts bookmarked by the current user
  const bookmarkedPosts = postsList.filter((post) =>
    post.bookMarks?.some((bookmark) => bookmark.userId === currentUser.id)
  );

  //.....................Post Action DropDown....................
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ...................Comments Logic.....................
  const [showComments, setShowComments] = useState(false);
  const [postCommentsId, setPostCommentsId] = useState(null);
  const handleOnComment = (id) => {
    setPostCommentsId(id);
    setShowComments(true);
    setActiveDropdown(false);
  };

  if (loading) {
    return (
      <div className="text-center my-5 pt-5">
        <div className="spinner-border text-white" role="status"></div>
        <p className="text-white fs-2">Loading Posts...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-5">Error: {error}</div>;
  }

  return (
    <>
      {/* <div ref={topRef} className="" /> */}
      <div className="container-fluid position-relative">
        {bookmarkedPosts.length === 0 ? (
          <div className="mt-5 text-center text-dark fw-bold fs-1">
            No Posts
          </div>
        ) : (
          <>
            {showComments ? (
              <div
                className={`${styles.commentSection} ${
                  showComments ? styles.active : ""
                }`}
              >
                <PostComments
                  postCommentsId={postCommentsId}
                  setShowComments={setShowComments}
                />
              </div>
            ) : (
              <div className="row justify-content-center ">
                {bookmarkedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    users={users}
                    currentUser={currentUser}
                    setShowComments={setShowComments}
                    setPostCommentsId={setPostCommentsId}
                    handleOnComment={handleOnComment}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BookMarkPosts;
