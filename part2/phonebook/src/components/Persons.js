import { memo } from "react";

const Persons = memo(({ persons, onPersonDelete }) => {
  if (!persons.length) {
    return <div>No numbers</div>;
  }

  return persons.map((person) => {
    const { id, name, number } = person;
    return (
      <div key={id}>
        {name} {number}{" "}
        <button onClick={() => onPersonDelete(person)}>Delete</button>
      </div>
    );
  });
});

export default Persons;
