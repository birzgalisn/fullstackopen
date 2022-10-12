import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAddCommentMutation } from "../app/services/blogs";
import { setNotification } from "../features/notification/notificationSlice";

const CommentForm = () => {
  const { blogId: blog } = useParams();
  const [comment, setComment] = useState("");
  const [addComment] = useAddCommentMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newComment = await addComment({ blog, comment }).unwrap();
      dispatch(
        setNotification({
          message: `A new comment ${newComment.comment} by ${newComment.user.name} added`,
        })
      );
    } catch (err) {
      dispatch(setNotification({ type: "error", message: err.data.error }));
    }

    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          value={comment}
          onChange={({ target }) => {
            setComment(target.value);
          }}
        />
      </label>
      <button type={"submit"}>Add comment</button>
    </form>
  );
};

export default CommentForm;
