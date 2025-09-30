import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { PostsSliceActions } from "../../store/reducers/postsSlice";
// import { deletePost, fetchPosts } from "../../Utils/apis";
import styles from './Posts.module.css';

import { FaPlus } from 'react-icons/fa6';

// import CreatePostForm from "./CreatePostForm";
// import Comments from "../Comments/Comments";
// import CustomDeleteDialog from "../../Dialogs/CustomDeleteDialog";
// import EditPostForm from "./EditPostForm";
import { notificationSliceAction } from '../../store/reducers/notificationSlice';
import { PostsSliceActions } from '../../store/reducers/postsSlice';
import { deletePost, editPost, fetchPosts } from '../../services/apis';
import CreatePost from './components/CreatePost';
import PostCard from './PostCard';
import CustomDeleteDialog from '../../components/dialoges/CustomDeleteDialog';
import EditPost from './components/EditPost';
import PostComments from './components/PostComments';

const Posts = () => {
  // Fetch posts from JSONPlaceholder API
  const dispatch = useDispatch();
  const { postsList, loading, error } = useSelector((store) => store.posts);
  const { currentUser, users } = useSelector((store) => store.users);
  //   const { comments } = useSelector((state) => state.comments);

  useEffect(() => {
    const fetchPostsHandle = async () => {
      dispatch(PostsSliceActions.fetchPostsStart());
      try {
        const posts = await fetchPosts();
        dispatch(PostsSliceActions.fetchPostsSuccess(posts));
      } catch (error) {
        console.error('Error fetching albums:', error);
        dispatch(PostsSliceActions.fetchPostsFailed(error.message));
      }
    };

    //  fetchPostsHandle();
    if (postsList.length === 0) {
      fetchPostsHandle(); // Fetch posts only if postsList is empty
    }
  }, [postsList, dispatch]);

  const topRef = useRef(null);
  useEffect(() => {
    if(topRef.current){
    topRef.current.scrollIntoView({
      behavior: 'smooth',
    });}
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleOnCloseButton = () => {
    setIsFormOpen(false);
  };

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

  // ...................Loding.....................
  if (loading) {
    return (
      <div className='text-center my-5 pt-5'>
        <div className='spinner-border text-dark' role='status'></div>
        <p className='text-dark fw-bold fs-2'>Loading Posts...</p>
      </div>
    );
  }

  if (error) {
    return <div className='alert alert-danger mt-5'>Error: {error}</div>;
  }

  return (
    <>
      <div ref={topRef} className='' />

      <div className='container-fluid position-relative '>
        <button
          className={`${styles.createBtn}`}
          onClick={() => setIsFormOpen(true)}
        >
          create <FaPlus className='fs-5' />
        </button>
        {isFormOpen && (
          <CreatePost
            onClose={handleOnCloseButton}
            userId={currentUser.id || 'N/A'}
          />
        )}

        {showComments ? (
          <div
            className={`${styles.commentSection} ${
              showComments ? styles.active : ''
            }`}
          >
            <PostComments
              postCommentsId={postCommentsId}
              setShowComments={setShowComments}
            />
          </div>
        ) : (
          <div className='row justify-content-center '>
            {postsList.map((post) => (
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
      </div>
    </>
  );
};

export default Posts;
