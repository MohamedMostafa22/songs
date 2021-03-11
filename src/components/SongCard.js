import { Box, Grid, IconButton, Typography, useTheme } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useState } from "react";

import { useDispatch } from "react-redux";

import { postFavorite, deleteFavorite } from "../redux/songsSlice";

import Rating from "./Rating";
import PlaceholderImage from "./PlaceholderImage.jpg";

export default function SongCard({ id, title, artist, image, rating, liked }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [cantLoad, setCantLoad] = useState();

  return (
    <Box
      width="100%"
      display="flex"
      style={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box width="220px" height="140px" display="flex">
        <img
          src={cantLoad ? PlaceholderImage : image}
          alt={title}
          style={{ width: "100%", height: "100%" }}
          onErrorCapture={() => {
            setCantLoad(true);
          }}
        />
      </Box>
      <Grid container>
        <Grid item lg={4} xs={12}>
          <Box display="flex" flexDirection="column" pt={4} ml={4}>
            <Typography variant="h6" color="textPrimary">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary">
              {artist}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={5} xs={1}></Grid>
        <Grid
          item
          lg={2}
          alignItems="center"
          style={{
            display: "flex",
          }}
          xs={4}
        >
          <Box display="flex" alignItems="center">
            <Rating value={rating} readOnly />
          </Box>
        </Grid>
        <Grid
          item
          lg={1}
          xs={7}
          alignItems="center"
          justify="flex-end"
          style={{
            display: "flex",
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            {liked ? (
              <IconButton onClick={() => dispatch(deleteFavorite(id))}>
                <Box color={theme.palette.common.red}>
                  <FavoriteIcon fontSize="large" color="inherit" />
                </Box>
              </IconButton>
            ) : (
              <IconButton onClick={() => dispatch(postFavorite(id))}>
                <Box color={theme.palette.common.lighGrey}>
                  <FavoriteBorderIcon fontSize="large" color="inherit" />
                </Box>
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
