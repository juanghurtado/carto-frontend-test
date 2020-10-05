import React from "react";
import "./InfoWidget.css";
import Widget from "./Widget";

function InfoWidget({ data, title, titleAttr, valueAttr }) {
  const max = Math.max.apply(
    Math,
    data.map(function (o) {
      return o[valueAttr];
    })
  );

  return (
    <Widget>
      <div className="InfoWidget">
        {data.length <= 0 && <p className="Widget__loading">Loading…</p>}

        {data.length > 0 && (
          <>
            {title && <h3>{title}</h3>}

            <ul className="Widget__items">
              {data.map((row, index) => (
                <li className="Widget__items_item" key={index}>
                  <span className="Widget__items_item_title">
                    {row[titleAttr]}
                  </span>
                  <span className="Widget__items_item_value">
                    {row[valueAttr]}
                  </span>
                  <span className="Widget__items_item_bar_wrapper">
                    <span
                      className="Widget__items_item_bar"
                      style={{ width: `${(row[valueAttr] * 100) / max}%` }}
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
};

export default InfoWidget;
