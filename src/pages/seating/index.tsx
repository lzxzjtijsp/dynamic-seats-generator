import React from "react";
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic';

function Seating() {
    const DynamicMap = React.useMemo(
        () =>
            dynamic(() => import('@/components/leaflet/LeafletSeating'), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        []
    );
    return (
        <div>
            <DynamicMap/>
        </div>
    );
}

export default Seating;
