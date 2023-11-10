class OpponentCursor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.image = new Image();
        this.image.src = 'cursor_1.png'; // Replace 'opponent_cursor.png' with the actual image source for the opponent's cursor
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.angle = 0;
    }

    update(data) {
        // Update cursor position and angle based on data received from the socket
        this.x = data.x;
        this.y = data.y;
        this.angle = data.angle;
    }

    draw() {
        // Draw opponent's cursor image rotated based on direction
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
        this.ctx.restore();
    }
}