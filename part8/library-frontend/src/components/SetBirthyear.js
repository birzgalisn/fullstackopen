import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const SetBirthyear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const { data, loading } = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach((err) => {
        console.log(err.message);
      });
    },
    update: (cache, res) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map((a) => {
            const { name, born } = res.data.editAuthor;
            return a.name === name ? { ...a, born } : a;
          }),
        };
      });
    },
  });

  useEffect(() => {
    if (data?.allAuthors) {
      const [author] = data.allAuthors;
      setName(author.name);
    }
  }, [data]);

  const submit = (event) => {
    event.preventDefault();

    editAuthor({
      variables: {
        name,
        setBornTo: Number(born),
      },
    });

    setBorn("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Set birthyear</h2>

        <div>
          <label>
            Name:
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {loading ? (
                <option disabled>Loading authors...</option>
              ) : (
                data.allAuthors.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>
        <div>
          <label>
            Born:
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </label>
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default SetBirthyear;
