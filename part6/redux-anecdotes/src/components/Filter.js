import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    const { value: filter } = event.target;
    props.setFilter(filter);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <label>
        Filter:
        <input onChange={handleChange} />
      </label>
    </div>
  );
};

const mapDispatchToProps = {
  setFilter,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);

export default ConnectedFilter;
