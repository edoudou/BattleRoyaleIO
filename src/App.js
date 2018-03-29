import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import './App.css';

import Player from './player.js';

import playerSprite from './ressources/player.png';
import tile0 from './ressources/tile0.png';

const app = new PIXI.Application();

let state;
let player;
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
        <header className="App-header">
          <h1 className="App-title">Test PixiJS</h1>
        </header>
        <div ref="game"></div>
      </div>
    );
  }

  componentDidMount() {
    this.refs.game.appendChild(app.view);
    PIXI.loader .add('player', playerSprite)
                .add('tile0', tile0)
                .load((loader, resources) => {

      player = new Player(resources,'player');

      loadedBoard.pixi = new PIXI.Container();
      loadedBoard.pixi.position.x = 0;
      loadedBoard.pixi.position.y = 0;

      for(let i in board){
        for(let j in board[i]){
          if(resources['tile' + board[i][j]]){
            let temp = new PIXI.Sprite(resources['tile' + board[i][j]].texture);
            temp.x = 100*j;
            temp.y = 100*i;
            loadedBoard.pixi.addChild(temp);
          }
        }
      }

      // Setup the position
      player.pixiPosition = {x:app.renderer.width / 2,y:app.renderer.height / 2};

      // Add to the scene
      app.stage.addChild(loadedBoard.pixi);
      app.stage.addChild(player.pixiInstance);


      keys = {};

      keys.right = this.keyboard(39);
      keys.right.press =    () => {player.speedChange({x: 5,y: 0})};
      keys.right.release  = () => {player.speedChange({x:-5,y: 0})};

      keys.left = this.keyboard(37);
      keys.left.press =     () => {player.speedChange({x:-5,y: 0})};
      keys.left.release  =  () => {player.speedChange({x: 5,y: 0})};

      keys.down = this.keyboard(40);
      keys.down.press =     () => {player.speedChange({x: 0,y: 5})};
      keys.down.release  =  () => {player.speedChange({x: 0,y:-5})};

      keys.up = this.keyboard(38);
      keys.up.press =       () => {player.speedChange({x: 0,y:-5})};
      keys.up.release  =    () => {player.speedChange({x: 0,y: 5})};

      // Listen for frame updates
      app.ticker.add(delta => this.gameLoop(delta));
    });
  }

  gameLoop = (delta) => {
    let mainPlayerPos = player.position, mainPlayerPixiPos = player.pixiPosition;
    loadedBoard.pixi.x = mainPlayerPixiPos.x - mainPlayerPos.x;
    loadedBoard.pixi.y = mainPlayerPixiPos.y - mainPlayerPos.y;

    let dx = app.renderer.plugins.interaction.mouse.global.x - app.renderer.width / 2;
    let dy = app.renderer.plugins.interaction.mouse.global.y - app.renderer.height / 2;
    let theta = Math.atan2(dy, dx);

    player.rotation = theta;

    player.update(delta);
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
