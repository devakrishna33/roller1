import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV2YWtyaXNobmEiLCJhIjoiY2s0NHBuMzZyMDE0NDNncW91d2ptb3NsdSJ9.iCvFpo2z1AzbABhqiuLAzQ";

export default () => {
  const [{ lng, lat, zoom }] = useState({
    lng: 5,
    lat: 34,
    zoom: 2
  });
  const mapContainer = useRef<any>(null);

  useEffect(() => {
    new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom
    });
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}
    />
  );
};
