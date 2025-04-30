import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CountryCard from "./components/CountryCard.jsx";
import LoadingComponents from "./components/LoadingComponents.jsx";
import Navbar from "./components/Navbar.jsx";
import Search from "./components/Search.jsx";
import Dropdown from "./components/Dropdown.jsx";
import Country from "./pages/Country.jsx";

export const ContextData = createContext();

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountriesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const filteredCountries =
    selectedRegion === "" || selectedRegion === "All"
      ? countriesData
      : countriesData.filter((country) => country.region === selectedRegion);

  const searchedCountries = filteredCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (error) {
    return <p className={"text-red-500 text-center"}>{error}</p>;
  }

  return (
    <ContextData.Provider value={countriesData}>
      <Navbar />
      <Routes>
        <Route
          index
          element={
            <div className="max-w-[1100px] w-90% mx-auto px-4">
              <div className="flex justify-between flex-wrap gap-5 mb-2">
                <Search
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <Dropdown
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                />
              </div>
              {isLoading ? (
                <LoadingComponents />
              ) : (
                <div className="px-4 py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-24 justify-items-stretch max-sm:justify-items-start">
                  {searchedCountries.map((countryData, index) => (
                    <CountryCard key={index} countryData={countryData} />
                  ))}
                </div>
              )}
            </div>
          }
        />
        <Route path="/countries/:countryName" element={<Country />} />
      </Routes>
    </ContextData.Provider>
  );
};

export default App;
