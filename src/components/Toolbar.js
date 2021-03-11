import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import Rating from "./Rating";

export default function Toolbar({ onAddSongButtonClick, onStarsFilterChange }) {
  const rating = useSelector((state) => state.songs.rating);
  return (
    <Grid container>
      <Grid item xs={4} md={2}>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1" color="textPrimary">
            Filter by stars
          </Typography>
          <Rating value={rating || 0} onChange={onStarsFilterChange} />
        </Box>
      </Grid>
      <Grid item xs={2} md={8}></Grid>
      <Grid item xs={4} md={2}>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={onAddSongButtonClick}
          >
            Add a song
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
