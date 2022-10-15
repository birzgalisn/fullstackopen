import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { ALL_BOOKS, ME } from "../queries";
import BooksTable from "./BooksTable";

const Recommend = () => {
  const { data, loading } = useQuery(ME);
  const [getAllBooks, { data: allBooksData, loading: allBooksLoading }] =
    useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (data?.me) {
      getAllBooks({
        variables: {
          genre: data.me.favouriteGenre,
        },
      });
    }
  }, [data, getAllBooks]);

  return (
    <div>
      <h2>Recommendations</h2>

      {!loading && (
        <p>
          Books in your favorite genre{" "}
          <strong>{data?.me?.favouriteGenre}</strong>
        </p>
      )}

      <BooksTable loading={allBooksLoading} books={allBooksData?.allBooks} />
    </div>
  );
};

export default Recommend;
