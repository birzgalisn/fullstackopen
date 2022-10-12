import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";

import About from "./components/About";
import Anecdote from "./components/Anecdote";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Notification from "./components/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const [notification, setNotification] = useState(null);
  const timeout = useRef(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setNotification(null);
    }, 5_000);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [notification]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10_000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(
      `A new anecdote ${anecdote.content} by ${anecdote.author} created!`
    );
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    setNotification(`Anecdote ${voted.content} now has ${voted.votes} votes!`);
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path={"/"}>
          <Route index element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path={"anecdotes"}>
            <Route
              path={":anecdoteId"}
              element={<Anecdote anecdoteById={anecdoteById} vote={vote} />}
            />
          </Route>
          <Route path={"create"} element={<CreateNew addNew={addNew} />} />
          <Route path={"about"} element={<About />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
