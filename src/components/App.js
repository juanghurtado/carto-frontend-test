import React, { useState } from "react";
import "./App.css";
import { COLORS } from "./core/constants";
import Map from "./map/Map";
import StylesWidget from "./widgets/StylesWidget";

function App() {
  const [mapConfig, setMapConfig] = useState({
    lineWidth: 1,
    lineColor: COLORS.black,
    fillColor: COLORS.red,
  });

  const handleStylesWidgetChange = (newMapConfig) => {
    setMapConfig(newMapConfig);
  };

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
      </div>
    </div>
  );
}

export default App;
