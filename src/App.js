import React, { Component } from 'react';
import * as PIXI from 'pixi.js'
import './App.css';

import Client from "./network/Client.js";
import Map from "./core/Map.js";
import Character from "./core/Character.js";
import Input from "./core/Input.js";
import KeyboardInput from "./input/KeyboardInput.js";
import BotInput from './input/BotInput';

const app = new PIXI.Application();
const board = require("./config/board.js");

let player;
let bot;
let map;
let network;

let bot_input = new BotInput();

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
        
        network = new Client();
        map = new Map(app);
        player = new Character(app.stage, true);
        bot = new Character(app.stage);
        let k = new KeyboardInput();

        map.setTiles(board);
        player.setInput(k);
        bot.setInput(bot_input);
        
        PIXI.loader
            .add(map.getTileset())
            .add(player.getTileset())
            .load(function(loader, resources) {
                map.setup();
                player.setup();
                bot.setup();
            });
        
        
        PIXI.loader
        .load((loader, resources) => {
            // Listen for frame updates
            app.ticker.add(delta => this.gameLoop(delta));
        });
    }
    
    gameLoop = (delta) => {
        bot_input.loop(delta);

        bot.loop(delta);
        player.loop(delta);

        network.update(player.position.x, player.position.y);
        
        //let dx = app.renderer.plugins.interaction.mouse.global.x - app.renderer.width / 2;
        //let dy = app.renderer.plugins.interaction.mouse.global.y - app.renderer.height / 2;
        //let theta = Math.atan2(dy, dx);
        
        //player.pixi.rotation = theta;
    }
}

export default App;
