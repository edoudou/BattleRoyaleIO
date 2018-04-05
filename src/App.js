import React, { Component } from 'react';
import * as PIXI from 'pixi.js'
import './App.css';

import Client from "./network/Client";
import Map from "./core/Map";
import Character from "./core/Character";
import Input from "./core/Input";
import KeyboardInput from "./input/KeyboardInput";
import BotInput from './input/BotInput';
import NetworkInput from './input/NetworkInput';

const app = new PIXI.Application();
const board = require("./config/board.js");

let player;
let player2;
let bot;
let map;
let network;
let network_input;
let bot_input;

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

        network_input = new NetworkInput();
        bot_input = new BotInput(bot);
        let k = new KeyboardInput(player);

        map.setTiles(board);
        network.bind("new_connection", () => {
            let char = new Character(app.stage);
            let ids = network.playerIDs;

            char.setup();
            network_input.add(ids[ids.length-1], char);
        });
        
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
        network_input.update(network.updates);
        network_input.loop(delta);
        
        //let dx = app.renderer.plugins.interaction.mouse.global.x - app.renderer.width / 2;
        //let dy = app.renderer.plugins.interaction.mouse.global.y - app.renderer.height / 2;
        //let theta = Math.atan2(dy, dx);
        
        //player.pixi.rotation = theta;
    }
}

export default App;
