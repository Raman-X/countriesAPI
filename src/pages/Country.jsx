import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContextData } from "../App.jsx";
import LoadingComponents from "../components/LoadingComponents.jsx";
import BackArrow from "../components/BackArrow.jsx";

const Country = () => {
  const { countryName } = useParams();
  const countriesData = useContext(ContextData);
  const navigate = useNavigate();

  if (!countriesData || countriesData.length === 0) {
    return <LoadingComponents styles="pl-10 sm:pl-20" />;
  }

  const countryInfo = countriesData.find(
    (country) => country.name.common === countryName,
  );

  if (!countryInfo) {
    return (
      <div className="text-center text-xl text-red-500 mt-10">
        Country not found
      </div>
    );
  }

  const currencyName =
    Object.values(countryInfo.currencies || {})[0]?.name || "N/A";
  const languages = Object.values(countryInfo.languages || {}).join(", ");

  // Find border country names
  const borderCountries = countryInfo.borders
    ? countryInfo.borders.map((borderCode) => {
        const borderCountry = countriesData.find((c) => c.cca3 === borderCode);
        return borderCountry ? borderCountry.name.common : borderCode;
      })
    : [];

  return (
    <div className="w-[1100px] max-w-[90%] mx-auto sm:p-8">
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 shadow rounded-lg mb-8 hover:shadow-md transition-all"
      >
        <BackArrow className="mr-2" /> Back
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        {/* Flag section */}
        <div className="lg:w-1/2">
          {/* Thumbnail flag (clickable) */}
          <img
            src={countryInfo.flags.svg}
            alt={`Flag of ${countryInfo.name.common}`}
            className="w-full max-w-lg rounded-lg shadow-md cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => document.getElementById("flag_modal").showModal()}
          />

          {/* Modal for enlarged flag */}
          <dialog id="flag_modal" className="modal">
            <div className="modal-box p-0 shadow-none max-w-3xl w-full">
              <div className="flex items-center justify-center max-h-[90vh] overflow-hidden">
                <img
                  src={countryInfo.flags.svg}
                  alt={`Flag of ${countryInfo.name.common}`}
                  className="object-contain max-h-[90vh] w-full"
                />
              </div>
            </div>

            {/* Click outside to close */}
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>

        {/* Info section */}
        <div className="lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 ">
            {countryInfo.name.common}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <p className="text-sm sm:text-base">
                <strong>Official Name:</strong> {countryInfo.name.official}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Population:</strong>{" "}
                {countryInfo.population.toLocaleString()}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Region:</strong> {countryInfo.region}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Sub Region:</strong> {countryInfo.subregion}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Capital:</strong>{" "}
                {countryInfo.capital?.join(", ") || "N/A"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm sm:text-base">
                <strong>Top Level Domain:</strong>{" "}
                {countryInfo.tld?.join(", ") || "N/A"}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Currencies:</strong> {currencyName}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Languages:</strong> {languages}
              </p>
            </div>
          </div>

          {/* Border countries */}
          {borderCountries.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 sm:mb-0">
              <strong className="whitespace-nowrap text-sm sm:text-base">
                Border Countries:
              </strong>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((borderName, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(`/countries/${borderName}`)}
                    className="px-3 py-1 cursor-pointer shadow rounded text-sm hover:shadow-md transition-all"
                  >
                    {borderName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Country;
