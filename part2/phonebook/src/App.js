import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch(() => {
        setNotification({
          type: "error",
          message: `Failed to get persons information`,
        });
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification({ type: null, message: null });
    }, 5000);
    return () => clearTimeout(timeout);
  }, [notification]);

  const onFilterChange = (event) => {
    const { value } = event.target;
    return setFilter(value);
  };

  const onNewPersonChange = (event) => {
    const { value, name } = event.target;
    setNewPerson((prev) => ({ ...prev, [name]: value }));
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(({ name }) => {
      const { name: newName } = newPerson;
      return name.toLowerCase() === newName.toLowerCase();
    });
    if (existingPerson) {
      const confirm = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const { id } = existingPerson;
        const { number } = newPerson;
        personService
          .update(id, { ...existingPerson, number })
          .then((updatedPerson) => {
            setPersons((prev) =>
              prev.map((person) => {
                const { id: prevId } = person;
                return prevId !== id ? person : updatedPerson;
              })
            );
            setNotification({
              type: "success",
              message: `Updated ${updatedPerson.name}`,
            });
            setNewPerson({ name: "", number: "" });
          })
          .catch((err) => {
            setNotification({
              type: "error",
              message: err.response.data.error,
            });
          });
      }
      return;
    }
    personService
      .create(newPerson)
      .then((person) => {
        setPersons((prev) => [...prev, person]);
        setNotification({ type: "success", message: `Added ${person.name}` });
        setNewPerson({ name: "", number: "" });
      })
      .catch((err) => {
        setNotification({
          type: "error",
          message: err.response.data.error,
        });
      });
  };

  const onPersonDelete = (person) => {
    const { id, name } = person;
    const confirm = window.confirm(`Delete ${name}?`);
    if (confirm) {
      personService
        .remove(id)
        .then(() => {
          setPersons((prev) =>
            prev.filter((person) => {
              const { id: prevId } = person;
              return prevId !== id;
            })
          );
          setNotification({
            type: "error",
            message: `Information of ${person.name} has been removed from server`,
          });
        })
        .catch((err) => {
          setNotification({
            type: "error",
            message: err.response.data.error,
          });
        });
    }
  };

  const personsToShow = filter.length
    ? persons.filter((person) =>
        `${person.name} ${person.number}`
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      )
    : persons;

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Filter onChange={onFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        onChange={onNewPersonChange}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onPersonDelete={onPersonDelete} />
    </div>
  );
};

export default App;
