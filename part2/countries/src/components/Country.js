import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.official}</h2>
      <p>Capital: {Object.values(country.capital).join(", ")}</p>
      <p>Area: {country.area}</p>
      <p>Languages:</p>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`${country.name.official} flag`}
        width={"100px"}
      />
      <h2>Weather in {country.name.official}</h2>
      <Weather latlng={country.latlng} />
    </div>
  );
};

export default Country;
