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
    online = 0;
    events = {};

    constructor(host = "localhost", port = 8000) {
        this.port = port;
        this.socket = openSocket("http://" + host + ":" + port);

        this.socket.on('authentification', (uuid) => {
            this.ID = uuid;
        });

        this.socket.on('serverUpdate', (updates) => { 
            this.updates = updates;
            delete this.updates[this.ID];
            
            let online = Object.keys(this.updates).length;
            if (online > this.online)
                this.trigger("new_connection");
            else if (online < this.online)
                this.trigger("disconnection");
            this.online = online;
        });
        
        this.socket.emit('subscribeToUpdate', 1000);
    }

    update(x, y) {
        this.socket.emit('clientUpdate', this.ID, {x: x, y: y});
    }

    bind(event_name, callback, parameters = null) {
        this.events[event_name] = {
            callback: callback,
            parameters: parameters
        };
    }

    trigger(event_name) {
        if (!(event_name in this.events))
            return;

        this.events[event_name].callback(this.events[event_name].parameters);
    }

    get playerIDs() {
        return Object.keys(this.updates);
    }
}
export default Client;