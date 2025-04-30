import React from "react";

const Dropdown = () => {
  return (
    <>
      <select defaultValue="Filter by region" className="select mx-4 max-w-50">
        <option disabled={true}>Filter by region</option>
        <option>All</option>
        <option>Africa</option>
        <option>Asia</option>
        <option>America</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
    </>
  );
};

export default Dropdown;
