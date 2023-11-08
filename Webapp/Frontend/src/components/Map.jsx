import { useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

const markers = [{
    id: 1,
    name: "JD & SONS AUTO BROKER",
    position: {lat:33.966890, lng:-84.254420,}
}]

const apikey = import.meta.env.VITE_GOOGLE_API_KEY

const MapComponent = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apikey,
    });

    const [activeMarker, setActiveMarker] = useState(null)

    const handleActiveMarker = (marker) => {
        if(marker === activeMarker) {
            return
        }
        setActiveMarker(marker)
    }

    return (
        <>
            <div>
                {isLoaded ? (
                    <GoogleMap
                        center={{
                            lat: 33.966890,
                            lng: -84.254420,
                        }}
                        zoom={15}
                        onClick={() => setActiveMarker(null)}
                        mapContainerStyle={{
                            width: "100%",
                            height: "98%",
                        }}
                    >
                        {
                            markers.map(({ id, name, position}) => (
                                <MarkerF key={id} position={position} onClick={() => handleActiveMarker(id)}>
                                    <div>{name}</div>

                                    {
                                        activeMarker === id ? <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                            <div>{name}</div>
                                        </InfoWindowF> : null
                                    }
                                </MarkerF>
                            ))
                        }                   
                    </GoogleMap>
                ) : null}
            </div>
        </>
    );
}

export default MapComponent;
