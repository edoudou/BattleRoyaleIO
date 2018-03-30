import React, { Component } from 'react';
import * as PIXI from 'pixi.js'
import './App.css';

import Map from "./core/Map.js";
import Character from "./core/Character.js";
import Input from "./core/Input.js";
import KeyboardInput from "./input/KeyboardInput.js";

import playerSprite from './ressources/player.png';
import tile0 from './ressources/tile0.png';

const app = new PIXI.Application();

let state;
let player = {};
let keys;
let loadedBoard = {};

let board =[[0,0,0,0,0],
[0,0,0,0,0],
[0,0,0,0,0],
[0,0,0,0,0],
[0,0,0,0,0]];

class App extends Component {
    constructor(props) {
        super(props);
        
        
    }
    
    render() {
        return (
            <div className="App">
            <div ref="game"></div>
            </div>
        );
    }
    
    componentDidMount() {
        this.refs.game.appendChild(app.view);
        
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        
        let m = new Map(app);
        let c = new Character(app);
        let k = new KeyboardInput();

        m.setTiles(board);
        c.setInput(k);
        
        PIXI.loader
            .add(m.getTileset())
            .add(c.getTileset())
            .load(function(loader, resources) {
                m.setup();
                c.setup();
            });
        
        
        /*PIXI.loader .add('player', playerSprite)
        .add('tile0', tile0)
        .load((loader, resources) => {
            player.pixi = new PIXI.Sprite(resources.player.texture);
            
            // Setup the position
            player.pixi.x = app.renderer.width / 2;
            player.pixi.y = app.renderer.height / 2;
            player.vx = 0;
            player.vy = 0;
            player.x = 250;
            player.y = 250;
            
            // Rotate around the center
            player.pixi.anchor.x = 0.5;
            player.pixi.anchor.y = 0.5;
            
            // Add to the scene
            app.stage.addChild(player.pixi);
            
            
            keys = {};
            
            keys.right = this.keyboard(39);
            keys.right.press = () => {player.vx +=5};
            keys.right.release  = () => {player.vx -=5};
            
            keys.left = this.keyboard(37);
            keys.left.press = () => {player.vx -=5};
            keys.left.release  = () => {player.vx +=5};
            
            keys.down = this.keyboard(40);
            keys.down.press = () => {player.vy +=5};
            keys.down.release  = () => {player.vy -=5};
            
            keys.up = this.keyboard(38);
            keys.up.press = () => {player.vy -=5};
            keys.up.release  = () => {player.vy +=5};
            
            // Listen for frame updates
            app.ticker.add(delta => this.gameLoop(delta));
        });*/
    }
    
    gameLoop = (delta) => {
        if(0 <= player.x + (player.vx * delta) && player.x + (player.vx * delta) <= 500)player.x += player.vx * delta;
        if(0 <= player.y + (player.vy * delta) && player.y + (player.vy * delta) <= 500)player.y += player.vy * delta;
        
        //loadedBoard.pixi.x = player.pixi.x - player.x;
        //loadedBoard.pixi.y = player.pixi.y - player.y;
        
        let dx = app.renderer.plugins.interaction.mouse.global.x - app.renderer.width / 2;
        let dy = app.renderer.plugins.interaction.mouse.global.y - app.renderer.height / 2;
        let theta = Math.atan2(dy, dx);
        
        player.pixi.rotation = theta;
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

export default App;
