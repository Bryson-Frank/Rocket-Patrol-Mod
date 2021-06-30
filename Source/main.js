/*/////////////////////////////////////////////////////////////////////////

Name: Bryson Frank

Project: Rocket Patrol Mod

Date: 6/30/21

Time: 12 hours

---------------------------------------------------------------------------
                            Point Breakdows
--------------------------------------------------------------------------- 
Base game                                                         20

Redesign the game's artwork, UI, and sound to change 
its theme/aesthetic (to something other than sci-fi)            + 60

Create a new spaceship type (w/ new artwork) that's 
smaller, moves faster, and is worth more points                 + 20
                                                               ------
                                                                 100
---------------------------------------------------------------------------

Audio made with Audacity
Base game tutorial and help - Professor Isaac Karth

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