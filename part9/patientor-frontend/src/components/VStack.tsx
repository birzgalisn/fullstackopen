import { Box, withStyles } from "@material-ui/core";

const VStack = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
})(Box);

export default VStack;
