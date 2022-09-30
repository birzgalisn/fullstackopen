import StatisticLine from "../components/StatisticLine";
import Text from "./Text";
import Title from "./Title";

const Statistics = ({ good, neutral, bad }) => {
  const votes = good + neutral + bad;
  const average = ((good - bad) / votes).toFixed(2);
  const positive = ((good / votes) * 100).toFixed(2) + "%";

  return (
    <div>
      <Title>Statistics</Title>
      {!votes ? (
        <Text>No feedback given</Text>
      ) : (
        <table>
          <tbody>
            <StatisticLine text={"Good"} value={good} />
            <StatisticLine text={"Neutral"} value={neutral} />
            <StatisticLine text={"Bad"} value={bad} />
            <StatisticLine text={"All"} value={votes} />
            <StatisticLine text={"Average"} value={average} />
            <StatisticLine text={"Positive"} value={positive} />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
