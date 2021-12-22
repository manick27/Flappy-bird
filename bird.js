const dragonSprite = new Image();
dragonSprite.src = "bird.png";
class Bird {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.orientationWidth = 740;
        this.orientationHeight = 680;
        this.width = this.orientationWidth/20;
        this.heigth = this.orientationHeight/20;
        this.weigth = 1;
        this.frameX = 0;
    }
    update() {
        let curve = Math.sin(angle) * 20;
        if (this.y > canvas.heigth - (this.heigth * 3) + curve) {
            this.y = canvas.heigth - (this.heigth * 3) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weigth;
            
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if (this.y < 0 + this.heigth) {
            this.y = 0 + this.heigth;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.heigth * 3) this.flap();
    }
    draw() {
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.heigth);
        ctx.drawImage(dragonSprite, this.frameX * this.orientationWidth, 0, this.orientationWidth, this.orientationHeight, this.x - 20, this.y - 12, this.width * 1.7, this.heigth * 1.7);
    }
    flap() {
        this.vy -= 2;
        if(this.frameX >= 3) this.frameX = 0;
        else if(this.frameX%2 === 0) this.frameX++;
    }
}
const bird = new Bird();