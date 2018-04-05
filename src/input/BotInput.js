import Input from "../core/Input.js";

class BotInput extends Input {
    updateTime = 0;
    memory = -1;
    directions = ["UP", "RIGHT", "DOWN", "LEFT"];

    constructor(character) {
        super(character);

        this.bind("RIGHT_PRESS", () => { this.character.speed.x -= 5; });
        this.bind("RIGHT_RELEASE", () => { this.character.speed.x += 5; });
        this.bind("LEFT_PRESS", () => { this.character.speed.x += 5; });
        this.bind("LEFT_RELEASE", () => { this.character.speed.x -= 5; });
        this.bind("DOWN_PRESS", () => { this.character.speed.y += 5; });
        this.bind("DOWN_RELEASE", () => { this.character.speed.y -= 5; });
        this.bind("UP_PRESS", () => { this.character.speed.y -= 5; });
        this.bind("UP_RELEASE", () => { this.character.speed.y += 5; });
    }

    loop(delta) {
        this.updateTime += delta;
        if (this.updateTime > 20) {
            this.updateTime = 0;

            let rand = Math.round(Math.random() * 5);
            this.update(rand);
        }
    }

    /**
     * Direction value:
     *   - 0 => UP
     *   - 1 => RIGHT
     *   - 2 => DOWN
     *   - 3 => LEFT
     *   - 4 => PAUSE
     */
    update(direction) {
        if (direction > 4) {
            this.trigger(this.directions[this.memory] + "_RELEASE");
            this.memory = -1;
        }

        if (this.memory >= 0);
            this.trigger(this.directions[this.memory] + "_RELEASE");
        this.trigger(this.directions[direction] + "_PRESS");
        this.memory = direction;
    }
}

export default BotInput;