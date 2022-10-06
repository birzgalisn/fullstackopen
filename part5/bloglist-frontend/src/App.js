import { useEffect, useMemo, useRef, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { displayNotification } from "./lib/displayNotification";
import blogService from "./services/blog";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const blogFormRef = useRef(null);
  const loginFormRef = useRef(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (!loggedUserJSON) {
      return;
    }

    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    setUser(user);

    displayNotification(setNotification, async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    });
  }, []);

  const loginUser = (userObject) => {
    displayNotification(setNotification, async () => {
      const user = await loginService.login(userObject);
      loginFormRef.current.toggleVisibility();
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      return `Successfully logged-in as ${user.username}`;
    });
  };

  const handleLogout = () => {
    window.localStorage.clear();
    blogService.setToken(null);
    setUser(null);
  };

  const createBlog = (blogObject) => {
    displayNotification(setNotification, async () => {
      const blog = await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility();
      setBlogs((prev) => [...prev, blog]);
      return `A new blog ${blog.title} by ${blog.author} added`;
    });
  };

  const likeBlog = async (blogObject) => {
    const { id, title, likes } = blogObject;

    displayNotification(setNotification, async () => {
      const blog = await blogService.update(id, {
        likes: likes + 1,
      });
      setBlogs((prev) => prev.map((b) => (b.id !== id ? b : blog)));
      return `Blog ${title} now has ${blog.likes} likes`;
    });
  };

  const removeBlog = async (blogObject) => {
    const { id, title, author } = blogObject;

    const confirm = window.confirm(`Remove blog ${title} by ${author}?`);
    if (!confirm) {
      return;
    }

    displayNotification(setNotification, async () => {
      await blogService.remove(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      return `Removed blog ${title} by ${author}`;
    });
  };

  const sortedBlogs = useMemo(() => {
    return blogs.length > 1 ? blogs.sort((a, b) => b.likes - a.likes) : blogs;
  }, [blogs]);

  const visitorView = () => {
    return (
      <Togglable buttonLabel={"Login"} ref={loginFormRef}>
        <LoginForm loginUser={loginUser} />
      </Togglable>
    );
  };

  const userView = () => {
    return (
      <>
        <nav>
          <p aria-label={"Greeting"}>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel={"New blog"} ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </nav>
        <div>
          <h2>Blogs</h2>
          {sortedBlogs.length ? (
            sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={likeBlog}
                removeBlog={removeBlog}
                isOwner={blog.user?.username === user.username}
              />
            ))
          ) : (
            <p>No blogs</p>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Notification notification={notification} />
      <h1>Blogs</h1>
      {user ? userView() : visitorView()}
    </>
  );
};

export default App;
