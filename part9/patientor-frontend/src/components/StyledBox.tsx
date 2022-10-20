import { Box, withStyles } from "@material-ui/core";

const StyledBox = withStyles({
  root: {
    border: "1px solid black",
    borderRadius: "5px",
    marginBottom: "1rem",
    padding: "0.5rem",
  },
})(Box);

export default StyledBox;
