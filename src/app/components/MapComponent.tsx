import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
  TileLayer,
  MapContainer,
  LayersControl
} from "react-leaflet";
import { Button } from "@material-ui/core";

// Import the JS and CSS:
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const Map = () => {
  const [map, setMap] = useState(null);
  
// State vars for our routing machine instance:
  const [routingMachine, setRoutingMachine] = useState(null)

// Start-End points for the routing machine:
  const [start, setStart] = useState([10.7202, 122.5621])
  const [end, setEnd] = useState([11.1688, 122.6504])

// Ref for our routing machine instace:
  const RoutingMachineRef = useRef(null)

// Create the routing-machine instance:
useEffect(() => {
    if (!map) return; // Early return if no map
  
    RoutingMachineRef.current = new L.Routing.control({
      position: 'topleft',
      lineOptions: {
        styles: [
          { color: '#757de8' },
        ],
      },
      waypoints: [start, end],
    });
  
    setRoutingMachine(RoutingMachineRef.current);
  }, [map]);

// Once routing machine instance is ready, add to map:
  useEffect(() => {
    if (!routingMachine) return
    if (routingMachine) {
      routingMachine.addTo(map)
    }
  }, [routingMachine])


  return (
    <>
      <Button variant='contained' color='default'>Click To Change Waypoints</Button>
      <MapContainer
        center={[10.7202, 122.5621]} zoom={13} style={{ height: "100vh", width: "100vw", borderRadius: "0 20px 20px 0" }}
        // Set the map instance to state when ready:
        whenCreated={map => setMap(map)}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default Map;