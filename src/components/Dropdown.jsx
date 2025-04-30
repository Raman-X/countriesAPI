import React from "react";

const Dropdown = ({ selectedRegion, setSelectedRegion }) => {
  const regions = [
    "All",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
    "Antarctic",
  ];
  return (
    <>
      <select
        className="select mx-4 max-w-50"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option disabled={true} value={""}>
          Filter by region
        </option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
