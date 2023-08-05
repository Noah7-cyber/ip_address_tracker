import React from 'react'
import { useEffect } from 'react';
import { Icon } from 'leaflet';
import locateimg from "./assets/icon-location.svg"
import { Marker, Popup, useMap } from 'react-leaflet'
function Mark({address}) {
    const map = useMap()
    const customIcon = new Icon({
        iconUrl:locateimg,
        iconSize:[38,38]
      })
      const position = [address.location.lat, address.location.lng]
    useEffect(()=>{
      
        map.flyTo(position, 13, {
          animate: true
        })
      },[map, position])
  return (
    <>
    <Marker position={position} icon={customIcon}>
      <Popup>
        Your location <br /> Easily customizable.
      </Popup>
    </Marker>
    </>
  )
}

export default Mark