import React from "react";
import CountryCard from "./components/CountryCard.jsx";
import LoadingComponents from "./components/LoadingComponents.jsx";
import Navbar from "./components/Navbar.jsx";
import Search from "./components/Search.jsx";

const App = () => {
  const [countriesData, setCountriesData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountriesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className={"max-w-[1100px] w-90% mx-auto px-4"}>
        <Search />
        {isLoading ? (
          <LoadingComponents />
        ) : (
          <div
            className={
              "px-4 py-8 grid sm:grid-cols-2 [@media(min-width:860px)]:grid-cols-3 gap-8 justify-between"
            }
          >
            {countriesData.map((countryData, index) => (
              <CountryCard key={index} countryData={countryData} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
