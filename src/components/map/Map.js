import { CartoSQLLayer } from "@deck.gl/carto";
import { WebMercatorViewport } from "@deck.gl/core";
import DeckGL from "@deck.gl/react";
import React from "react";

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 3,
  bearing: 0,
  pitch: 0,
};

function Map(props) {
  const layers = [
    new CartoSQLLayer({
      data: "select * from public.ne_50m_admin_0_countries",
      getLineColor: props.lineColor,
      getFillColor: props.fillColor,
      lineWidthMinPixels: props.lineWidth,
    }),
  ];

  const handleOnViewStateChange = (viewport, viewState) => {
    props.onBoundsChange(viewport.getBounds(viewState.zoom));
  };

  return (
    <div className="Map">
      <DeckGL
        controller={true}
        initialViewState={INITIAL_VIEW_STATE}
        layers={layers}
        onViewStateChange={({ viewState }) => {
          const viewport = new WebMercatorViewport(viewState);

          handleOnViewStateChange(viewport, viewState);
        }}
      ></DeckGL>
    </div>
  );
}

Map.defaultProps = {
  lineWidth: 1,
  lineColor: [0, 0, 0],
  fillColor: [170, 170, 170],
  onBoundsChange: () => {},
};

export default Map;
