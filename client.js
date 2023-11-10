const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const socket = io('https://corsproxy.io/?https://cursordash.schiytu37.repl.co'); // Replace with your Replit server URL

const playerCursors = {};

socket.on('opponentCursorPosition', (data) => {
    // Update opponent cursor positions
    playerCursors[data.id] = data;
});

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render player cursors
    Object.values(playerCursors).forEach(cursor => {
        ctx.fillStyle = cursor.id === socket.id ? 'blue' : 'red'; // Local player is blue, opponents are red (change colors as needed)
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    });

    requestAnimationFrame(update);
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Send cursor position to the server
    socket.emit('cursorPosition', { id: socket.id, x, y });
});

update();