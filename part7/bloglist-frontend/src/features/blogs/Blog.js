import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "../../app/services/blogs";
import CommentForm from "../../components/CommentForm";
import { selectAuthenticated } from "../auth/authSlice";
import { setNotification } from "../notification/notificationSlice";

const Blog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: blog, isLoading, isSuccess } = useGetBlogQuery(blogId);
  const { isAuthenticated, ...authUser } = useSelector(selectAuthenticated);
  const [updateBlog] = useUpdateBlogMutation();
  const [removeBlog] = useDeleteBlogMutation();

  const upvote = async () => {
    try {
      const liked = await updateBlog({
        id: blogId,
        likes: blog.likes + 1,
      }).unwrap();
      dispatch(
        setNotification({
          message: `Blog ${liked.title} now has ${liked.likes} likes`,
        })
      );
    } catch (err) {
      dispatch(setNotification({ type: "error", message: err.data.error }));
    }
  };

  const remove = async () => {
    try {
      await removeBlog(blog.id);
      navigate("/blogs");
      dispatch(
        setNotification({
          message: `Removed blog ${blog.title} by ${blog.author}`,
        })
      );
    } catch (err) {
      dispatch(setNotification({ type: "error", message: err.data.error }));
    }
  };

  const isOwner = useMemo(() => {
    return isAuthenticated && blog?.user.username === authUser.username;
  }, [isAuthenticated, blog]);

  if (isLoading) {
    return <p>Blog loading...</p>;
  } else if (!isSuccess) {
    return <Navigate to={"/blogs"} />;
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        Likes: {blog.likes}{" "}
        {isAuthenticated && <button onClick={upvote}>Like</button>}
      </p>
      <p>
        Added by: <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </p>
      {isOwner && <button onClick={remove}>Remove</button>}
      <h3>Comments:</h3>
      {isAuthenticated && <CommentForm />}
      <ul>
        {blog.comments.length ? (
          blog.comments.map((c) => <li key={c.id}>{c.comment}</li>)
        ) : (
          <li>No comments</li>
        )}
      </ul>
    </div>
  );
};

export default Blog;
