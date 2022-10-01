const Filter = ({ onChange }) => {
  return (
    <div>
      Filter shown with: <input name="filter" onChange={onChange} />
    </div>
  );
};

export default Filter;
