import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../app/services/blogs";

const Blogs = () => {
  const { data: blogs, isLoading } = useGetBlogsQuery();

  return (
    <div>
      <h2>Blogs</h2>
      {isLoading ? (
        <p>Loading blogs...</p>
      ) : (
        blogs.map((b) => (
          <div key={b.id}>
            <Link to={`/blogs/${b.id}`}>
              {b.title} by {b.author}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Blogs;
