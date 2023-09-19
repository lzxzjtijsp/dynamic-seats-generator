import {Icon} from 'leaflet';
import {Marker, Tooltip, useMapEvents} from "react-leaflet";
import {useState} from "react";

interface SeatProps {
    id: number,
    lat: number,
    lng: number,
}

export default function TableMaker(props: SeatProps) {
    const [permanent, setPermanent] = useState<boolean>(false)
    const addIcon = new Icon({
        iconUrl: `http://localhost:3000/api/image/seat?id=${props.id}`,
        iconSize: [25, 25],
    });

    // 変数をタプルとして明示的に定義
    const position: [number, number] = [props.lat, props.lng]
    useMapEvents({
        zoomend: (e) => {
            const map = e.target;
            setPermanent(map.getZoom() == 1)
        },
    });
    return (
        <Marker key={props.id} position={position} icon={addIcon}>
            {/*keyがあることで内部的な破壊を行い再構築する*/}
            <Tooltip permanent={permanent} key={permanent.toString()} direction={"top"}>
                田中よしお
            </Tooltip>
        </Marker>
    )
}
