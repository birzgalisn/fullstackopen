import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";

const CreateNew = ({ addNew }) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const reset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Content
            <input {...content} />
          </label>
        </div>
        <div>
          <label>
            Author
            <input {...author} />
          </label>
        </div>
        <div>
          <label>
            Url for more info
            <input {...info} />
          </label>
        </div>
        <button type={"submit"}>Create</button>
        <button type={"button"} onClick={reset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
