import {ImageResponse, NextRequest} from "next/server";

export const config = {
    runtime: "edge",
};

export default function handler(request: NextRequest) {
    const squareSize = 50;
    const tableMarginSize = 20;
    const {searchParams} = new URL(request.url);
    const hasSeatRowCount = searchParams.has('seatRowCount');
    const seatRowCount = hasSeatRowCount
        ? searchParams.get('seatRowCount')?.slice(0, 100)
        : 1;
    const hasSeatColumnCount = searchParams.has('seatColumnCount');
    const seatColumnCount = hasSeatColumnCount
        ? searchParams.get('seatColumnCount')?.slice(0, 100)
        : 1;
    const hasTableRowCount = searchParams.has('tableRowCount');
    const tableRowCount = hasTableRowCount ? Number(searchParams.get('tableRowCount')) : 1;
    const hasTableColumnCount = searchParams.has('tableColumnCount');
    const tableColumnCount = hasTableColumnCount ? Number(searchParams.get('tableColumnCount')) : 1;
    const hasScreenSize = searchParams.has('screenWidth') && searchParams.has('screenHeight');
    const hasTableSize = searchParams.has('allTableHeight') && searchParams.has('allTableWidth');
    const allTableHeight = hasTableSize ? Number(searchParams.get('allTableHeight')) : 800;
    const allTableWidth = hasTableSize ? Number(searchParams.get('allTableWidth')) : 800;
    const screenWidth = hasScreenSize ? Number(searchParams.get('screenWidth')) : 1000;
    const screenHeight = hasScreenSize ? Number(searchParams.get('screenHeight')) : 1000;
    const seatRows = Array.from({length: Number(seatRowCount)});
    const seatCols = Array.from({length: Number(seatColumnCount)});
    const tableRows = Array.from({length: tableRowCount});
    const tableCols = Array.from({length: tableColumnCount});

    try {
        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundColor: 'white',
                        width: screenWidth,
                        height: screenHeight,
                        display: 'flex',
                        flexShrink: 0,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        id="main-table"
                        style={{
                            display: "flex",
                            backgroundColor: 'white',
                            flexDirection: 'column',
                            width: allTableWidth,
                            height: squareSize,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            border: '1px solid black',
                            boxSizing: "border-box",
                            textAlign: "center",
                        }}>
                        <div style={{
                            display: "flex",
                            fontSize: squareSize / 4,
                            fontWeight: "bold",
                            lineHeight: 1,
                            alignItems: 'center', // 追加
                            justifyContent: 'center', // 追加
                            height: '100%',
                            width: '100%',
                        }}
                        ><p>Main Table</p></div>
                    </div>
                    <div style={{
                        width: allTableWidth + tableMarginSize * tableColumnCount,
                        height: allTableHeight + tableMarginSize * tableRowCount,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {tableRows.map((_, tableRowIndex) => (
                            <div
                                key={`table-row-${tableRowIndex}`}
                                id="table-row-${tableRowIndex}"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                {tableCols.map((_, tableColumnIndex) => (
                                    <div
                                        key={`table-${tableRowIndex}-${tableColumnIndex}`}
                                        id="table"
                                        style={{
                                            width: squareSize * Number(seatColumnCount),
                                            height: squareSize * Number(seatRowCount),
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: tableMarginSize / 2,
                                        }}
                                    >
                                        {seatRows.map((_, seatRowIndex) => (
                                            <div
                                                key={`seat-row-${seatRowIndex}`}
                                                id="seat-row"
                                                style={{
                                                    width: `${squareSize * seatCols.length}px`,
                                                    height: `${squareSize}px`,
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                {seatCols.map((_, seatColIndex) => (
                                                    <div
                                                        id="seat-col"
                                                        key={`seat-col-${seatColIndex}`}
                                                        style={{
                                                            display: "flex",
                                                            width: `${squareSize}px`,
                                                            height: `${squareSize}px`,
                                                            border: '1px solid black',
                                                            boxSizing: "border-box",
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ),
            {
                width: screenWidth,
                height: screenHeight,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
