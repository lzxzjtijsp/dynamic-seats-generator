import {ImageOverlay, MapContainer} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import {CRS, LatLng, LatLngBounds} from "leaflet";
import {useMemo, useState} from "react";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import TableMaker from "@/components/leaflet/TableMaker";
import {calculateSeatPositions} from "@/utils/calculateSeatPositions";

const squareSize = 50
const paddingSize = 100
const seatColumnCount = 3;
const seatRowCount = 2;
const tableMarginSize = 20;

export default function LeafletSeating() {
    const [tableColumnCount, setTableColumnCount] = useState<number>(3);
    const [tableRowCount, setTableRowCount] = useState<number>(3);
    const [allTableWidth, allTableHeight] = useMemo(() => [
        squareSize * seatColumnCount * tableColumnCount,
        squareSize * seatRowCount * tableRowCount
    ], [tableColumnCount, tableRowCount, squareSize])

    const [screenWidth, screenHeight] = useMemo(() => [
        allTableWidth + paddingSize + tableMarginSize * tableColumnCount,
        allTableHeight + squareSize + paddingSize + tableMarginSize * tableRowCount
    ], [tableColumnCount, tableRowCount, squareSize])

    const centerLatLng = useMemo(() => new LatLng(screenHeight / 2, screenWidth / 2), [screenHeight, screenWidth]);

    const bounds = useMemo(() => new LatLngBounds([0, 0], [screenHeight, screenWidth]), [screenHeight, screenWidth]);

    const mapUrl = useMemo(() => `http://localhost:3000/api/image?seatColumnCount=${seatColumnCount}&seatRowCount=${seatRowCount}&tableRowCount=${tableRowCount}&tableColumnCount=${tableColumnCount}&screenWidth=${screenWidth}&screenHeight=${screenHeight}&allTableWidth=${allTableWidth}&allTableHeight=${allTableHeight}`, [seatColumnCount, seatRowCount, tableRowCount, tableColumnCount, screenWidth, screenHeight]);

    const seatList = useMemo(() => calculateSeatPositions(
        seatRowCount,
        seatColumnCount,
        tableRowCount,
        tableColumnCount,
        squareSize,
        screenWidth,
        screenHeight,
        paddingSize,
        tableMarginSize
    ), [seatRowCount, seatColumnCount, tableRowCount, tableColumnCount, squareSize, screenWidth, screenHeight, paddingSize, tableMarginSize]);

    return (
        <div className="flex justify-center">
            <MapContainer
                crs={CRS.Simple}
                center={centerLatLng}
                zoom={0}
                maxZoom={1}
                style={{height: "70vh", width: "100%"}}
            >
                {/*テーブルの行セレクター*/}
                <div className="absolute right-0 top-0"
                     style={{margin: "10px 10px 0 0", zIndex: 1000}}
                >
                    <label htmlFor="tableColumnOptions" className="block text-sm font-medium leading-6 text-gray-900">
                        テーブルの行数
                    </label>
                    <select
                        id="tableColumnOptions"
                        name="tableColumnOptions"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={tableColumnCount}
                        onChange={(e) => setTableColumnCount(Number(e.target.value))}
                    >
                        <option value={1}>1行</option>
                        <option value={2}>2行</option>
                        <option value={3}>3行</option>
                        <option value={4}>4行</option>
                        <option value={5}>5行</option>
                        <option value={6}>6行</option>
                    </select>
                </div>
                {/*テーブルの列セレクター*/}
                <div className="absolute bottom-0 left-0"
                     style={{margin: "0 0 10px 10px", zIndex: 1000}}
                >
                    <label htmlFor="tableRowOptions" className="block text-sm font-medium leading-6 text-gray-900">
                        テーブルの列数
                    </label>
                    <select
                        id="tableRowOptions"
                        name="tableRowOptions"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={tableRowCount}
                        onChange={(e) => setTableRowCount(Number(e.target.value))}
                    >
                        <option value={1}>1列</option>
                        <option value={2}>2列</option>
                        <option value={3}>3列</option>
                        <option value={4}>4列</option>
                        <option value={5}>5列</option>
                        <option value={6}>6列</option>
                    </select>
                </div>
                {mapUrl && <ImageOverlay key={mapUrl} url={mapUrl} bounds={bounds} zIndex={1}/>}
                {seatList && seatList.map((seat) => (
                    <TableMaker key={seat.id} lat={seat.lat} lng={seat.lng} id={seat.id}/>
                ))}
            </MapContainer>
        </div>
    )
}
