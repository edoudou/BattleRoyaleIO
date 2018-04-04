import openSocket from 'socket.io-client';

/**
 * === Data ===
 * x: Position X
 * y: Position Y
 */

class Client {
    port = 8000;
    socket = null;
    ID = null;
    updates = {};

    constructor(host = "localhost", port = 8000) {
        this.port = port;
        this.socket = openSocket("http://" + host + ":" + port);

        this.socket.on('authentification', (uuid) => {
            this.ID = uuid;
        });

        this.socket.on('serverUpdate', (updates) => { 
            this.updates = updates;
            console.log(this.updates);
        });
        
        this.socket.emit('subscribeToUpdate', 1000);
    }

    update(x, y) {
        this.socket.emit('clientUpdate', this.ID, {x: x, y: y});
    }

}
export default Client;