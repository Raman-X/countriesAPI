import React from "react";

const Country = ({ countryData }) => {
  const imageSrc = countryData.flags.png;
  const alt = countryData.flags.alt;
  return (
    <div className="card bg-base-100 w-66 shadow-lg overflow-hidden">
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

export default Country;
