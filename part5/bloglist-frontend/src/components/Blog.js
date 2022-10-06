import { useState } from "react";

const Blog = ({ blog, likeBlog, removeBlog, isOwner }) => {
  const [open, setOpen] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <section style={blogStyle} aria-label={"Blog"}>
      <header>
        <h3>
          <span aria-label={"Title"}>{blog.title}</span>{" "}
          <span aria-label={"Author"}>{blog.author}</span>
          <button
            aria-label={"View button"}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            {open ? "Hide" : "View"}
          </button>
        </h3>
      </header>
      {open && (
        <div>
          <p>
            <span aria-label={"Url"}>{blog.url}</span>
          </p>
          <p>
            Likes <span aria-label={"Likes"}>{blog.likes}</span>
            <button
              aria-label={"Like button"}
              onClick={() => {
                likeBlog(blog);
              }}
            >
              Like
            </button>
          </p>
          <p>
            <span aria-label={"User name"}>{blog.user.name}</span>
          </p>
          {isOwner && (
            <button
              aria-label={"Remove button"}
              onClick={() => {
                removeBlog(blog);
              }}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default Blog;
