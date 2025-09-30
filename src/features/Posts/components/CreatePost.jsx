import React, { useState } from 'react';
import styles from './CreatePost.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { PostsSliceActions } from '../../../store/reducers/postsSlice';
import { notificationSliceAction } from '../../../store/reducers/notificationSlice';
import { createPost, fetchPosts } from '../../../services/apis';

const CreatePost = ({ onClose, userId }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  const idTracker = useSelector((store) => store.posts.idTracker);

  const [error, setError] = useState({ titleError: '', bodyError: '' });
  const onTitleChange = (event) => {
    setTitle(event.target.value);
    setError({ ...error, titleError: '' });
  };
  const onBodyChange = (event) => {
    setBody(event.target.value);
    setError({ ...error, bodyError: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newError = { titleError: '', bodyError: '' };

    if (!title) {
      newError.titleError = 'Enter Post Title';
      isValid = false;
    }
    if (!body) {
      newError.bodyError = 'Enter Description';
      isValid = false;
    }
    setError(newError);

    if (isValid) {
      setError({ titleError: '', bodyError: '' });

      const uniqueId = idTracker;
      dispatch(PostsSliceActions.incrementIdTracker());

      const postData = { userId: userId, title, body };
      dispatch(PostsSliceActions.createPostStart());

      try {
        const posts = await createPost(postData);

        const postWithLocalId = {
          ...posts,
          id: uniqueId,
          createdAt: new Date().toISOString(),
          likes: [],
          bookMarks: [],
        };
        dispatch(PostsSliceActions.createPostSuccess(postWithLocalId));
        dispatch(
          notificationSliceAction.showNotification({ message: 'Post Added!' })
        );

        onClose();
      } catch (error) {
        dispatch(PostsSliceActions.createPostFailure(error.message));
      }
    }
  };
  return (
    <>
      <div className={`${styles.overlay} overlay`}>
        <div className={`${styles.dialog} dialog`}>
          <div className=" container text-center mt-5">
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <form
                  className={`modal-content border-0 `}
                  style={{ background: '#040B09' }}
                  onSubmit={handleSubmit}
                >
                  <div
                    className={`modal-header text-white border-0 ${styles.CustomDialogBackground}`}
                  >
                    <h5 className="modal-title">Create Post</h5>
                  </div>
                  <div className={`modal-body text-white ${styles.dialogBox}`}>
                    <label
                      htmlFor="title"
                      className="fw-bold"
                      style={{ color: ' #3E9025' }}
                    >
                      Post Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="w-100 "
                      placeholder="type here"
                      value={title}
                      onChange={(e) => onTitleChange(e)}
                    />
                    {error.titleError && (
                      <small className="text-light text-start d-block">
                        {error.titleError}
                      </small>
                    )}
                    <label
                      htmlFor="body"
                      className="mt-4 fw-bold"
                      style={{ color: ' #3E9025' }}
                    >
                      Post Body
                    </label>
                    <textarea
                      id="body"
                      className="w-100"
                      placeholder="type here..."
                      value={body}
                      onChange={(e) => onBodyChange(e)}
                      rows="5"
                    ></textarea>
                    {error.bodyError && (
                      <small className="text-light text-start d-block">
                        {error.bodyError}
                      </small>
                    )}
                  </div>
                  <div
                    className={`modal-footer border-0 ${styles.dialogBox}`}
                    style={{ background: '#030406' }}
                  >
                    <button
                      className={`btn btn-secondary`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent form submission
                        onClose(); // Close the modal
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.confirmBtn} Btn`}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
