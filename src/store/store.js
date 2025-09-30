import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./reducers/userSlice";
// import postsSlice from "./Slices/postsSlice";
import { loadState, saveState } from "../services/localStorage";
import notificationSlice from "./reducers/notificationSlice";
import postsSlice from "./reducers/postsSlice";
import commentSlice from "./reducers/commentSlice";
// import albumsSlice from "./Slices/AlbumSlice";
// import photosGallarySlice from "./Slices/PhotoGallarySlice";
// import commentSlice from "./Slices/commentSlice";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    posts: postsSlice.reducer,
    // albums: albumsSlice.reducer,
    // photos: photosGallarySlice.reducer,
    notification: notificationSlice.reducer,
    comments: commentSlice.reducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    posts: store.getState().posts,
    users: store.getState().users,
    comments: store.getState().comments,
  });
});

export default store;
