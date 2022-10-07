import React from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const { good, ok, bad } = store.getState();

  return (
    <div>
      <button
        onClick={() => {
          store.dispatch({ type: "GOOD" });
        }}
      >
        Good
      </button>
      <button
        onClick={() => {
          store.dispatch({ type: "OK" });
        }}
      >
        Ok
      </button>
      <button
        onClick={() => {
          store.dispatch({ type: "BAD" });
        }}
      >
        Bad
      </button>
      <button
        onClick={() => {
          store.dispatch({ type: "ZERO" });
        }}
      >
        Reset stats
      </button>
      <div>Good: {good}</div>
      <div>Ok: {ok}</div>
      <div>Bad: {bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
