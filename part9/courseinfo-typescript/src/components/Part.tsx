import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.part.type) {
    case "normal":
      return (
        <>
          <p>
            <i>{props.part.description}</i>
          </p>
        </>
      );
    case "groupProject":
      return (
        <>
          <p>Group project exercises {props.part.groupProjectCount}</p>
        </>
      );
    case "submission":
      return (
        <>
          <p>
            <i>{props.part.description}</i>
          </p>
          <p>Submit to {props.part.exerciseSubmissionLink}</p>
        </>
      );
    case "special":
      return (
        <>
          <p>
            <i>{props.part.description}</i>
          </p>
          <p>Required skills: {props.part.requirements.join(", ")}</p>
        </>
      );
    default:
      return assertNever(props.part);
  }
};

export default Part;
