import { useQuery } from "@apollo/client";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { ALL_BOOKS } from "../queries";
import BooksTable from "./BooksTable";

const Books = forwardRef((props, ref) => {
  const [genre, setGenre] = useState(ref.current);
  const { data, loading, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  useEffect(() => {
    if (ref.current !== genre) {
      refetch({ genre });
      ref.current = genre;
    }
  }, [ref, genre, refetch]);

  const genres = useMemo(() => {
    const allGenres = data?.allBooks.reduce((a, b) => a.concat(b.genres), []);
    return [...new Set(allGenres)];
  }, [data]);

  return (
    <div>
      <h2>Books</h2>

      {genre && (
        <p>
          In genre <strong>{genre}</strong>
        </p>
      )}

      <BooksTable loading={loading} books={data?.allBooks} />

      <div>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => {
              setGenre(g);
            }}
          >
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </button>
        ))}
        <button
          onClick={() => {
            setGenre(null);
          }}
        >
          All genres
        </button>
      </div>
    </div>
  );
});

export default Books;
