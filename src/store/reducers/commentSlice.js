import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCommentStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsfulfilled(state, action) {
      state.loading = false;
      state.comments = action.payload;
    },
    fetchCommentsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createCommentStart(state) {
      state.loading = true;
      state.error = null;
    },

    createCommentSuccess(state, action) {
      state.loading = false;
      state.comments = [action.payload, ...state.comments];
    },
    createCommentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateComment(state, action) {
      const { id, body } = action.payload;
      const commentIndex = state.comments.findIndex(
        (comment) => comment.id === id
      );
      if (commentIndex !== -1) {
        state.comments[commentIndex].body = body;
      }
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const commentSliceActions = commentSlice.actions;

export default commentSlice;
