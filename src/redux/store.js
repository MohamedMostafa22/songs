import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songsSlice";

export default configureStore({
  reducer: {
    songs: songsReducer,
  },
});
