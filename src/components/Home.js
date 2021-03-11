import { Box, Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

import {
  searchSongs,
  setSearchQuery,
  setRatingQuery,
  filterSongs,
  postSong,
  resetReloadStatus,
  fetchFavorites,
} from "../redux/songsSlice";

import _debounce from "lodash/debounce";

import AppBar from "./AppBar";
import SongsList from "./SongsList";
import Toolbar from "./Toolbar";
import AddSongDialog from "./AddSongDialog";
import { useDispatch, useSelector } from "react-redux";
import { convertRatingToLevelRange } from "../utils";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.common.darkGrey,
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const perPage = useSelector((state) => state.songs.perPage);
  const search = useSelector((state) => state.songs.search);
  const rating = useSelector((state) => state.songs.rating);
  const shouldReload = useSelector((state) => state.songs.shouldReload);
  const [isAddSongDialogOpen, setIsAddSongDialogOpen] = useState();
  const favorites = useSelector((state) => state.songs.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  useEffect(() => {
    if (shouldReload) {
      dispatch(
        searchSongs({
          start: 0,
          limit: perPage,
          search,
          range: rating && {
            level: { ...convertRatingToLevelRange(rating) },
          },
        })
      );
      dispatch(resetReloadStatus());
    }
  }, [shouldReload]);

  const onSearchInputChange = (search) => {
    dispatch(setSearchQuery(search));
    dispatch(
      searchSongs({
        search: {
          search,
        },
        range: rating && {
          level: { ...convertRatingToLevelRange(rating) },
        },
        start: 0,
        limit: perPage,
      })
    );
  };

  return (
    <>
      <Box width="100%" height="100vh" className={classes.container}>
        <AppBar onSearchChange={_debounce(onSearchInputChange, 500)} />
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={7}>
            <Box display="flex" flexDirection="column">
              <Box mt={4} mb={4}>
                <Toolbar
                  onStarsFilterChange={(e) => {
                    dispatch(setRatingQuery(Number(e.target.value)));
                    const { min, max } = convertRatingToLevelRange(
                      Number(e.target.value)
                    );
                    dispatch(
                      filterSongs({
                        search,
                        range: { level: { min, max } },
                        start: 0,
                        limit: perPage,
                      })
                    );
                  }}
                  onAddSongButtonClick={() => setIsAddSongDialogOpen(true)}
                />
              </Box>
              {Array.isArray(favorites) && <SongsList />}
            </Box>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </Box>
      {isAddSongDialogOpen && (
        <AddSongDialog
          open={isAddSongDialogOpen}
          onClose={() => setIsAddSongDialogOpen(false)}
          onSubmit={(song) => {
            dispatch(postSong(song));
            setIsAddSongDialogOpen(false);
          }}
        />
      )}
    </>
  );
}
