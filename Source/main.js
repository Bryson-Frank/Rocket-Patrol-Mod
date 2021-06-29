/*/////////////////////////////////////////////////////////////////////////

Name: Bryson Frank

Project: Rocket Patrol Mod

Date: 6/25/21

Time: 6 + 3 + 

/////////////////////////////////////////////////////////////////////////*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
  }

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding= borderUISize / 3;

// keyboard
let keyF, keyR, keyLEFT, keyRIGHT;