import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../app/services/login";
import { setNotification } from "../features/notification/notificationSlice";

const LoginForm = () => {
  const [login] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await login({ username, password }).unwrap();
      dispatch(setNotification({ message: `User ${user.name} logged-in` }));
    } catch (err) {
      dispatch(setNotification({ type: "error", message: err.data.error }));
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              name={"username"}
              value={username}
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name={"password"}
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginForm.displayName = "Login form";

export default LoginForm;
