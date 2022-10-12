import { useParams } from "react-router-dom";

const Anecdote = ({ anecdoteById, vote }) => {
  const { anecdoteId } = useParams();
  const anecdote = anecdoteById(Number(anecdoteId));

  if (!anecdote) {
    return <p>Anecdote was not found</p>;
  }

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>
        Has {anecdote.votes} votes{" "}
        <button onClick={() => vote(anecdote.id)}>Vote</button>
      </p>
      <p>
        For more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
