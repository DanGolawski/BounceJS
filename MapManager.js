class MapManager {

    map;
    tiles;
    context;
    tileSize;


    constructor(context, tileSize) {
        this.context = context;
        this.tileSize = tileSize;
    }

    loadMap(map) {
        this.tiles = map.tiles;
        this.map = map.data;
    }

    drawMap() {
        this.map.forEach((row, rowIdx) => {
            row.forEach((tileType, tileIdx) => {
                this.drawTile(tileIdx, rowIdx, tileType);
            })
        })
    }

    drawTile(x, y, type) {
        const color = this.tiles[type].color
        this.context.fillStyle = color;
        const xPos = x * this.tileSize;
        const yPos = y * this.tileSize;
        this.context.fillRect(xPos, yPos, this.tileSize, this.tileSize);
    }

    checkTouchedTilesPermeability(objX, objY, offset) {
        const leftTileIdxX = Math.round((objX - offset - 1) / this.tileSize);
        const rightTileIdxX = Math.round((objX + offset + 1) / this.tileSize);
        const horizontalTilesIdxY = Math.round(objY / this.tileSize);

        const upTileIdxY = Math.round((objY - offset - 1) / this.tileSize);
        const downTileIdxY = Math.round((objY + offset + 1) / this.tileSize);
        const verticalTilesIdxX = Math.round(objX / this.tileSize);

        const z = {
            left: this.getTilePermeability(leftTileIdxX, horizontalTilesIdxY),
            right: this.getTilePermeability(rightTileIdxX, horizontalTilesIdxY),
            up: this.getTilePermeability(verticalTilesIdxX, upTileIdxY),
            down: this.getTilePermeability(verticalTilesIdxX, downTileIdxY)
        }
        return z;
    }

    getTilePermeability(x, y) {
        const tileIdx = this.map[y][x];
        return typeof tileIdx === 'undefined' ? false : this.tiles[tileIdx].permeable;
    }
}