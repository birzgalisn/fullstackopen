import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import Find from "./components/Find";

function App() {
  const [countries, setCountries] = useState({ data: [], loading: true });
  const [find, setFind] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountries({ data, loading: false });
    })();
  }, []);

  const onFindChange = (event) => {
    const { value } = event.target;
    setFind(value);
  };

  return (
    <div>
      <Find onChange={onFindChange} />
      <Countries countries={countries} find={find} />
    </div>
  );
}

export default App;
