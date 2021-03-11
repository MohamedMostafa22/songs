import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, Dialog, DialogTitle, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    textAlign: "center",
    color: theme.palette.secondary.main,
  },
}));

function isAddSongFormValid(title, artist, imageUrl, level) {
  return title && artist && imageUrl && level;
}

export default function AddSongDialog({ onClose, open, onSubmit }) {
  const classes = useStyles();
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [level, setLevel] = useState();

  return (
    <Dialog fullWidth maxWidth="xs" onClose={onClose} open={open}>
      <Box p={4} display="flex" flexDirection="column">
        <DialogTitle className={classes.dialogTitle}>Add song</DialogTitle>
        <Box mb={2}>
          <TextField
            label="Title"
            color="secondary"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Artist"
            color="secondary"
            fullWidth
            variant="outlined"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Image URL"
            color="secondary"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Level"
            type="number"
            color="secondary"
            fullWidth
            variant="outlined"
            value={level}
            onChange={(e) => {
              if (e.target.value < 1 || e.target.value > 15) return;
              setLevel(e.target.value);
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          disabled={!isAddSongFormValid(title, artist, imageUrl, level)}
          onClick={() => onSubmit({ title, artist, imageUrl, level })}
        >
          Add
        </Button>
      </Box>
    </Dialog>
  );
}
