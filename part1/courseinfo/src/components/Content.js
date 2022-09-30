const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({ name, exercises }) => {
        const part = `${name} ${exercises}`;
        return <p key={part}>{part}</p>;
      })}
    </div>
  );
};

export default Content;
