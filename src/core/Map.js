import * as PIXI from 'pixi.js'
import tileset from '../ressources/tileset_map.png';

class Map {
    sprite = {width: 100, height: 100};

    constructor(app) {
        this.app = app;

        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    setTiles(matrix) {
        this.matrix = matrix;
    }

    getTileset() {
        return tileset;
    }

    setup() {
        if (this.matrix == null || !Array.isArray(this.matrix) || !Array.isArray(this.matrix[0]))
            return;

        let texture = PIXI.TextureCache[tileset];
        let height = this.matrix.length;
        let width = this.matrix[0].length;

        for(let i in this.matrix){
            for(let j in this.matrix[i]){
                let id = this.matrix[i][j];
                let x = id % width;
                let y = Math.floor(id / width);

                let rectangle = new PIXI.Rectangle(x * this.sprite.width, y * this.sprite.height, this.sprite.width, this.sprite.height);
                texture.frame = rectangle;

                let tile = new PIXI.Sprite(texture);
                tile.x = j * this.sprite.width;
                tile.y = i * this.sprite.width;

                this.app.stage.addChild(tile);
            }
        }
    }
}

export default Map;