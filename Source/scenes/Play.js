class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('rocket', './Assets/Torpedo.png');
        this.load.image('spaceship', './Assets/Ship1.png');
        this.load.image('carrier', './Assets/Ship2.png');
        this.load.image('starfield', './Assets/Waves-01.png');
        this.load.spritesheet('explosion', './Assets/Sink.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    
    create() {
        this.add.text(20, 20, "Rocket Patrol Play");

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //green ui background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        //white top bar
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xc2b280).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xc2b280).setOrigin(0,0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0x283577).setOrigin(0,0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x283577).setOrigin(0,0);

        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - (borderUISize + borderPadding), 'rocket').setOrigin(0.5, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);
        this.ship04 = new Spaceship(this, game.config.width - borderUISize * 3,  borderUISize * 7 + borderPadding * 6, 'carrier', 0, 50).setOrigin(0, 0);
        this.ship04.moveSpeed *= 2;
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({key: 'explode', frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}), frameRate: 30});
        
        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'OCEAN',
            fontSize: '28px',
            backgroundColor: '#8b98d1',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderPadding + borderUISize, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        this.gameOver = false

        //play clock
        scoreConfig.fixedWidth = 0,
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (r) to Resart or <- for the Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }
    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('menuScene');
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        //check collision
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }
    checkCollision(rocket, ship) {
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.y + rocket.height > ship.y) {
            return true;
        }
        return false;
    }
    shipExplode(ship) {
        ship.alpha = 0; //hide ship
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        this.sound.play('sfx_explosion');
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //update score
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
}