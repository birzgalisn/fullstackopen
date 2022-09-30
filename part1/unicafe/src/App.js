import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";
import Title from "./components/Title";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title>Give feedback</Title>
      <Button onClick={() => setGood((prev) => prev + 1)}>Good</Button>
      <Button onClick={() => setNeutral((prev) => prev + 1)}>Neutral</Button>
      <Button onClick={() => setBad((prev) => prev + 1)}>Bad</Button>
      <Statistics {...{ good, neutral, bad }} />
    </div>
  );
};

export default App;
