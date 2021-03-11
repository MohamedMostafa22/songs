import { default as MuiRating } from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

export default function Rating({ value, onChange, ...rest }) {
  return (
    <MuiRating
      {...rest}
      name="simple-controlled"
      value={value}
      onChange={onChange}
      emptyIcon={<StarBorderIcon fontSize="inherit" color="secondary" />}
      icon={<StarIcon fontSize="inherit" color="secondary" />}
      precision={0.5}
    />
  );
}
