import { CoursePart } from "../types";

interface TotalProps {
  parts: CoursePart[];
}

const Total = (props: TotalProps): JSX.Element => {
  return (
    <p>
      Number of exercises {props.parts.reduce((a, b) => a + b.exerciseCount, 0)}
    </p>
  );
};

export default Total;
