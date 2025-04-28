import React from "react";
import Country from "./components/Country.jsx";

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

  if (isLoading) {
    return <LoadingComponents />;
  }
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  if (countriesData.length === 0) {
    return <p>No countries found</p>;
  }
  return (
    <div className="px-4 py-8">
      <div
        className={
          "grid sm:grid-cols-2 [@media(min-width:860px)]:grid-cols-3 gap-10 justify-items-center"
        }
      >
        {countriesData.map((countryData, index) => (
          <Country key={index} countryData={countryData} />
        ))}
      </div>
    </div>
  );
};

export default App;
