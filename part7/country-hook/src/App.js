import axios from "axios";
import { useEffect, useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then((res) => res.data)
        .then(([country]) => {
          setCountry(country);
        })
        .catch((err) => {
          setCountry(null);
        });
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return <div>Not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>Population: {country.population}</div>
      <div>Capital: {country.capital}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`Flag of ${country.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (event) => {
    event.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <label>
          <input {...nameInput} />
        </label>
        <button>Find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
