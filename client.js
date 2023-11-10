const canvas = document.getElementById('gameCanvas');
const cursor = new Cursor(canvas);
const opponentCursor = new OpponentCursor(canvas);

// Hide the actual cursor
canvas.style.cursor = 'none';
const socket = io('https://cursordash.schiytu37.repl.co/');

// Update cursor position and direction based on mouse movement
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Emit the cursor position and angle to the server using socket.emit()
    socket.emit('cursorPosition', { x: mouseX, y: mouseY, angle: cursor.angle });

    cursor.update(mouseX, mouseY);
});

// Listen for opponent cursor data from the socket and update opponent's cursor
socket.on('opponentCursorPosition', (data) => {
    opponentCursor.update(data);
});

// Main game loop
function gameLoop() {
    // Clear canvas
    cursor.ctx.clearRect(0, 0, cursor.canvas.width, cursor.canvas.height);

    // Draw player's cursor
    cursor.draw();

    // Draw opponent's cursor
    opponentCursor.draw();

    // Request animation frame for the next loop iteration
    requestAnimationFrame(gameLoop);
}

// Start the game loop after the cursor images are loaded
cursor.image.onload = () => {
    opponentCursor.image.onload = () => {
        gameLoop();
    };
};