import React from "react";
import dynamic from "next/dynamic";

export default function Home() {
    const DynamicMap = React.useMemo(
        () =>
            dynamic(() => import('@/components/leaflet/LeafletSeating'), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        []
    );
    return (
        <DynamicMap/>
    );
}
