class Cursor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.image = new Image();
        this.image.src = 'cursor_1.png';
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.angle = 0;
        this.interpolationFactor = 0.1;
    }

    update(mouseX, mouseY) {
        // Calculate target angle in radians
        const targetAngle = Math.atan2(mouseY - this.y, mouseX - this.x);

        // Interpolate cursor's current position and angle towards the target position and angle
        this.x += (mouseX - this.x) * this.interpolationFactor;
        this.y += (mouseY - this.y) * this.interpolationFactor;

        // Calculate shortest angle difference to smoothly interpolate rotation
        let angleDiff = targetAngle - this.angle;
        angleDiff = ((angleDiff + Math.PI) % (2 * Math.PI)) - Math.PI;

        this.angle += angleDiff * this.interpolationFactor;
    }

    draw() {
        // Draw cursor image rotated based on direction
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
        this.ctx.restore();
    }
}