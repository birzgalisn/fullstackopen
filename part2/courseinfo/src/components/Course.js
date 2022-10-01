import Content from "../components/Content";
import Header from "../components/Header";
import Total from "../components/Total";

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
