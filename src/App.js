import React, { Component } from 'react';
import * as PIXI from 'pixi.js'
import './App.css';

import Map from "./core/Map.js";
import Character from "./core/Character.js";
import Input from "./core/Input.js";
import KeyboardInput from "./input/KeyboardInput.js";

const app = new PIXI.Application();

let player;
let map;

let board =[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

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
        
        map = new Map(app);
        player = new Character(app.stage);
        let k = new KeyboardInput();

        map.setTiles(board);
        player.setInput(k);
        
        PIXI.loader
            .add(map.getTileset())
            .add(player.getTileset())
            .load(function(loader, resources) {
                map.setup();
                player.setup();
            });
        
        
        PIXI.loader
        .load((loader, resources) => {
            // Listen for frame updates
            app.ticker.add(delta => this.gameLoop(delta));
        });
    }
    
    gameLoop = (delta) => {
        player.loop(delta);
        
        //let dx = app.renderer.plugins.interaction.mouse.global.x - app.renderer.width / 2;
        //let dy = app.renderer.plugins.interaction.mouse.global.y - app.renderer.height / 2;
        //let theta = Math.atan2(dy, dx);
        
        //player.pixi.rotation = theta;
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
