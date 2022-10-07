import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdotesReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (event) => {
    event.preventDefault();

    const { value: content } = event.target.content;
    event.target.content.value = "";

    dispatch(createAnecdote(content));
    dispatch(setNotification(`Added ${content}`, 5));
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={add}>
        <div>
          <label>
            Anecdote:
            <input name={"content"} required />
          </label>
        </div>
        <button type={"submit"}>Create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
