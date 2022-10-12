import axios from "axios";
import { useEffect, useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(baseUrl);
      setResources(data);
    })();
  }, [baseUrl]);

  const create = async (resource) => {
    const { data } = await axios.post(baseUrl, resource);
    setResources((prev) => [...prev, data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3001/notes");
  const [persons, personService] = useResource("http://localhost:3001/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <div>
          <label>
            <input {...content} />
          </label>
        </div>
        <button>Create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          <label>
            Name <input {...name} />
          </label>
        </div>
        <div>
          <label>
            Number <input {...number} />
          </label>
        </div>
        <button>Create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
