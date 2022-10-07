import { connect } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdotesReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = [...props.anecdotes];
  const filter = props.filter;

  const upvote = async (anecdoteObject) => {
    const { content } = anecdoteObject;

    props.upvoteAnecdote(anecdoteObject);
    props.setNotification(`Upvoted ${content}`, 5);
  };

  const matchingAnecdotes = filter.length
    ? anecdotes.filter((anecdote) => {
        const content = anecdote.content.toLowerCase();
        return content.includes(filter.toLowerCase());
      })
    : anecdotes;

  return matchingAnecdotes.length ? (
    matchingAnecdotes
      .sort((a, b) => b.votes - a.votes)
      .map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            Has {anecdote.votes}{" "}
            <button
              onClick={() => {
                upvote(anecdote);
              }}
            >
              Vote
            </button>
          </div>
        </div>
      ))
  ) : (
    <p>No anecdotes</p>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  upvoteAnecdote,
  setNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
