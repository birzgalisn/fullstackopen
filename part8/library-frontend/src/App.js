import { useApolloClient, useSubscription } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import SetBirthyear from "./components/SetBirthyear";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const genreRef = useRef();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    setPage("authors");
  }, [token]);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });

      window.alert(
        `Book ${addedBook.title} by ${addedBook.author.name} has been added`
      );
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>Add book</button>
            <button onClick={() => setPage("recommend")}>Recommend</button>
            <button onClick={() => logout()}>Logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>Login</button>
        )}
      </div>

      {page === "authors" && <Authors>{token && <SetBirthyear />}</Authors>}
      {page === "books" && <Books ref={genreRef} />}
      {page === "add" && token && <NewBook />}
      {page === "recommend" && token && <Recommend />}
      {page === "login" && <Login setToken={setToken} />}
    </div>
  );
};

export default App;
