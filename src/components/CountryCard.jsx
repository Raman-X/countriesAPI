import React from "react";
import { useNavigate } from "react-router-dom";

const CountryCard = ({ countryData }) => {
  const navigate = useNavigate();
  const imageSrc = countryData.flags.png;
  const alt = countryData.flags.alt;
  const handleClick = () => {
    navigate(`/countries/${countryData.name.common}`);
  };
  return (
    <div
      onClick={handleClick}
      className="card cursor-pointer bg-base-100 border border-base-200 box-border shadow-lg drop-shadow-2xl max-sm:max-w-66 overflow-hidden"
    >
      <figure className="h-48 w-full overflow-hidden">
        <img src={imageSrc} alt={alt} className="object-cover w-full h-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{countryData.name.common}</h2>
        <p>
          <strong>Population</strong>: {countryData.population}
        </p>
        <p>
          <strong>Region</strong>: {countryData.region}
        </p>
        <p>
          <strong>Capital</strong>:{" "}
          {countryData.capital ? countryData.capital : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
