import React, { useEffect, useMemo } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import icon from "./icon"
import { Box } from "@chakra-ui/react"

function Markerposition ({ address }) {
    const position = useMemo(() => {
        return [address.location.lat, address.location.lng]
      }, [address.location.lat, address.location.lng])
      const map = useMap()
    
      useEffect(() => {
        map.flyTo(position, 13, {
          animate: true,
        })
      }, [map, position])
    return(
        <>
        <Box>
        <Marker icon={icon} position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
        </Box>

        </>
    )
}
export default Markerposition