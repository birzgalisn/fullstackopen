const PersonForm = ({ onSubmit, onChange, newPerson }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input name={"name"} onChange={onChange} value={newPerson.name} />
      </div>
      <div>
        Number:{" "}
        <input name={"number"} onChange={onChange} value={newPerson.number} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
