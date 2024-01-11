const socket = io.connect('ws://localhost:3000', { transports: ["websocket"] });  // Use http instead of ws

socket.emit('clientEvent', { message: 'Test' });

socket.on('serverEvent', (data) => {
    console.log('Server:', data);
});
