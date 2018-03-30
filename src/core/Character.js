import * as PIXI from 'pixi.js'
import Input from "./Input.js";
import tileset from '../ressources/tileset_character.png';

class Character {
    sprite = {width: 64, height: 64};
    x = 0;
    y = 0;
    width = this.sprite.width;
    height = this.sprite.height;

    // [START] Testing, to be removed
    pos = 0
    max_pos = 4;
    // [END]

    constructor(app) {
        this.app = app;
    }

    getTileset() {
        return tileset;
    }

    move(_this) {
        _this.pos = (_this.pos + 1) % _this.max_pos;
        let rectangle = new PIXI.Rectangle(_this.pos * _this.sprite.width, 0, _this.sprite.width, _this.sprite.height);
        _this.texture.frame = rectangle
        _this.display = new PIXI.Sprite(_this.texture);
    }

    setup() {
        this.texture = PIXI.TextureCache[tileset];
        let rectangle = new PIXI.Rectangle(0, 0, this.sprite.width, this.sprite.height);

        this.texture.frame = rectangle;
        let char = new PIXI.Sprite(this.texture);

        this.display = this.app.stage.addChild(char);
    }

    setInput(input) {
        if (!(input instanceof Input))
            return;

        this.input = input;
        input.bind("DOWN_PRESS", this.move, this);
    }
}

export default Character;