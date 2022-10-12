import { Link, Navigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../app/services/users";

const User = () => {
  const { userId } = useParams();
  const { data: user, isLoading, isSuccess } = useGetUserQuery(userId);

  if (isLoading) {
    return <p>User loading...</p>;
  } else if (!isSuccess) {
    return <Navigate to={"/users"} />;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.length ? (
          user.blogs.map((b) => (
            <li key={b.id}>
              <Link to={`/blogs/${b.id}`}>{b.title}</Link>
            </li>
          ))
        ) : (
          <li>No blogs</li>
        )}
      </ul>
    </div>
  );
};

export default User;
