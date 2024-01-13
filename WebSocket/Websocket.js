class Websocket {
    constructor(){
        this.socket;
    }

    init(){
        this.socket = io.connect('ws://localhost:3000', { transports: ["websocket"] });

        this.socket.emit('clientEvent', { message: 'Test' });
        this.socket.on('serverEvent', (data) => {
            console.log('Server:', data);
        });
    }

}