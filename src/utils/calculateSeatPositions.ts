
type SeatPositionType = {
    id: number,
    lat: number,
    lng: number,
}

export const calculateSeatPositions = (
    seatRowCount: number,
    seatColumnCount: number,
    tableRowCount: number,
    tableColumnCount: number,
    squareSize: number,
    screenWidth: number,
    screenHeight: number,
    paddingSize: number,
    tableMarginSize: number
): SeatPositionType[] => {
    const seatPositions: SeatPositionType[] = [];

    // テーブルの位置を生成します
    const tablePositions = Array.from({length: tableRowCount}, (_, row) => Array.from({length: tableColumnCount}, (_, col) => ({
        row,
        col
    })));

    // テーブル内の席の位置を生成します
    const seatPositionsInTable = Array.from({length: seatRowCount}, (_, row) => Array.from({length: seatColumnCount}, (_, col) => ({
        row,
        col
    })));

    const tableHeight = squareSize * seatRowCount;
    const tableWidth = squareSize * seatColumnCount;


    // 各テーブルの位置についてループします
    tablePositions.flat().forEach(({row: tableRow, col: tableCol}) => {

        // 各テーブルの各席の位置についてループします
        seatPositionsInTable.flat().forEach(({row: seatRow, col: seatCol}) => {

            // 縦軸の位置を計算します。これには、テーブルの行と席の行のオフセットを含めます。
            let lat = screenHeight - (
                paddingSize / 2 + // 画面の上部のパディング
                squareSize +  // メインテーブルの高さ
                tableRow * tableHeight + // テーブルの行のオフセット
                tableMarginSize / 2 + // 1行目のテーブル上部のマージン
                tableRow * tableMarginSize + //2行目以降のテーブル上部のマージン
                seatRow * squareSize + // 席の行のオフセット
                squareSize / 2
            );

            // 横軸の位置を計算します。これには、テーブルの列と席の列のオフセットを含めます。
            let lng =
                paddingSize / 2 + // 画面の左部のパディング
                tableCol * tableWidth + // テーブルの行のオフセット
                tableMarginSize / 2 + // 1行目のテーブル上部のマージン
                tableCol * tableMarginSize + //2行目以降のテーブル上部のマージン
                seatCol * squareSize + // 席の行のオフセット
                squareSize / 2

            seatPositions.push({id: seatPositions.length + 1, lat, lng});
        });
    });

    return seatPositions;
};
