import { useMemo, useState } from "react";
import Button from "./components/Button";
import Text from "./components/Text";
import Title from "./components/Title";

const App = () => {
  const data = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(
    data.map((anecdote) => ({ anecdote, votes: 0 }))
  );
  const topAnecdote = useMemo(
    () => anecdotes.reduce((a, b) => (a.votes > b.votes ? a : b)),
    [anecdotes]
  );

  const nextAnecdote = () => {
    const nextAnecdoteIdx = Math.floor(Math.random() * anecdotes.length);
    setSelected(nextAnecdoteIdx);
  };

  const vote = () => {
    setAnecdotes((prev) =>
      prev.map((anecdote, idx) => {
        const { votes, ...rest } = anecdote;
        return idx !== selected ? anecdote : { ...rest, votes: votes + 1 };
      })
    );
  };

  return (
    <div>
      <Title>Anecdote of the day</Title>
      <Text>{anecdotes[selected].anecdote}</Text>
      <Text>Has {anecdotes[selected].votes} votes</Text>
      <Button onClick={vote}>Vote</Button>
      <Button onClick={nextAnecdote}>Next anecdote</Button>
      <Title>Anecdote with most votes</Title>
      <Text>{topAnecdote.anecdote}</Text>
      <Text>Has {topAnecdote.votes} votes</Text>
    </div>
  );
};

export default App;
