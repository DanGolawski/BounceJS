class Ball {
    x = 20;
    y = 20;
    radius = 10
    color = 'orange';
    defaultParameters = {
        speed: 5,
        gravity: 7,
        jumpingForce: 14,
        bouncingForce: 9
    }
    speed = 5;
    gravity = 7;
    jumpForce = 14;
    bouncingForce = 9;
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

    isJumping = false;
    isFalling = false;

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
        this.movement = this.mapManager.checkTouchedTilesPermeability(this.x, this.y, this.radius);
    }

    updatePosition() {
        if (this.movement.down && !this.isJumping && !this.isFalling) {
            // let gravity = this.gravity;
            // while (gravity > 0 && this.movement.down) {
            //     this.y += 1;
            //     gravity -= 1;
            //     this.updateMovement();
            // }
            this.handleFalling();
        }

        if (this.movement.up && this.keysPressed.up && !this.isJumping && !this.movement.down) {
            this.handleJumping();
        }

        let distance = this.speed;

        if (this.keysPressed.left) {
            while (distance > 0 && this.movement.left) {
                this.x -= 1;
                distance -= 1;
                this.updateMovement();
            }
        }
        if (this.keysPressed.right) {
            while (distance > 0 && this.movement.right) {
                this.x += 1;
                distance -= 1;
                this.updateMovement();
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

    handleJumping(force) {
        this.isJumping = true;
        let jumpForce = !force ? this.jumpForce : force;
        const jumpInterval = setInterval(() => {
            let counter = jumpForce;
            while (counter > 0 && this.movement.up) {
                this.y -= 1;
                counter--;
                this.updateMovement();
            }
            jumpForce -= 1;
            if (jumpForce <= 0) {
                clearInterval(jumpInterval);
                this.isJumping = false;
            }
        }, 20);
    }

    handleFalling() {
        this.isFalling = true;
        let gravity = 1;
        const fallInterval = setInterval(() => {
            let counter = gravity;
            while (counter > 0 && this.movement.down) {
                this.y += 1;
                counter--;
                this.updateMovement();
            }
            if (gravity < this.gravity) {
                gravity++;
            }
            if (!this.movement.down) {
                clearInterval(fallInterval);
                this.isFalling = false;
                this.handleBouncing();
            }
        }, 20);
    }

    handleBouncing() {
        if (this.keysPressed.up) {
            this.handleJumping()
            this.bouncingForce = this.defaultParameters.bouncingForce;
        }
        else if (this.bouncingForce > 0) {
            this.handleJumping(this.bouncingForce);
            this.bouncingForce -= 3;
        }
        else {
            this.bouncingForce = this.defaultParameters.bouncingForce;
        }
    }
}