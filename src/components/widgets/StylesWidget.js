import React, { useEffect, useState } from "react";
import { COLORS } from "../../core/constants";
import { getKeyByValue } from "../../core/utils";
import Widget from "./Widget";

function StylesWidget(props) {
  const [config, setConfig] = useState(props.config);

  const handleOnClick = (e) => {
    const { name, value } = e.target;

    setConfig({
      ...config,
      [name]: COLORS[value] || value,
    });
  };

  useEffect(() => {
    props.onChange(config);
  }, [config]);

  return (
    <Widget>
      <div className="StylesWidget">
        <p>
          <label htmlFor="lineWidth">Stroke width</label>
          <br />
          <select
            id="lineWidth"
            name="lineWidth"
            onChange={handleOnClick}
            value={props.config.lineWidth}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </p>

        <p>
          <label htmlFor="lineColor">Stroke color</label>
          <br />
          <select
            id="lineColor"
            name="lineColor"
            onChange={handleOnClick}
            value={getKeyByValue(COLORS, props.config.lineColor)}
          >
            {Object.keys(COLORS).map((k, index) => (
              <option value={k} key={index}>
                {k}
              </option>
            ))}
          </select>
        </p>

        <p>
          <label htmlFor="fillColor">Shape color</label>
          <br />
          <select
            id="fillColor"
            name="fillColor"
            onChange={handleOnClick}
            value={getKeyByValue(COLORS, props.config.fillColor)}
          >
            {Object.keys(COLORS).map((k, index) => (
              <option value={k} key={index}>
                {k}
              </option>
            ))}
          </select>
        </p>
      </div>
    </Widget>
  );
}

StylesWidget.defaultProps = {
  onChange: () => {},
  config: {
    lineWidth: 1,
    lineColor: COLORS.black,
    fillColor: COLORS.white,
  },
};

export default StylesWidget;
