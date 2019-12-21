import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useQuery } from "@apollo/react-hooks";
import { GET_LOCATIONS } from "../../contexts/apollo/queries";
import Navigation from "../Navigation";
import { Typography } from "antd";

const { Title } = Typography;

export default () => {
  const { data, loading, error } = useQuery(GET_LOCATIONS);
  const [points, setPoints] = useState<any>([]);
  useEffect(() => {
    if (data) {
      console.log(data);
      const newPoints: any[] = [];
      data.getLocations.map(location => {
        newPoints.push({
          location: [location.lat, location.lng],
          weight: location.numberOfSerious
        });
      });
      setPoints(newPoints);
    }
  }, [data]);

  return (
    <div style={{ width: "100vw", height: "80vh" }}>
      <Navigation />
      <Title>Heat Map</Title>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDo5__zdGF74kyZp6ZoHXx2AxvWFvQ0yog" }}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33
        }}
        defaultZoom={1}
        heatmapLibrary={true}
        onGoogleApiLoaded={({ map, maps }) => {
          const heatmap = new maps.visualization.HeatmapLayer({
            data: points.map(point => ({
              location: new maps.LatLng(
                point["location"][1],
                point["location"][0]
              ),
              weight: point["weight"]
            }))
          });
          heatmap.setMap(map);
        }}
      ></GoogleMapReact>
    </div>
  );
};
