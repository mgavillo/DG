import React, { createRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, {
  Layer,
  GeoJSONLayer,
  Source,
  Feature,
} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mapbox from "mapbox-gl"
import { AiFillEdit } from "react-icons/ai";
import { FitBounds } from "react-mapbox-gl/lib/map";
const token = process.env.REACT_APP_MAPBOX_API;
const Map = ReactMapboxGl({ accessToken: token ? token : "" });


const polygonLayer = {
    id: 'polygonfill',
    type: 'fill',
    source: 'polygon',
    paint: {
      'fill-color': '#4E3FC8'
    }
  };

export function Maps() {
  const [edit, setEdit] = useState(false);
  const [polygon, setPolygon] = useState<null | any>(null);
  const [bounds, setBounds] = useState<FitBounds | undefined>(undefined);
  const drawControls = useRef<any>();
  const onDrawUpdate = ({ features }: any) => {
    if (!features.length) return;
    setPolygon(features[0]);
  };

  const onSubmit = () => {
    if (!polygon) {
      alert("You need to enter a polygon before submitting");
      return;
    }
    setEdit(false);
  };

  const onDrawDelete = () => {
    setPolygon(null);
  };

  const onFitBound = () => {
    if (!polygon) return;
    let minBound: [number, number] = [
      polygon.geometry.coordinates[0][0][0],
      polygon.geometry.coordinates[0][0][1],
    ];
    let maxBound: [number, number] = [
      polygon.geometry.coordinates[0][0][0],
      polygon.geometry.coordinates[0][0][1],
    ];
    polygon.geometry.coordinates[0].forEach((element: any) => {
      if (element[0] > maxBound[0]) maxBound[0] = element[0];
      if (element[0] < minBound[0]) minBound[0] = element[0];
      if (element[1] > maxBound[1]) maxBound[1] = element[1];
      if (element[1] < minBound[1]) minBound[1] = element[1];
    });
    setBounds([minBound, maxBound]);
  };

  const onEdit = () => {
    setEdit(true);
    if (!polygon || !drawControls.current) return;
    console.log(polygon);
    drawControls.current.draw.add(polygon);
  };
  return (
    <div id="map-wrapper" className={"relative select-none w-[52rem] h-32rem]"}>
      <pre id="info"></pre>

      <Map
        style="mapbox://styles/mapbox/satellite-streets-v12" // eslint-disable-line
        containerStyle={{ height: "32rem", width: "52rem" }}
        fitBounds={bounds}
        fitBoundsOptions={{
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
        }}
        onDrag={() => setBounds(undefined)}
        onZoom={() => setBounds(undefined)}
        onStyleLoad={(map) => {
            // map.addSource('polygon', {
            //     type: 'canvas',
            //     canvas: 'idOfMyHTMLCanvas',
            //     animate: true,
            //     coordinates: polygon ? (({ id, ...o }) => o)(polygon) : undefined})
          // Do whatever you want with the map instance here like map.addLayer or map.addSource
        }}
      >
        {(edit && (
          <>
            <DrawControl
              ref={(drawControl) => {
                if (!drawControl) return;
                drawControls.current = drawControl;
              }}
              //   ref={drawControls}
              position="top-left"
              displayControlsDefault={false}
              onDrawCreate={onDrawUpdate}
              onDrawUpdate={onDrawUpdate}
              onDrawDelete={onDrawDelete}
              controls={{
                polygon: true,
                trash: true,
              }}
              //change default mode in index.d.ts lib
              //   defaultMode={polygon ? "simple_select" : "draw_polygon"}
            />
            <div
              className="absolute right-2 bottom-4 text-xl p-2 bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black z-10 rounded-md"
              onClick={onSubmit}
            >
              Submit
            </div>
          </>
        )) || <></>}
        {(!edit && (
          <>
            <div className="absolute left top p-1 rounded-md m-2 bg-white !hover:cursor-pointer z-10">
              <AiFillEdit
                onClick={onEdit}
                color={"#000"}
                size={20}
              ></AiFillEdit>
            </div>
            {/* <Layer {...polygonLayer}/> */}
            {/* <Source
              title="polygon"
              type="geojson"
              data={polygon ? (({ id, ...o }) => o)(polygon) : undefined}
            /> */}
            <GeoJSONLayer
              data={polygon ? (({ id, ...o }) => o)(polygon) : undefined}
                fillPaint={{
                  "fill-color": "#ff9b01",
                  "fill-opacity": 0.5,
                  "fill-outline-color": "#ff9b01",
                }}
            />
          </>
        )) || <></>}
        {/* <Source
          id="source_id"
          tileJSONSource={{
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512,
            maxzoom: 14,
          }}
        />
        <Layer type="raster" id="layer_id" sourceId="source_id" /> */}
      </Map>
      <div className="flex flex-row justify-between items-center p-12">
        <div>
          <h2>Soil type</h2>
          <h1 className="text-3xl">Silty loam</h1>
        </div>
        <div className="h-12 w-[0.5px] solid bg-black"/>
        <div>
          <h2>Size</h2>
          <h1 className="text-3xl">10ha</h1>
        </div>
        <div className="h-12 w-[0.5px] solid bg-black"/>
        <div>
          <h2>Climate</h2>
          <h1 className="text-3xl">--</h1>
        </div> 
      </div>
    </div>
  );
}
