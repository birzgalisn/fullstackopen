import Country from "./Country";
import CountryLine from "./CountryLine";

const Countries = ({ countries, find }) => {
  if (countries.loading && !countries.data.length) {
    return <p>Loading countries...</p>;
  } else if (!find.length) {
    return <p>Type in filter to search for a country</p>;
  }

  const countriesToShow = find.length
    ? countries.data.filter((country) => {
        const name = country.name.official;
        return name.toLowerCase().includes(find.toLowerCase());
      })
    : countries.data;

  if (!countriesToShow.length) {
    return <p>No mathcing country, specify another filter</p>;
  } else if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />;
  } else if (countriesToShow.length < 10) {
    return countriesToShow.map((country) => (
      <CountryLine key={country.name.official} country={country} />
    ));
  }

  return <p>Too many matches, specify another filter</p>;
};

export default Countries;
