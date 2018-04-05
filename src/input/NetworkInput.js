import Input from "../core/Input.js";

class NetworkInput extends Input {
    constructor() {
        super({});
        
        this.bind("UPDATE", (data) => {
            this.character[data.id].position.x = data.x;
            this.character[data.id].position.y = data.y;
        });
    }

    update(updates) {
        for (let key in updates)
            this.trigger("UPDATE", {
                id: key,
                x: updates[key].x,
                y: updates[key].y,
            });
    }

    add(id, character) {
        this.character[id] = character;
    }

    remove(id) {
        delete this.character[id];
    }

    loop(delta) {
        for (let key in this.character) {
            this.character[key].loop(delta);
        }
    }
}
export default NetworkInput;