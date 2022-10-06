import PropTypes from "prop-types";
import { useState } from "react";

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    loginUser({ username, password });
    setUsername("");
    setPassword("");
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

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default LoginForm;
