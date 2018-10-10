import React from "react";
import { compose, withStateHandlers } from 'recompose';
import CameraMarker from "@material-ui/icons/Camera";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  TrafficLayer,
  Marker,
  InfoWindow
} from "react-google-maps";

const CustomSkinMap = compose(
  withStateHandlers( () => ({
    isOpen: false
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props => {
    const isOpen = false;

    //console.log(props.cameras);
    const cameraMarkers = props.cameras ?
    props.cameras.map( (camera, index) => {
      const icon = {
        url: './img/cctv.png',
        size: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
      }
      return (
        <Marker position={{
                          lat: camera.location.lat,
                          lng: camera.location.lon
                        }}
                 icon={icon}
                 onClick={props.onToggleOpen}
                 key={index}>
                 { props.isOpen &&
                  <InfoWindow defaultVisible={false} onCloseClick={props.onToggleOpen}>
                    <div>{camera.name}</div>
                  </InfoWindow>}
        </Marker>)
    }) : null;

    return (<GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={{
                        lat: props.center.lat,
                        lng: props.center.lon
                       }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        panControl: false,
        streetViewControl: false,
        draggable: true,
        fullscreenControl: false,
        mapTypeControl: false,
        draggableCursor:'default',
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
                      { color: "#ece2d9" },
                      { visibility: "off"}
                    ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
                        { color: "#767676" }
                      ]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "poi",
            stylers: [
                      { visibility: "off" }
                     ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "off" },
                      { color: "#b8cb93" }
                    ]
          },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "poi.medical",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }]
          }
        ]
      }}
    >
      {cameraMarkers}
    <TrafficLayer autoUpdate />
    </GoogleMap>)

})

// const CustomSkinMap = withScriptjs(
//   withGoogleMap(props => {
//
//     const isOpen = false;
//
//     //console.log(props.cameras);
//     const cameraMarkers = props.cameras ?
//     props.cameras.map( (camera, index) => {
//       return (
//         <Marker position={{
//                           lat: camera.location.lat,
//                           lng: camera.location.lon
//                         }}
//                      icon={CameraMarker}
//                      onClick={() => alert('here')}
//                      key={index}>
//                      {isOpen &&
//                       <InfoWindow defaultVisible={false}>
//                         <div>{camera.name}</div>
//                       </InfoWindow>}
//         </Marker>)
//     }) : null;
//
//     return (<GoogleMap
//       defaultZoom={13}
//       defaultCenter={{
//                         lat: props.center.lat,
//                         lng: props.center.lon
//                        }}
//       defaultOptions={{
//         scrollwheel: false,
//         zoomControl: true,
//         styles: [
//           {
//             featureType: "water",
//             stylers: [
//               { saturation: 43 },
//               { lightness: -11 },
//               { hue: "#0088ff" }
//             ]
//           },
//           {
//             featureType: "road",
//             elementType: "geometry.fill",
//             stylers: [
//               { hue: "#ff0000" },
//               { saturation: -100 },
//               { lightness: 99 }
//             ]
//           },
//           {
//             featureType: "road",
//             elementType: "geometry.stroke",
//             stylers: [{ color: "#808080" }, { lightness: 54 }]
//           },
//           {
//             featureType: "landscape.man_made",
//             elementType: "geometry.fill",
//             stylers: [{ color: "#ece2d9" }]
//           },
//           {
//             featureType: "poi.park",
//             elementType: "geometry.fill",
//             stylers: [{ color: "#ccdca1" }]
//           },
//           {
//             featureType: "road",
//             elementType: "labels.text.fill",
//             stylers: [{ color: "#767676" }]
//           },
//           {
//             featureType: "road",
//             elementType: "labels.text.stroke",
//             stylers: [{ color: "#ffffff" }]
//           },
//           { featureType: "poi", stylers: [{ visibility: "off" }] },
//           {
//             featureType: "landscape.natural",
//             elementType: "geometry.fill",
//             stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
//           },
//           { featureType: "poi.park", stylers: [{ visibility: "on" }] },
//           {
//             featureType: "poi.sports_complex",
//             stylers: [{ visibility: "on" }]
//           },
//           { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
//           {
//             featureType: "poi.business",
//             stylers: [{ visibility: "simplified" }]
//           }
//         ]
//       }}
//     >
//       {cameraMarkers}
//     <TrafficLayer autoUpdate />
//     </GoogleMap>)
//   })
// );

const Maps = ({ ...props}) => {

  return (
    <CustomSkinMap
      center={props.center}
      cameras={props.cameras}
      zoom={props.zoom}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDquW_Bmru-uQ1e8PAj9ogpL8SC4BxSTgI"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

export default Maps;
