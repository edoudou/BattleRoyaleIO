import * as PIXI from 'pixi.js'
import Input from "../core/Input.js";

class KeyboardInput extends Input {
    constructor() {
        super();

        var keys = {};
            
        keys.right = this.keyboard(81); // Q
        keys.right.press = () => {this.trigger("RIGHT_PRESS");};
        keys.right.release  = () => {this.trigger("RIGHT_RELEASE");};
        
        keys.left = this.keyboard(68); // D
        keys.left.press = () => {this.trigger("LEFT_PRESS");};
        keys.left.release  = () => {this.trigger("LEFT_RELEASE")};
        
        keys.down = this.keyboard(83); // S
        keys.down.press = () => {this.trigger("DOWN_PRESS");};
        keys.down.release  = () => {this.trigger("DOWN_RELEASE")};
        
        keys.up = this.keyboard(90); // Z
        keys.up.press = () => {this.trigger("UP_PRESS");};
        keys.up.release  = () => {this.trigger("UP_RELEASE");};
    }

    keyboard = (keyCode) => {
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = event => {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        };
        
        //The `upHandler`
        key.upHandler = event => {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        };
        
        //Attach event listeners
        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
            "keyup", key.upHandler.bind(key), false
        );
        return key;
    }
}

export default KeyboardInput;