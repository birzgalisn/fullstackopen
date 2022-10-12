import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { logout, selectAuthenticated } from "./features/auth/authSlice";
import BlogsRoute from "./features/blogs";
import UsersRoute from "./features/users";

const App = () => {
  const { isAuthenticated, ...authUser } = useSelector(selectAuthenticated);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  return (
    <>
      <Notification />
      <div>
        <div>
          <h1>Blogs</h1>
          <Link to={"/blogs"}>Blogs</Link>
          {" | "}
          <Link to={"/users"}>Users</Link>
          {isAuthenticated ? (
            <div>
              <p>
                {authUser.name} logged-in{" "}
                <button
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Logout
                </button>
              </p>
              <Togglable buttonLabel={"Create blog"} ref={blogFormRef}>
                <BlogForm ref={blogFormRef} />
              </Togglable>
            </div>
          ) : (
            <Togglable buttonLabel={"Login"}>
              <LoginForm />
            </Togglable>
          )}
        </div>
        <div>
          <Routes path="/">
            <Route index element={<Navigate to={"blogs"} />} />
            <Route path="blogs/*" element={<BlogsRoute />} />
            <Route path="users/*" element={<UsersRoute />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
