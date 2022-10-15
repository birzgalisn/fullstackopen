import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data }] = useMutation(LOGIN, {
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach((err) => {
        console.log(err.message);
      });
    },
  });

  useEffect(() => {
    if (data?.login) {
      const token = data.login.value;
      window.localStorage.setItem("token", token);
      props.setToken(token);
    }
  }, [data, props]);

  const submit = async (event) => {
    event.preventDefault();

    login({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Login</h2>

        <div>
          <label>
            Username:
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
