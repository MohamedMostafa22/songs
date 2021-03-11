import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _includes from "lodash/includes";

import {
  getSongs,
  addSong,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../api/songs";

function roundHalf(num) {
  return Number((Math.round(num * 2) / 2).toFixed(1));
}

function calculateRating(level) {
  const ratio = Number(level) / 15;
  if (ratio % 1 !== 0) return roundHalf(ratio * 5);
  return ratio * 5;
}

function transformToAppStructure(data, favorites) {
  return data.map((item) => ({
    ...item,
    rating: calculateRating(item.level),
    liked: _includes(favorites, item.id),
  }));
}

function transformToServerStructure(song) {
  return {
    title: song.title,
    artist: song.artist,
    images: song.imageUrl,
    level: song.level,
    search: song.artist.toLowerCase() + " " + song.title.toLowerCase(),
  };
}

export const deleteFavorite = createAsyncThunk(
  "songs/deleteFavorite",
  async (id) => {
    await removeFromFavorites(id);
    return id;
  }
);

export const postFavorite = createAsyncThunk(
  "songs/postFavorite",
  async (id) => {
    await addToFavorites(id);
    return id;
  }
);

export const fetchFavorites = createAsyncThunk(
  "songs/fetchFavorites",
  async () => {
    const response = await getFavorites();
    return response.data;
  }
);

export const postSong = createAsyncThunk("songs/postSong", async (song) => {
  const transformed = transformToServerStructure(song);
  await addSong(transformed);
});

export const fetchSongs = createAsyncThunk(
  "songs/fetchSongs",
  async (queryData, thunkApi) => {
    const response = await getSongs(queryData);
    const count = response.headers["x-total-count"];
    const favorites = thunkApi.getState().songs.favorites;
    return {
      data: transformToAppStructure(response.data, favorites),
      total: count,
    };
  }
);

export const searchSongs = createAsyncThunk(
  "songs/searchSongs",
  async (queryData, thunkApi) => {
    const response = await getSongs(queryData);
    const count = response.headers["x-total-count"];
    const favorites = thunkApi.getState().songs.favorites;
    return {
      data: transformToAppStructure(response.data, favorites),
      total: count,
    };
  }
);

export const filterSongs = createAsyncThunk(
  "songs/filterSongs",
  async (queryData, thunkApi) => {
    const response = await getSongs(queryData);
    const count = response.headers["x-total-count"];
    const favorites = thunkApi.getState().songs.favorites;
    return {
      data: transformToAppStructure(response.data, favorites),
      total: count,
    };
  }
);

export const songsSlice = createSlice({
  name: "songs",
  initialState: {
    data: [],
    loading: true,
    perPage: 5,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      if (!action.payload) state.search = null;
      state.search = { search: action.payload };
    },
    setRatingQuery: (state, action) => {
      if (!action.payload) state.rating = null;
      state.rating = action.payload;
    },
    resetReloadStatus: (state) => {
      state.shouldReload = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSongs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.concat(action.payload.data);
      state.total = action.payload.total;
    });
    builder.addCase(fetchSongs.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(searchSongs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchSongs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(searchSongs.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(filterSongs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterSongs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(filterSongs.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload.map((favorite) => favorite.id);
    });
    builder.addCase(postFavorite.fulfilled, (state, action) => {
      const songToModify = state.data.find(
        (song) => song.id === action.payload
      );
      songToModify.liked = true;
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      const songToModify = state.data.find(
        (song) => song.id === action.payload
      );
      songToModify.liked = false;
    });
    builder.addCase(postSong.fulfilled, (state, action) => {
      state.shouldReload = true;
    });
  },
});

export const currentSongs = (state) => state.data;

export const {
  setSearchQuery,
  setRatingQuery,
  resetReloadStatus,
} = songsSlice.actions;

export default songsSlice.reducer;
