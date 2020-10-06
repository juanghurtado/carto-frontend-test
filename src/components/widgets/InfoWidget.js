import React, { useEffect } from "react";
import withSelections from "react-item-select";
import "./InfoWidget.css";
import Widget from "./Widget";

function InfoWidget({
  data,
  title,
  barColor,
  titleAttr,
  valueAttr,
  isItemSelected,
  selections,
  handleSelect,
  onSelectedInfoChange,
}) {
  const maxValue = Math.max.apply(
    Math,
    data.map(function (o) {
      return o[valueAttr];
    })
  );

  const handleItemClick = (clickedKey) => {
    handleSelect(clickedKey);
  };

  useEffect(() => {
    onSelectedInfoChange([...Object.keys(selections)]);
  }, [selections]);

  return (
    <Widget>
      <div className="InfoWidget">
        {data.length <= 0 && <p className="Widget__loading">Loading…</p>}

        {data.length > 0 && (
          <>
            {title && <h3>{title}</h3>}

            <ul className="Widget__items">
              {data.map((row, index) => (
                <li
                  key={row[titleAttr]}
                  className={`Widget__items_item ${
                    isItemSelected(row[titleAttr])
                      ? "Widget__items_item_selected"
                      : ""
                  }`}
                  onClick={() => handleItemClick(row[titleAttr])}
                >
                  <span className="Widget__items_item_title">
                    {row[titleAttr]}
                  </span>
                  <span className="Widget__items_item_value">
                    {row[valueAttr]}
                  </span>
                  <span className="Widget__items_item_bar_wrapper">
                    <span
                      className="Widget__items_item_bar"
                      style={{
                        width: `${(row[valueAttr] * 100) / maxValue}%`,
                        backgroundColor: `rgba(${barColor})`,
                      }}
                    ></span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Widget>
  );
}

InfoWidget.defaultProps = {
  data: [],
  barColor: [0, 0, 0],
  onSelectedInfoChange: () => {},
};

export default withSelections(InfoWidget);
