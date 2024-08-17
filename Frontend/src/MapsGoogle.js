// MapComponent.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Map from "./Map";
import axios from "axios";
import {
  CircleF,
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
// import { LoadScript } from "@react-google-maps/api";
// import { withScriptjs } from "react-google-maps";

const MapComponent = () => {
  const { latitude, longitude, radius, driver_id } = useParams();
  const location = { lat: Number(latitude), lng: Number(longitude) };
  const { lat, lng } = location;
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    fetchDriverPath();
  }, [latitude, longitude]);

  const fetchDriverPath = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/driver/efadf31d-5556-49e5-afb8-29319f7a71cc`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setResponseData(response.data.driver_path);
    } catch (err) {
      console.log(`Error finding the driver path: `, err);
    }
  };

  const data = [
    {
      id: 1,
      name: "Park Slope",
      latitude: lat,
      longitude: lng,
      circle: {
        radius: Number(radius),
        options: {
          strokeColor: "#ff0000",
        },
      },
    },
  ];

  const data_driver = responseData.map((item, index) => ({
    id: index + 1,
    name: "Driver Current Location",
    latitude: item.latitude,
    longitude: item.longitude,
  }));

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const radiusOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 1,
    // fillColor: "#FF0000",
    fillOpacity: 0.2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    // radius: 300, // Radius in meters (adjust according to your needs)
  };

  return (
    // <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_KEYS}>
    // <Map
    //   center={{ lat, lng }}
    //   zoom={15}
    //   places={[data, data_driver]}
    //   googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEYS}`}
    //   // loadingElement={<div style={{ height: 100 }} />}
    //   // containerElement={<div style={{ height: "800px" }} />}
    //   // mapElement={<div style={{ height: 100 }} />}
    // />
    // </LoadScript>
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_KEYS}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={16}
      >
        <MarkerF position={{ lat, lng }} />
        {radius && (
          <CircleF
            center={{
              lat,
              lng,
            }}
            radius={Number(radius)}
            options={radiusOptions}
            // options={place.circle.options}
          />
        )}
        {radius && (
          <PolylineF
            path={data_driver.map((item) => {
              return {
                lat: Number(item.latitude),
                lng: Number(item.longitude),
              };
            })}
            options={{
              strokeColor: "blue",
              strokeOpacity: 1,
              strokeWeight: 3,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
