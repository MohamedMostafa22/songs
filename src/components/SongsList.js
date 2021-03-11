import { Box, CircularProgress, useTheme } from "@material-ui/core";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import { fetchSongs } from "../redux/songsSlice";
import { convertRatingToLevelRange } from "../utils";

import SongCard from "./SongCard";

export default function SongsList() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.songs.search);
  const filters = useSelector((state) => state.songs.filters);
  const perPage = useSelector((state) => state.songs.perPage);
  const total = useSelector((state) => state.songs.total);
  const rating = useSelector((state) => state.songs.rating);
  const theme = useTheme();

  useEffect(() => {
    dispatch(
      fetchSongs({
        start: 0,
        limit: perPage,
      })
    );
  }, []);

  const songs = useSelector((state) => state.songs.data);
  return (
    <Box>
      <InfiniteScroll
        dataLength={songs.length} //This is important field to render the next data
        next={() => {
          dispatch(
            fetchSongs({
              start: songs.length,
              limit: perPage,
              range: rating && {
                level: { ...convertRatingToLevelRange(rating) },
              },
              search,
              filters,
            })
          );
        }}
        hasMore={songs.length !== Number(total)}
        loader={
          <Box
            display="flex"
            justifyContent="center"
            color={theme.palette.common.white}
          >
            <CircularProgress color="inherit" />
          </Box>
        }
        height={700}
      >
        <Box>
          {songs.map((song) => (
            <Box key={song.id} mt={2} mb={2}>
              <SongCard
                id={song.id}
                title={song.title}
                artist={song.artist}
                image={song.images}
                rating={song.rating}
                liked={song.liked}
              />
            </Box>
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
}
