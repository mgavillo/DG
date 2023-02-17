import { VegaLite, VisualizationSpec } from 'react-vega';


export function Charts() {
  const spec: VisualizationSpec = {
    width: 400,
    height: 200,
    mark: { type: 'bar' },
    encoding: {
      x: { field: 'a', type: 'ordinal' },
      y: { field: 'b', type: 'quantitative' },
    },
    data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
  }
  
  const barData = {
    table: [
      { a: 'A', b: 28 },
      { a: 'B', b: 55 },
      { a: 'C', b: 43 },
      { a: 'D', b: 91 },
      { a: 'E', b: 81 },
      { a: 'F', b: 53 },
      { a: 'G', b: 19 },
      { a: 'H', b: 87 },
      { a: 'I', b: 52 },
    ],
  }

  return (
  <div className="flex flex-row">
    <div className="w-1/3">
      <VegaLite spec={spec} data={barData} />,
    </div>
    <div className="w-1/3">
      <VegaLite spec={spec} data={barData} />,
    </div>
    <div className="w-1/3">
      <VegaLite spec={spec} data={barData} />,
    </div>
  </div>
  );
}

export default Charts;