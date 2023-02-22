import { VegaLite, VisualizationSpec } from 'react-vega';
import { genAssessment } from './GenSample';

const config = {
  "background": "#ffffff",
  "arc": {"fill": "#1d8f03"},
  "area": {"fill": "#1d8f03"},
  "path": {"stroke": "#1d8f03"},
  "line": {"stroke": "#1d8f03", "size": 1},
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
    "encoding": {"x": {"field": "timestamp", "type": "temporal", "sort": "ascending"}},
    "layer": [
      {
        "mark": {"type": "line", "interpolate": "cardinal"},
        "encoding": {
          "y": {
            "field": "mode",
            "sort": null,
            "type": "quantitative",
            // "axis": {"orient": "top"},
            "title": "tC02 Sequestration",
          }
        }
      },
      {
        "mark": {"type": "area", "interpolate": "cardinal"},
        "encoding": {
          "y": {"field": "upper_limit", "type": "quantitative"},
          "y2": {"field": "lower_limit"},
          "opacity": {"value": 0.3}
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
    config: config
  }

  const yieldData = {
    table: genAssessment(0.5, .5, 0).data
  }

  const costData = {
    table: genAssessment(1.1, -10000, 50000).data
  }

  const height = 200
  const width = 200

  return (
  <div className="flex flex-row">
    <div className="w-1/3">
    <h2>Potential Impact</h2>
      <VegaLite spec={impactSpec} data={impactData} height={height} width={width} />,
    </div>
    <div className="w-1/3">
      <h2>Potential Yield</h2>
      <VegaLite spec={spec} data={yieldData} height={height} width={width} />,
    </div>
    <div className="w-1/3">
      <h2>Potential Operating Costs</h2>
      <VegaLite spec={spec} data={costData} height={height} width={width} />,
    </div>
  </div>
  );
}

export default Charts;