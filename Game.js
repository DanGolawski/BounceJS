class Game {

    mapManager;
    ball;
    tileSize = 20;
    gravity = 5;

    constructor(context) {
        this.mapManager = new MapManager(context, this.tileSize);
        this.ball = new Ball(context, this.mapManager);
    }

    start(map) {
        this.mapManager.loadMap(map);
        this.ball.handleKeys();
    }

    draw() {
        this.mapManager.drawMap();
        this.ball.draw();
    }

    manage() {
        // this.manageGravity();
        this.ball.manage();
    }

    manageGravity() {
        if (this.stopFalling()) {
            return;
        }
        this.ball.goDown(this.gravity);

    }

    stopFalling() {
        const tileXIdx = Math.floor((this.ball.x + this.ball.radius) / this.tileSize);
        const tileYIdx = Math.round((this.ball.y + this.ball.radius) / this.tileSize);
        const tileType = this.mapManager.map[tileYIdx][tileXIdx];
        const tile = this.mapManager.tiles[tileType];
        return !tile.permeable
    }


}