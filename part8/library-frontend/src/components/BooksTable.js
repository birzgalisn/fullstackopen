const BooksTable = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Author</th>
          <th>Published</th>
        </tr>
        {props.loading || !props.books ? (
          <tr>
            <td colSpan={3}>Loading books...</td>
          </tr>
        ) : (
          props.books &&
          props.books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default BooksTable;
