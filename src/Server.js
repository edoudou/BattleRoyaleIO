const io = require("socket.io")();
const port = 8000;

var updates = {};
var updates_timestamp = {};

io.on("connection", (client) => {
    client.on("subscribeToUpdate", (interval) => {
        client.emit("authentification", UUID());

        setInterval(() => {
            client.emit("serverUpdate", updates);
        }, interval);
    });

    client.on("clientUpdate", (id, data) => {
        updates[id] = data;
        updates_timestamp[id] = Date.now();
    })
});

io.listen(port);
console.log("Listening on port", port);

setInterval(clearUpdates, 100);

/**
 * Util
 */
function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function clearUpdates() {
    let time = Date.now();

    for(var key in updates_timestamp) {
        if (time - 1000 > updates_timestamp[key]) {
            delete updates[key];
            delete updates_timestamp[key];
        }
    }
}