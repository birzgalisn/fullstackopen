const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({ id, name, exercises }) => {
        return (
          <p key={id}>
            {name} {exercises}
          </p>
        );
      })}
    </div>
  );
};

export default Content;
