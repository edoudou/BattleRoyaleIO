import * as PIXI from 'pixi.js'
import tileset from '../ressources/tileset_map.png';

class Map {
    sprite = {width: 32, height: 32};
    tileset = {width: 32, height: 32};

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

        let texture = PIXI.utils.TextureCache[tileset];
        let height = this.matrix.length;
        let width = this.matrix[0].length;

        let id, x, y, tile, frame, sprite, tile_texture;
        for(let i in this.matrix){
            for(let j in this.matrix[i]){
                id = this.matrix[i][j];
                x = id % this.tileset.width;
                y = Math.floor(id / this.tileset.width);

                frame = new PIXI.Rectangle(x * this.sprite.width, y * this.sprite.height, this.sprite.width, this.sprite.height);
                tile_texture = new PIXI.Texture(texture, frame);
                sprite = new PIXI.Sprite(tile_texture);

                tile = this.app.stage.addChild(sprite);
                tile.x = j * this.sprite.width;
                tile.y = i * this.sprite.height;
            }
        }
    }
}

export default Map;