const initialState = {
  token: null,
  username: null,
  name: null,
  isAuthenticated: false,
};

const check = () => {
  const auth = window.localStorage.getItem("auth");
  if (auth) {
    return { ...JSON.parse(auth), isAuthenticated: true };
  }
  return initialState;
};

const set = (credentials) => {
  window.localStorage.setItem("auth", JSON.stringify(credentials));
  return { ...credentials, isAuthenticated: true };
};

const clear = () => {
  window.localStorage.clear();
  return initialState;
};

const storage = { check, set, clear };
export { storage };
