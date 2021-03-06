class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init() {

    }
    preload() {
        this.load.audio('sfx_select', './Assets/Select.wav');
        this.load.audio('sfx_explosion', './Assets/explosion40.wav');
        this.load.audio('sfx_rocket', './Assets/FIRE.wav');
        this.load.image('title', './Assets/Title.jpg');
    }
    create() {

        this.add.image(0, 0, 'title').setOrigin(0, 0);
        /*let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f3b141',
            color: '#843605',
            altgn: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - (borderUISize + borderPadding), 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (f) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding), 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        */
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                shipSpeed: 6
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                shipSpeed: 8
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }


    }
}