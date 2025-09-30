import styles from './PostComments.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import { MdUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { fetchCommentsApi, postCommentApiCall } from '../../../services/apis';
import { commentSliceActions } from '../../../store/reducers/commentSlice';
import { notificationSliceAction } from '../../../store/reducers/notificationSlice';

// import { RxCross2 } from "react-icons/rx";

const Comments = ({ setShowComments, postCommentsId }) => {
  const { comments, loading, error } = useSelector((store) => store.comments);
  const { currentUser, users } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      dispatch(commentSliceActions.fetchCommentStart());

      try {
        const data = await fetchCommentsApi();
        console.log(data);
        dispatch(commentSliceActions.fetchCommentsfulfilled(data));
      } catch (err) {
        dispatch(commentSliceActions.fetchCommentsFailed(JSON.stringify(err)));
      }
    };

    if (comments.length === 0) {
      fetchComments();
    }
  }, [comments, dispatch]);

  const [currentPostComment, setCurrentPostComment] = useState([]);
  useEffect(() => {
    setCurrentPostComment([]);
    const postComments = comments.filter(
      (comment) => comment.postId === postCommentsId
    );
    setCurrentPostComment(postComments);
  }, [comments]);

  const commentBody = useRef();
  const [commentError, setCommentError] = useState('');
  const onCommentChange = (event) => {
    setCommentError('');
  };

  const handleOnPostComment = async (event) => {
    event.preventDefault();

    let isValid = true;
    let newError = '';

    if (!commentBody.current.value) {
      newError = 'Write Comment Above';
      isValid = false;
    }

    setCommentError(newError);

    if (isValid) {
      setCommentError('');
      const ids = comments.map((comment) => comment.id);

      if (ids.length === 0) {
        ids.push(500);
      }
      const newId = Math.max(...ids) + 1;

      const newComment = {
        id: newId,
        postId: postCommentsId,
        email: currentUser.email,
        body: commentBody.current.value,
      };

      dispatch(commentSliceActions.createCommentStart());

      try {
        const data = await postCommentApiCall(newComment);

        const commentLocallyStore = {
          ...data,
          createdAt: new Date().toISOString(),
          id: newId,
          userId: currentUser.id,
        };
        dispatch(commentSliceActions.createCommentSuccess(commentLocallyStore));
      } catch (err) {
        dispatch(commentSliceActions.createCommentFailure(JSON.stringify(err)));
      }
      commentBody.current.value = '';
    }
  };
  // .................DELETE COMMENT'S LOGIC.................
  const handleDeleteComment = (commentId) => {
    dispatch(commentSliceActions.deleteComment(commentId));
    dispatch(
      notificationSliceAction.showNotification({ message: 'Comment Deleted' })
    );
  };

  // .................EDIT COMMENT'S LOGIC.................
  const [editingCommentId, setEditingCommentId] = useState(null); // Track the comment being edited
  const [editedBody, setEditedBody] = useState(''); // Store the edited content

  const handleEditComment = (commentId, body) => {
    setEditingCommentId(commentId);
    setEditedBody(body);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedBody('');
  };

  const handleSubmitEdit = () => {
    if (!editedBody.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }

    dispatch(
      commentSliceActions.updateComment({
        id: editingCommentId,
        body: editedBody.trim(),
      })
    );

    dispatch(
      notificationSliceAction.showNotification({ message: 'Comment Updated' })
    );
    setEditingCommentId(null);
    setEditedBody('');
  };

  return (
    <>
      <div className={` w-100 ${styles.container}`}>
        <div className='row d-flex justify-content-center h-100 '>
          <div className='col-md-9 col-sm-10  h-100'>
            <div
              className={`d-flex flex-column h-100 ${styles.commentSection}`}
              // key={postCommentsId}
            >
              <div className={styles.comments}>
                <RxCross2
                  className={`${styles.cancelCommentIcon} ml-2`}
                  type='button'
                  onClick={() => setShowComments(false)}
                />
                {loading && (
                  <div className='text-center my-5 pt-5'>
                    <div
                      className='spinner-border text-light'
                      role='status'
                    ></div>
                    <p className='text-white fw-bold fs-2'>
                      Loading Comments...
                    </p>
                  </div>
                )}
                {error && (
                  <p className='w-100 text-center mt-5 '>Error: {error}</p>
                )}

                {currentPostComment.length === 0 && !loading && (
                  <h5 className='w-100 mt-5 text-center text-center '>
                    No Comments Aavailable...
                  </h5>
                )}
                {comments.length !== 0 &&
                  !loading &&
                  currentPostComment.map((comment) => (
                    <div className=' p-2' key={comment.id}>
                      <div className='d-flex flex-row user-info w-100'>
                        <img
                          className='rounded-circle border border-2 border-light object-fit-cover'
                          src={
                            users.find((user) => user.email === comment.email)
                              ?.profilePhoto ||
                            'https://365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png'
                          }
                          width='50'
                          height='50'
                        />
                        <div className='ms-3 d-flex flex-column justify-content-start ml-2'>
                          <span
                            className='d-block fw-bold'
                            style={{ color: '#3e9025' }}
                          >
                            {users.find((user) => user.email === comment.email)
                              ?.name || comment.email}
                          </span>
                          <span
                            className='date text-secondary'
                            style={{ fontSize: '12px' }}
                          >
                            Shared publicly -
                            {comment.createdAt
                              ? `${new Date(comment.createdAt).toLocaleString(
                                  undefined,
                                  {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  }
                                )}`
                              : 'Jan 01, 2025, 12:00 AM'}
                          </span>
                        </div>
                      </div>
                      {editingCommentId === comment.id ? (
                        <div className='mt-2 ms-sm-5 ps-sm-3 '>
                          <textarea
                            className='w-100 bg-transparent'
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            rows='2'
                          ></textarea>
                          <div className='d-flex justify-content-end mt-2 gap-2'>
                            <button
                              className='Btn px-3 py-1 '
                              onClick={handleSubmitEdit}
                            >
                              <MdUpload />
                            </button>
                            <button
                              className='Btn bg-secondary px-3 py-1 '
                              onClick={handleCancelEdit}
                            >
                              <RxCross2 />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className='mt-2 ms-sm-5 ps-sm-3 d-flex justify-content-between align-items-center '>
                          <p className='text-light text-capitalize '>
                            {comment.body}
                          </p>
                          {currentUser.id === comment.userId && (
                            <div
                              className={`d-flex justify-content-end gap-3 ${styles.crudIcons}`}
                            >
                              {/* Edit Icon */}
                              <span
                                className={styles.editCommentIcon}
                                onClick={() =>
                                  handleEditComment(comment.id, comment.body)
                                }
                                style={{ cursor: 'pointer' }}
                              >
                                <CiEdit />
                              </span>
                              {/* Delete Icon */}
                              <span
                                className='text-danger'
                                onClick={() => handleDeleteComment(comment.id)}
                                style={{ cursor: 'pointer' }}
                              >
                                <MdOutlineDeleteForever />
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              <div
                className={` p-2  ${styles.commentInput} d-flex align-items-center  `}
              >
                <div
                  className='ms-1 d-flex flex-row justify-content-between align-items-center w-100'
                  style={{
                    pointerEvents: editingCommentId ? 'none' : 'auto',
                    opacity: editingCommentId ? 0.3 : 1,
                  }}
                >
                  <img
                    className='rounded-circle'
                    src={currentUser.profilePhoto}
                    width='40'
                    height='40'
                  />
                  <textarea
                    id='body'
                    className='ms-2'
                    placeholder='type here...'
                    ref={commentBody}
                    onChange={onCommentChange}
                    // value={body}
                    // onChange={(e) => onBodyChange(e)}
                    rows='2'
                  ></textarea>

                  <MdUpload
                    className={`${styles.commentPostIcon} me-1 `}
                    onClick={handleOnPostComment}
                  />
                </div>
                {commentError && (
                  <small className='text-light text-center text-start d-block'>
                    {commentError}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Comments;
