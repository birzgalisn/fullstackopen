import { Box, withStyles } from "@material-ui/core";

const HStack = withStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.5rem",
  },
})(Box);

export default HStack;
