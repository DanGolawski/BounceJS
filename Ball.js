class Ball {
    x = 20;
    y = 20;
    radius = 10
    color = 'orange';
    speed = 5;
    gravity = 7;
    context;
    keysPressed = {
        left: false,
        right: false,
        up: false
    }
    movement = {
        left: true,
        right: true,
        up: true,
        down: true
    }
    mapManager;

    constructor(context, mapManager) {
        this.context = context;
        this.mapManager = mapManager;
        // this.movement = this.updateMovement();
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.setPos(this.x), this.setPos(this.y), this.radius, 0, Math.PI * 2);
        this.context.fill();
    }

    manage() {
        this.updatePosition()
    }

    setPos(val) {
        return val + this.radius;
    }

    updateMovement() {
        return this.movement = this.mapManager.checkTouchedTilesPermeability(this.x, this.y, this.radius);
    }

    updatePosition() {
        if (this.movement.down) {
            let gravity = this.gravity;
            while (gravity > 0 && this.movement.down) {
                this.y += 1;
                gravity -= 1;
                this.movement = this.updateMovement();
            }
        }

        let distance = this.speed;

        if (this.keysPressed.left) {
            while (distance > 0 && this.movement.left) {
                this.x -= 1;
                distance -= 1;
                this.movement = this.updateMovement();
            }
        }
        if (this.keysPressed.right) {
            while (distance > 0 && this.movement.right) {
                this.x += 1;
                distance -= 1;
                this.movement = this.updateMovement();
            }
        }
    }

    handleKeys() {
        document.addEventListener('keydown', event => {
            this.move(event, true);
        });
        document.addEventListener('keyup', event => {
            this.move(event, false);
        });
    }

    move(key, keydown) {
        if (key.key === 'ArrowLeft') {
            this.keysPressed.left = keydown;
        }
        if (key.key === 'ArrowRight') {
            this.keysPressed.right = keydown;
        }
        if (key.key === 'ArrowUp') {
            this.keysPressed.up = keydown;
        }
    }
}