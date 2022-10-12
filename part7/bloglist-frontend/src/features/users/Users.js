import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../app/services/users";

const Users = () => {
  const { data: users, isLoading } = useGetUsersQuery();

  return (
    <div>
      <h2>Users</h2>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Blogs created</td>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
