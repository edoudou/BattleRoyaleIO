import * as PIXI from 'pixi.js';

class Player {

  constructor(resources=null,spriteName=null) {
    if(resources && spriteName){
      this.pixi = new PIXI.Sprite(resources[spriteName].texture);
      this.pixi.anchor.x = 0.5;
      this.pixi.anchor.y = 0.5;

      this.vx = 0;
      this.vy = 0;
      this.x = 250;
      this.y = 250;
    }
  }

  /**
    * Getter for pixi instace
    * format : {}
    */
  get pixiInstance(){
    return this.pixi;
  }

  /**
    * Setter for pixi instace
    * format : {x,y}
    * @param newInstance New instace for the Pixi Object
    */
  set pixiInstance(newInstance){
    this.pixi = newInstance;
  }

  /**
    * Getter for pixiPosition
    * format : {x,y}
    */
  get pixiPosition(){
    return {x:this.pixi.x,y:this.pixi.y};
  }

  /**
    * Setter for pixiPosition
    * format : {x,y}
    * @param newPos New Position of the Pixi Instance
    */
  set pixiPosition(newPos){
    this.pixi.x = newPos.x;
    this.pixi.y = newPos.y;
  }

  /**
    * Getter for Position
    * format : {x,y}
    */
  get position(){
    return this.rotation;
  }

  /**
    * Setter for Rotation
    * format : int(Rad)
    * @param newRot New Rotation
    */
  set position(newRot){
    this.rotation = newRot;
  }

  /**
    * Getter for Position
    * format : {x,y}
    */
  get position(){
    return {x:this.x,y:this.y};
  }

  /**
    * Setter for Position
    * format : {x,y}
    * @param newPos New Position
    */
  set position(newPos){
    this.x = newPos.x;
    this.y = newPos.y;
  }

  get speed(){
    return {x:this.vx,y:this.vy};
  }

  set speed(newSpeed){
    this.vx = newSpeed.x;
    this.vy = newSpeed.y;
  }

  speedChange(dSpeed){
    this.vx += dSpeed.x;
    this.vy += dSpeed.y;

  }

  update(delta){
    if(0 <= this.x + (this.vx * delta) && this.x + (this.vx * delta) <= 500)this.x += this.vx * delta;
    if(0 <= this.y + (this.vy * delta) && this.y + (this.vy * delta) <= 500)this.y += this.vy * delta;
    this.pixi.rotation = this.rotation;
  }
}

export default Player;
