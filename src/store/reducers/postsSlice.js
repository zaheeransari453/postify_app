import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    postsList: [],
    loading: null,
    error: null,
    idTracker: 101,
    scrollPosition: null,
  },
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.loading = false;
      state.postsList = action.payload;
    },
    fetchPostsFailed(state) {
      state.loading = false;
      state.error = action.payload;
    },

    createPostStart(state) {
      state.loading = true;
      state.error = null;
    },

    createPostSuccess(state, action) {
      state.loading = false;
      state.postsList = [action.payload, ...state.postsList];
    },
    createPostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostSuccess(state, action) {
      state.postsList = state.postsList.filter(
        (post) => post.id !== action.payload
      );
    },
    deletePostsByUser: (state, action) => {
      state.postsList = state.postsList.filter(
        (post) => post.userId !== action.payload
      );
      console.log(action.payload);
    },
    editPostSuccess(state, action) {
      const { id, title, body } = action.payload;
      const postIndex = state.postsList.findIndex((post) => post.id === id);

      if (postIndex !== -1) {
        state.postsList[postIndex] = {
          ...state.postsList[postIndex],
          title,
          body,
        };
      }
    },
    incrementIdTracker(state) {
      state.idTracker += 1;
    },
    toggleLike: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.postsList.find((p) => p.id === postId);

      if (post) {
        // Ensure likes is initialized as an array
        if (!Array.isArray(post.likes)) {
          post.likes = [];
        }

        const existingLikes = post.likes.find(
          (like) => like.userId === userId && like.postId === postId
        );

        if (existingLikes) {
          post.likes = post.likes.filter((like) => like.userId !== userId);
        } else {
          post.likes.push({ userId, postId });
        }
      }
    },
    toggleBookmark: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.postsList.find((p) => p.id === postId);

      if (post) {
        if (!Array.isArray(post.bookMarks)) {
          post.bookMarks = [];
        }

        const existingBookmark = post.bookMarks.find(
          (bookmark) => bookmark.userId === userId && bookmark.postId === postId
        );

        if (existingBookmark) {
          post.bookMarks = post.bookMarks.filter(
            (bookmark) => bookmark.userId !== userId
          );
        } else {
          post.bookMarks.push({ userId, postId });
        }
      }
    },
  },
});

export const PostsSliceActions = postsSlice.actions;
export default postsSlice;
