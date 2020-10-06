import { CartoSQLLayer } from "@deck.gl/carto";
import { WebMercatorViewport } from "@deck.gl/core";
import { DataFilterExtension } from "@deck.gl/extensions";
import DeckGL from "@deck.gl/react";
import React, { useEffect, useRef } from "react";

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 3,
  bearing: 0,
  pitch: 0,
};

function Map(props) {
  const mapRef = useRef(null);

  const layers = [
    new CartoSQLLayer({
      data: "select * from public.ne_50m_admin_0_countries",
      getLineColor: props.lineColor,
      getFillColor: props.fillColor,
      lineWidthMinPixels: props.lineWidth,
      updateTriggers: {
        getFilterValue: props.filterByContinent,
      },
      getFilterValue: (f) => {
        if (props.filterByContinent.length <= 0) {
          return 1;
        }

        return Number(props.filterByContinent.includes(f.properties.continent));
      },
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })],
    }),
  ];

  const handleOnViewStateChange = ({ viewState }) => {
    const viewport = new WebMercatorViewport(viewState);

    props.onBoundsChange(viewport.getBounds(viewState.zoom));
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.deck.setProps({ layers: layers });
    }
  }, [props.filterByContinent]);

  return (
    <div className="Map">
      <DeckGL
        ref={mapRef}
        controller={true}
        initialViewState={INITIAL_VIEW_STATE}
        layers={layers}
        onViewStateChange={handleOnViewStateChange}
      ></DeckGL>
    </div>
  );
}

Map.defaultProps = {
  lineWidth: 1,
  lineColor: [0, 0, 0],
  fillColor: [170, 170, 170],
  onBoundsChange: () => {},
  filterByContinent: [],
};

export default Map;
