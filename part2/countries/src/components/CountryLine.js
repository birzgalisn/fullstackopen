import { useState } from "react";
import Country from "./Country";

const CountryLine = ({ country }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <div>
      <p>
        {country.name.official}{" "}
        <button onClick={toggle}>{open ? "Hide" : "Show"}</button>
      </p>
      {open && <Country country={country} />}
    </div>
  );
};

export default CountryLine;
