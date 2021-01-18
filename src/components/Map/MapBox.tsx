import React, { useRef, useState } from "react";

import { makeStyles } from '@material-ui/core/styles'
import  MapGL, {Source, Layer} from '@urbica/react-map-gl'
import { mapboxConfig } from "../../config/config";


const {accessToken, mapStyle} = mapboxConfig;

const useStyles = makeStyles(theme => ({
    mapContainer: {
      flexGrow: 0,
      height: '100%',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      zIndex: 0,
      backgroundColor: 'rgba(0,0,0,0.2)',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    marker: {
      position: 'absolute',
      top: 'calc( ( 100% - 350px ) / 2  )',
      left: '50%',
      transform: 'translate(-21px, -42px)'
    }
  })) 

  const data = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [-122.48369693756104, 37.83381888486939],
        [-122.48348236083984, 37.83317489144141],
        [-122.48339653015138, 37.83270036637107],
        [-122.48356819152832, 37.832056363179625],
        [-122.48404026031496, 37.83114119107971],
        [-122.48404026031496, 37.83049717427869],
        [-122.48348236083984, 37.829920943955045],
        [-122.48356819152832, 37.82954808664175],
        [-122.48507022857666, 37.82944639795659],
        [-122.48610019683838, 37.82880236636284],
        [-122.48695850372314, 37.82931081282506],
        [-122.48700141906738, 37.83080223556934],
        [-122.48751640319824, 37.83168351665737],
        [-122.48803138732912, 37.832158048267786],
        [-122.48888969421387, 37.83297152392784],
        [-122.48987674713133, 37.83263257682617],
        [-122.49043464660643, 37.832937629287755],
        [-122.49125003814696, 37.832429207817725],
        [-122.49163627624512, 37.832564787218985],
        [-122.49223709106445, 37.83337825839438],
        [-122.49378204345702, 37.83368330777276]
      ]
    }
  };


  export interface Props {

  }

  function MapBox({}:Props) {
    const classes = useStyles();
    const mapRef = useRef();
    const [viewport, setViewport] = useState({ 
      latitude: 37.830348,
      longitude: -122.486052,
      zoom: 15 });
    const [loaded, setLoaded] = useState(false)
      return (
        <MapGL
        style={{  width: '100%', height: '500px', border:"none", outline: "none" }}
        mapStyle={mapStyle}
        accessToken={accessToken}
        onViewportChange={setViewport}
        onLoad={()=>{setLoaded(true)}}
        ref={mapRef}
        {...viewport}
        
      >
        <Source id='route' type='geojson' data={data} />
        <Layer
          id='route'
          type='line'
          source='route'
          layout={{
            'line-join': 'round',
            'line-cap': 'round'
          }}
          paint={{
            'line-color': '#888',
            'line-width': 8
          }}
        />
          </MapGL>

      )
  }

  export default MapBox;
