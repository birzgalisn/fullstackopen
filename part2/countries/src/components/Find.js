const Find = ({ onChange, find }) => {
  return (
    <div>
      Find countries: <input name="find" onChange={onChange} value={find} />
    </div>
  );
};

export default Find;
