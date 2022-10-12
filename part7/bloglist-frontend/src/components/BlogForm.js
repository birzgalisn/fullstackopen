import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAddBlogMutation } from "../app/services/blogs";
import { setNotification } from "../features/notification/notificationSlice";

const BlogForm = forwardRef((props, ref) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [addBlog] = useAddBlogMutation();
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const blog = await addBlog(newBlog).unwrap();
      dispatch(
        setNotification({
          message: `A new blog ${blog.title} by ${blog.author} added`,
        })
      );
      ref.current.toggleVisibility();
    } catch (err) {
      dispatch(setNotification({ type: "error", message: err.data.error }));
    }

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
});

BlogForm.displayName = "Blog form";

export default BlogForm;
