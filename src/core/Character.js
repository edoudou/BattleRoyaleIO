import * as PIXI from 'pixi.js'
import Input from "./Input.js";
import tileset from '../ressources/tileset_character.png';

class Character {
    sprite = {width: 64, height: 64};
    position = {x: 100, y: 100};
    speed = {x: 0, y: 0};
    anchor = {x: 0.5, y: 0.5};
    size = {width: this.sprite.width, height: this.sprite.height };
    direction = 0;
    mainCamera = false;

    update_display = 0;

    // [START] Testing, to be removed
    pos = 0
    max_pos = 4;
    // [END]

    constructor(camera, mainCamera = false) {
        this.camera = camera;
        this.mainCamera = mainCamera;
    }

    getTileset() {
        return tileset;
    }

    setup() {
        this.texture = new PIXI.Texture(PIXI.TextureCache[tileset]);
        let rectangle = new PIXI.Rectangle(0, 0, this.sprite.width, this.sprite.height);

        this.texture.frame = rectangle;
        let char = new PIXI.Sprite(this.texture);
        char.x = this.position.x;
        char.y = this.position.y;
        char.anchor.x = this.anchor.x;
        char.anchor.y = this.anchor.y;

        this.display = this.camera.addChild(char);
        
    }

    loop(delta) {
        this.position.x += this.speed.x * delta;
        this.position.y += this.speed.y * delta;
        
        this.draw(delta);
    }

    draw(delta) {
        this.update_display += delta;

        if (this.update_display > 5) {
            this.update_display = 0;

            if (this.speed.x != 0 || this.speed.y != 0) {
                this.updateDirection();
                this.pos = (this.pos + 1) % this.max_pos;
                let rectangle = new PIXI.Rectangle(this.pos * this.sprite.width, this.direction * this.sprite.height, this.sprite.width, this.sprite.height);
                this.texture.frame = rectangle
            }
        }

        this.display.x = this.position.x;
        this.display.y = this.position.y;

        if (this.mainCamera) {
            this.camera.pivot.x = this.position.x - window.innerWidth/2;
            this.camera.pivot.y = this.position.y - window.innerHeight/2;
        }
    }

    updateDirection() {
        if (this.speed.y > 0)
            this.direction = 0;
        else if (this.speed.x < 0)
            this.direction = 1;
        else if (this.speed.x > 0)
            this.direction = 2;
        else if (this.speed.y < 0)
            this.direction = 3;
    }
}

export default Character;