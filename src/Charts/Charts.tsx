import { VegaLite, VisualizationSpec } from 'react-vega';
import { genAssessment } from './GenSample';

const config = {
  "background": "#ffffff",
  "area": {"fill": "#1d8f03"},
  "line": {"stroke": "#1d8f03", "size": 1},
  "arc": {"fill": "#1d8f03"},
  "path": {"stroke": "#1d8f03"},
  "rect": {"fill": "#1d8f03"},
  "shape": {"stroke": "#1d8f03"},
  "symbol": {"fill": "#1d8f03", "size": 30},
  "axis": {
    "domainColor": "#979797",
    "domainWidth": 0.5,
    "gridWidth": 0.2,
    "labelColor": "#979797",
    "tickColor": "#979797",
    "tickWidth": 0.2,
    "titleColor": "#979797"
  },
  "axisBand": {"grid": false},
  "axisX": {"grid": true, "tickSize": 10},
  "axisY": {"domain": false, "grid": true, "tickSize": 0},
  "legend": {
    "labelFontSize": 50,
    "padding": 1,
    "symbolSize": 10,
    "symbolType": "square"
  },
  "range": {
    "category": [
      "#ab5787",
      "#51b2e5",
      "#703c5c",
      "#168dd9",
      "#d190b6",
      "#00609f",
      "#d365ba",
      "#154866",
      "#666666",
      "#c4c4c4"
    ]
  }
}


export function Charts() {

  const spec: VisualizationSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "name": "table" },
    // "data": { "values": genAssessment(1.9, 1.9, 0).data },
    "encoding": {"x": {"field": "timestamp", type: "temporal", "sort": "ascending", title: "Date"}},
    "layer": [
      {
        "mark": {"type": "area", "interpolate": "cardinal", tooltip: true},
        "encoding": {
          "tooltip": [
            {"field": "past", "type": "nominal", "title": "Past"} 
            // {"field": "size", "type": "quantitative", "title": "Size"} // uncomment if you'd like to debug the size quatntity
          ],
          "y": {"field": "upper_limit", "type": "quantitative", "title": "Possible Outcomes"},
          "y2": {"field": "lower_limit"},
          "opacity": {"value": 0.3},
          "color": {
            "condition": {"test": "datetime() < datum.timestamp", "value": "steelblue"}
          }
        }
      },
      {
        "params": [
          {
            "name": "paintbrush",
            "select": {"type": "point", "on": "mouseover", "nearest": true}
          }
        ],
        "mark": {"type": "circle"},
        "transform": [
          {"calculate": "abs((datum.upper_limit - datum.lower_limit) / (datum.upper_limit + datum.lower_limit))", "as": "size"},
          {"calculate": "datum.timestamp < now()", "as": "now"}
        ],
        "encoding": {
          y: {field: "mode", type: "quantitative"},
          "tooltip": [
            {"field": "upper_limit", "type": "quantitative", "title": "Upper Limit"},
            {"field": "lower_limit", "type": "quantitative", "title": "Lower Limit"},
            {"field": "timestamp", "type": "temporal", "title": "Date"},
            // {"field": "now", "type": "nominal", "title": "Past"} 
            // {"field": "size", "type": "quantitative", "title": "Size"} // uncomment if you'd like to debug the size quatntity
          ],
          "color": {
            "condition": {
              "param": "paintbrush",
              "field": "mode",
              "type": "quantitative",
              "value": "red",
              "legend": null,
              "scale": null // Use a null scale to override the color scale
            },
            "value": "transparent",
          },
          "opacity": {
            "condition": {
              "param": "paintbrush",
              "value": 1,
              "empty": false
            },
            "value": 0
          },
          "size": {
            "field": "size",
            "scale": {
              "type": "linear",
              "domain": [0, .25], // set the domain based on the size range
              "range": [200, 10], // set the range based on the desired circle size range
              "clamp": true // clamp the size to the range
            },
            legend: null
          }
        }
      }      
    ],
    config: config
  }

  const impactData = {
    table: genAssessment(1.9, 1.9, 0).data
  }
  const impactSpec = {
    ...spec,
    config: { 
      ...config,
      "area": {"fill": "#ff9b01"},
      "line": {"stroke": "#ff9b01", "size": 1},
    }
  }

  const yieldData = {
    table: genAssessment(0.5, .5, 0).data
  }

  const yieldSpec = {
    ...spec,
    config: { 
      ...config,
      "area": {"fill": "#1d8f03"},
      "line": {"stroke": "#1d8f03", "size": 1},
    }
  }

  const costData = {
    table: genAssessment(1.1, -10000, 50000).data
  }

  const costSpec = {
    ...spec,
    config: { 
      ...config,
      "area": {"fill": "#1389f7"},
      "line": {"stroke": "#1389f7", "size": 1},
    }
  }

  const height = 300
  const width = 300

  return (
  <div className="flex flex-row mb-32">
    <div className="w-1/3">
    <h2>Environmental Benefit</h2>
      <VegaLite spec={impactSpec} data={impactData} height={height} width={width} />,
    </div>
    <div className="w-1/3">
      <h2>Yield</h2>
      <VegaLite spec={yieldSpec} data={yieldData} height={height} width={width} />,
    </div>
    <div className="w-1/3">
      <h2>Total Cost</h2>
      <VegaLite spec={costSpec} data={costData} height={height} width={width} />,
    </div>
  </div>
  );
}

export default Charts;