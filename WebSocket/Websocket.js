const socket = io.connect('ws://localhost:3000', { transports: ["websocket"] });

socket.emit('clientEvent', { message: 'Test' });

socket.on('serverEvent', (data) => {
    console.log('Server:', data);
});
