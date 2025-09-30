import React, { useState } from 'react';
import styles from './PostCard.module.css';

import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import CustomDeleteDialog from '../../components/dialoges/CustomDeleteDialog';
import EditPost from './components/EditPost';
import { useDispatch } from 'react-redux';
import { PostsSliceActions } from '../../store/reducers/postsSlice';
import { deletePost, editPost } from '../../services/apis';
import { notificationSliceAction } from '../../store/reducers/notificationSlice';

const PostCard = ({
  post,
  users,
  currentUser,
  setShowComments,
  setPostCommentsId,
  handleOnComment,
  setActiveDropdown,
  activeDropdown,
}) => {
  const dispatch = useDispatch();

  const toggleDropdown = (postId) => {
    setActiveDropdown((prev) => (prev === postId ? null : postId));
  };

  // ...................Like and Unlike .....................
  const handleToggleLike = (postId) => {
    dispatch(
      PostsSliceActions.toggleLike({
        postId,
        userId: currentUser.id,
      })
    );
    setActiveDropdown(false);
  };
  // ...................BookMarks Logic.....................
  const handleToggleBookmark = (postId) => {
    dispatch(
      PostsSliceActions.toggleBookmark({
        postId,
        userId: currentUser.id,
      })
    );
    setActiveDropdown(false);
  };

  // ...............Delete Post.................
  const [dialogOpen, setDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const dialogPayload = {
    title: 'Confirm Post Deletion',
    message: 'Are you sure to delete this post!',
  };

  const handleDelete = async (postId) => {
    setPostToDelete(postId);
    setDialogOpen(true);
  };
  const OnConfirmDelete = async () => {
    try {
      await deletePost(postToDelete);
      dispatch(PostsSliceActions.deletePostSuccess(postToDelete));
      dispatch(
        notificationSliceAction.showNotification({ message: 'Post Deleted!' })
      );
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
    }
    setDialogOpen(false);
    setPostToDelete(null);
  };
  const onCancelDelete = () => {
    setDialogOpen(false);
    setPostToDelete(null);
  };

  //.....................EIDT POST..................
  const [editingPost, setEditingPost] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const handleEdit = (post) => {
    setEditingPost(post);
    setIsEditFormOpen(true);
  };

  const handleEditSubmit = async (updatedPost) => {
    if (updatedPost.id > 0 && updatedPost.id <= 100) {
      try {
        const updatedData = await editPost(editingPost.id, updatedPost);
        console.log(updatedData);
        dispatch(PostsSliceActions.editPostSuccess(updatedData));
        dispatch(
          notificationSliceAction.showNotification({ message: 'Post Updated!' })
        );
        setEditingPost(null);
      } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post.');
      }
    }
    if (updatedPost.id > 100) {
      dispatch(PostsSliceActions.editPostSuccess(updatedPost));
      dispatch(
        notificationSliceAction.showNotification({ message: 'Post Updated!' })
      );
      setEditingPost(null);
    }
    toggleDropdown(updatedPost.id);
  };
  return (
    <>
      {dialogOpen && (
        <CustomDeleteDialog
          dialogPayload={dialogPayload}
          onCancelDelete={onCancelDelete}
          OnConfirmDelete={OnConfirmDelete}
        />
      )}
      {isEditFormOpen && (
        <EditPost
          setIsEditFormOpen={setIsEditFormOpen}
          editingPost={editingPost}
          handleEditSubmit={handleEditSubmit}
        />
      )}
      <div className=' col-md-9 col-sm-10 col-12  mt-3'>
        <div
          className={` ${styles.card} d-flex flex-column justify-content-between w-100`}
        >
          {users.map(
            (user) =>
              user.id === post.userId && (
                <div
                  className={`w-100 d-flex justify-content-between align-items-center p-2 ${styles.userInfo}`}
                  key={user.id}
                >
                  <div className='d-flex '>
                    <img
                      src={
                        user.profilePhoto ||
                        'https://bootdey.com/img/Content/avatar/avatar7.png'
                      } // Replace with actual avatar URL
                      alt='User Avatar'
                      className={`${styles.avatar}`}
                    />
                    <span
                      className={`${styles.name} d-flex flex-column gap-0 gy-0 ms-2`}
                    >
                      {user.name || 'Unknown User'}
                      <small className={`${styles.userName}`}>
                        {user.username || 'NA'}
                      </small>
                    </span>
                  </div>
                  <div className='position-relative'>
                    <HiDotsVertical
                      onClick={() => toggleDropdown(post.id)}
                      className={styles.dropdownIcon}
                      style={{ cursor: 'pointer' }}
                    />
                    {activeDropdown === post.id && (
                      <div className={styles.dropdownMenu}>
                        {post.userId === currentUser.id ? (
                          <>
                            <span
                              className={styles.dropdownItem}
                              onClick={() => handleDelete(post.id)}
                            >
                              Delete
                            </span>
                            <span
                              className={styles.dropdownItem}
                              onClick={() => handleEdit(post)}
                            >
                              Edit
                            </span>
                            <span
                              className={styles.dropdownItem}
                              onClick={() => handleToggleBookmark(post.id)}
                            >
                              Bookmark
                            </span>
                            <span
                              className={styles.dropdownItem}
                              onClick={() => handleToggleLike(post.id)}
                            >
                              Like
                            </span>
                            <span
                              className={styles.dropdownItem}
                              onClick={() => handleOnComment(post.id)}
                            >
                              Comment
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              className={styles.dropdownItem}
                              onClick={() => handleToggleBookmark(post.id)}
                            >
                              Bookmark
                            </span>
                            <span
                              className={styles.dropdownItem}
                              onClick={() => handleToggleLike(post.id)}
                            >
                              Like
                            </span>
                            <span
                              className={styles.dropdownItem}
                              onClick={() => handleOnComment(post.id)}
                            >
                              Comment
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
          )}

          <div className={` p-2 ${styles.post} w-100`}>
            <h5 className={` ${styles.title}`}>{post.title}</h5>
            <p>{post.body}</p>
          </div>
          <div className='d-flex justify-content-end me-2'>
            <span
              className='date text-secondary'
              style={{ fontSize: '14px', marginTop: '-12px' }}
            >
              {post.createdAt
                ? ` ${new Date(post.createdAt).toLocaleString(undefined, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`
                : 'Jan 01, 2025, 12:00 AM'}
            </span>
          </div>
          <div
            className={`${styles.cardFooter} text-dark px-2 py-auto d-flex justify-content-between align-items-center w-100`}
          >
            <div className='d-flex gap-3 ms-1 fs-4'>
              <span className='me-1'>
                {currentUser &&
                Array.isArray(post.likes) &&
                post.likes.some((like) => like.userId === currentUser.id) ? (
                  <FaHeart
                    className={styles.heartIcon}
                    onClick={() => handleToggleLike(post.id)}
                  />
                ) : (
                  <FaRegHeart
                    className={styles.heartIcon}
                    onClick={() => handleToggleLike(post.id)}
                  />
                )}
                <span className='fs-5 ms-1 '>
                  {Array.isArray(post.likes) ? post.likes.length : 0}
                </span>
              </span>

              <span>
                <FaRegComment
                  className={styles.commentIcon}
                  onClick={() => handleOnComment(post.id)}
                />
                {/* <span className="fs-5 ms-1">
            {comments.filter(
              (comment) => comment.postId === post.id
            ).length || 0}
          </span> */}
              </span>
            </div>

            <div className='fs-4'>
              {currentUser &&
              Array.isArray(post.bookMarks) &&
              post.bookMarks.some(
                (bookmark) => bookmark.userId === currentUser.id
              ) ? (
                <IoBookmark
                  className={styles.commentIcon}
                  onClick={() => handleToggleBookmark(post.id)}
                />
              ) : (
                <IoBookmarkOutline
                  className={styles.commentIcon}
                  onClick={() => handleToggleBookmark(post.id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
