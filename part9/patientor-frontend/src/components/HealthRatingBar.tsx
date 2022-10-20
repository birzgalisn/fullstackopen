import { Typography, withStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Rating } from "@material-ui/lab";

type BarProps = {
  rating: number;
  showText: boolean;
};

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  return (
    <div className="health-bar">
      <StyledRating
        readOnly
        value={4 - rating}
        max={4}
        icon={<FavoriteIcon fontSize="inherit" />}
      />
      {showText ? <Typography>{HEALTHBAR_TEXTS[rating]}</Typography> : null}
    </div>
  );
};

export default HealthRatingBar;
