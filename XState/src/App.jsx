import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [seletedState, setSeletedState] = useState("");
  const [selectedCity, setSeletedCity] = useState("");
  const [statement, setStatement] = useState(null);

  const getCountries = async () => {
    try {
      const res = await axios.get(
        `https://crio-location-selector.onrender.com/countries`
      );
      setCountries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStates = async (country) => {
    try {
      if (country) {
        const response = await axios.get(
          `https://crio-location-selector.onrender.com/country=${country}/states`
        );
        setStates(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async (countrys, stateName) => {
    try {
      const result = await axios.get(
        ` https://crio-location-selector.onrender.com/country=${countrys}/state=${stateName}/cities`
      );
      setCity(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //country
  useEffect(() => {
    getCountries();
  }, [selectedCountry]);

  //state
  useEffect(() => {
    if (selectedCountry) {
      getStates(selectedCountry);
    }
  }, [selectedCountry]);
  //city
  useEffect(() => {
    if (seletedState && selectedCountry) {
      getCity(selectedCountry, seletedState);
    }
    if (selectedCity && selectedCountry && seletedState) {
      setStatement(true);
    }
  }, [selectedCity, selectedCountry, seletedState]);

  return (
    <>
      <h1>Select Location</h1>
      {/* <div> */}
      <div
        style={{
          display: "flex",
          padding: "15px",
          gap: 20,
          justifyContent: "center",
        }}
      >
        <select
          name="countries"
          id="countries"
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <div>
          <select
            style={{ padding: "10px" }}
            disabled={!selectedCountry}
            name="states"
            id="states"
            onChange={(e) => setSeletedState(e.target.value)}
          >
            <option value="">Select State</option>

            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <select
          style={{ padding: "10px" }}
          name="city"
          id="city"
          disabled={!seletedState}
          onChange={(e) => setSeletedCity(e.target.value)}
        >
          <option value="city">Select City</option>

          {city.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      {statement === true ? (
        <div
          style={{
            fontWeight: 700,
            fontSize: "20px",
          }}
        >
          You selected <span style={{ fontSize: "30px" }}> {selectedCity}</span>
          ,
          <span fontSize={"25px"} style={{ color: "gray" }}>
            {seletedState},{selectedCountry}
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
