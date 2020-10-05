import React, { useEffect, useState } from "react";
import { COLORS } from "../core/constants";
import CartoService from "../services/carto-sql-service";
import "./App.css";
import Map from "./map/Map";
import InfoWidget from "./widgets/InfoWidget";
import StylesWidget from "./widgets/StylesWidget";

function App() {
  const [numberOfCountries, setNumberOfCountries] = useState();
  const [populationPerContinent, setPopulationPerContinent] = useState();

  const [mapConfig, setMapConfig] = useState({
    lineWidth: 1,
    lineColor: COLORS.black,
    fillColor: COLORS.red,
  });

  const handleStylesWidgetChange = (newMapConfig) => {
    setMapConfig(newMapConfig);
  };

  useEffect(() => {
    CartoService.getNumberOfCountriesGroupdByContinent().then((resp) => {
      setNumberOfCountries(resp.data.rows);
    });

    CartoService.getPopulationPerContinent().then((resp) => {
      setPopulationPerContinent(resp.data.rows);
    });
  }, []);

  return (
    <div className="App">
      <div className="App__map">
        <Map
          lineWidth={mapConfig.lineWidth}
          lineColor={mapConfig.lineColor}
          fillColor={mapConfig.fillColor}
        />
      </div>

      <div className="App__widgets">
        <StylesWidget onChange={handleStylesWidgetChange} config={mapConfig} />

        <InfoWidget
          title="Number of countries by continent"
          data={numberOfCountries}
          titleAttr="continent"
          valueAttr="num_countries"
        />

        <InfoWidget
          title="Population by continent"
          data={populationPerContinent}
          titleAttr="continent"
          valueAttr="population"
        />
      </div>
    </div>
  );
}

export default App;
