import React from "react";
import CountryCard from "./components/CountryCard.jsx";
import LoadingComponents from "./components/LoadingComponents.jsx";
import Navbar from "./components/Navbar.jsx";
import Search from "./components/Search.jsx";
import Dropdown from "./components/Dropdown.jsx";

const App = () => {
  const [countriesData, setCountriesData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selectedRegion, setSelectedRegion] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
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

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const filteredCountries =
    selectedRegion === "" || selectedRegion === "All"
      ? countriesData
      : countriesData.filter((country) => country.region === selectedRegion);

  const searchedCountries = filteredCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <Navbar />

      <div className="max-w-[1100px] w-90% mx-auto px-4">
        <div className="flex justify-between flex-wrap gap-5 mb-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
    </div>
  );
};

export default App;
