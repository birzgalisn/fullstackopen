import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createBlog(newBlog);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <div>
        <label>
          Title
          <input
            name={"title"}
            value={newBlog.title}
            aria-label="Title field"
            onChange={onChange}
          />
        </label>
      </div>
      <div>
        <label>
          Author
          <input
            name={"author"}
            value={newBlog.author}
            aria-label="Author field"
            onChange={onChange}
          />
        </label>
      </div>
      <div>
        <label>
          Url
          <input
            name={"url"}
            value={newBlog.url}
            aria-label="Url field"
            onChange={onChange}
          />
        </label>
      </div>
      <button type={"submit"} aria-label="Save button">
        Save
      </button>
    </form>
  );
};

export default BlogForm;
