import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const { data, loading } = useQuery(ALL_AUTHORS);

  return (
    <div>
      <h2>Authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {loading ? (
            <tr>
              <td colSpan={3}>Loading authors...</td>
            </tr>
          ) : (
            data.allAuthors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {props.children}
    </div>
  );
};

export default Authors;
