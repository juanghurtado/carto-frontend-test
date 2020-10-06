import { debounce } from "lodash";
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
  const [infoWidgetSelection, setInfoWidgetSelection] = useState([]);

  const [mapConfig, setMapConfig] = useState({
    lineWidth: 1,
    lineColor: COLORS.black,
    fillColor: COLORS.red,
  });

  const handleStylesWidgetChange = (newMapConfig) => {
    setMapConfig(newMapConfig);
  };

  const [boundsChanged, setBoundsChanged] = useState(false);

  const handleOnBoundsChange = debounce((bounds) => {
    setBoundsChanged(true);

    CartoService.getNumberOfCountriesGroupdByContinent(bounds).then((resp) => {
      setNumberOfCountries(resp.data.rows);
    });

    CartoService.getPopulationPerContinent(bounds).then((resp) => {
      setPopulationPerContinent(resp.data.rows);
    });
  }, 200);

  const handleInfoWidgetSelectionChange = (selection) => {
    setInfoWidgetSelection(selection);
    console.log(selection);
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
          onBoundsChange={handleOnBoundsChange}
          filterByContinent={infoWidgetSelection}
        />
      </div>

      <div className="App__widgets">
        <StylesWidget onChange={handleStylesWidgetChange} config={mapConfig} />

        <InfoWidget
          title={`Number of countries by continent ${
            boundsChanged ? "(on viewport)" : "(total)"
          }`}
          data={numberOfCountries}
          titleAttr="continent"
          valueAttr="num_countries"
          barColor={mapConfig.fillColor}
          onSelectedInfoChange={handleInfoWidgetSelectionChange}
        />

        <InfoWidget
          title={`Population by continent ${
            boundsChanged ? "(on viewport)" : "(total)"
          }`}
          data={populationPerContinent}
          titleAttr="continent"
          valueAttr="population"
          barColor={mapConfig.fillColor}
          onSelectedInfoChange={handleInfoWidgetSelectionChange}
        />
      </div>
    </div>
  );
}

export default App;
