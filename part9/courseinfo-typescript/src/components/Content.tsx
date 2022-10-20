import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.parts.map((part) => (
        <div key={part.name}>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;
