import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

const Map = ({ coordinates }) => {
  const MapboxGl = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
  });

  return (
    <MapboxGl
      center={coordinates}
      zoom={[15]}
      pitch={[60]}
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/light-v10"
    >
      <Marker coordinates={coordinates} anchor="bottom">
        <FontAwesomeIcon icon={faMapPin} className="fa-4x text-info" />
      </Marker>
    </MapboxGl>
  );
};

export default Map;
