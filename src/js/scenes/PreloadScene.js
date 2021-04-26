/* global Phaser */
import config from '../config';

const consola = require('consola').withTag('PreloadScene');
consola.level = config.LOG_LEVEL;

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        consola.trace('Loading assets..');

        const width = config.GAME_WIDTH;
        const height = config.GAME_HEIGHT;
        const centerX = width / 2;
        const centerY = height / 2;
        const progressBarWidth = 320;
        const progressBarHeight = 50;
        const progressBarX = centerX - (progressBarWidth / 2);
        const progressBarY = centerY - (progressBarHeight / 2);
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

        const loadingText = this.make.text({
            x    : centerX,
            y    : centerY - 50,
            text : 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff',
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x    : centerX,
            y    : centerY,
            text : '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff',
            },
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            const percent = parseInt(value * 100) + '%';
            consola.log('Loading..', percent);
            percentText.setText(percent);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(progressBarX + 10, progressBarY + 10, (progressBarWidth - 20) * value,
                progressBarHeight - 20);
        });

        this.load.on('complete', () => {
            consola.log('Loading complete.');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();

            // Activate sound manager now that all sound files have loaded
            this.scene.start('SoundManagerScene');

            this.scene.start('VictoryScene');
            this.scene.start('GameOverScene');
        });

        // Static images
        this.load.image('ground-image', '../assets/images/ground.png');
        this.load.image('sub-image', '../assets/images/Sub-Base.png');
        this.load.image('sub-loot-image', '../assets/images/Sub_Loot.png');
        this.load.image('sub-damaged-image', '../assets/images/Sub-Base-damaged.png');
        this.load.image('sub-loot-damaged-image', '../assets/images/Sub-Loot-damaged.png');
        this.load.image('wreck-image', '../assets/images/Shipwreck.png');
        this.load.image('loot-image', '../assets/images/Loot.png');
        this.load.image('barge-image', '../assets/images/Barge.png');
        this.load.image('barge-filled-image', '../assets/images/Barge_Filled.png');
        this.load.image('boss-eyes-image', '../assets/images/Boss-Eyes_Only.png');
        this.load.image('title-scene-image', '../assets/images/Sub_Game_Title_Frame-base2.png');
        this.load.image('backstory-image', '../assets/images/backstory.jpg');
        this.load.image('button-instructions-20-image', '../assets/images/button-instructions-20.png');
        this.load.image('button-instructions-50-image', '../assets/images/button-instructions-50.png');
        this.load.image('button-letsgo-20-image', '../assets/images/button-letsgo-20.png');
        this.load.image('button-letsgo-50-image', '../assets/images/button-letsgo-50.png');
        this.load.image('button-mute-image', '../assets/images/button-mute.png');
        this.load.image('button-unmute-image', '../assets/images/button-unmute.png');
        this.load.image('button-play-20-image', '../assets/images/button-play-20.png');
        this.load.image('button-play-50-image', '../assets/images/button-play-50.png');
        this.load.image('button-playagain-20-image', '../assets/images/button-playagain-20.png');
        this.load.image('button-playagain-50-image', '../assets/images/button-playagain-50.png');
        this.load.image('clouds-image', '../assets/images/clouds.png');
        this.load.image('game_over_screen-text-image', '../assets/images/game_over_screen-text.png');
        this.load.image('game_over_screen-text-02-image', '../assets/images/game_over_screen-text-02.png');
        this.load.image('tutorial_screen-image', '../assets/images/tutorial_screen.jpg');
        this.load.image('victory_screen-text-image', '../assets/images/victory_screen-text.png');

        // Sprite sheets
        this.load.spritesheet('fullscreen', '../assets/images/fullscreen-white.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('propeller', '../assets/images/Sub-Prop-sprite-sheet.png', { frameWidth: 56, frameHeight: 26 });
        this.load.spritesheet('glow-fish', '../assets/images/Glow_Fish_Animated-Spritesheet.png', { frameWidth: 220, frameHeight: 114 });
        this.load.spritesheet('bubbles', '../assets/images/Bubbles_Spritesheet.png', { frameWidth: 154, frameHeight: 300 });
        this.load.spritesheet('boss-face', '../assets/images/Boss-Face_Animated-Spritesheet.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('boss-teeth', '../assets/images/Boss-Teeth_Animated-Spritesheet.png', { frameWidth: 256, frameHeight: 256 });

        // Physics shapes
        this.load.json('shapes', 'assets/json/shapes.json');

        // Load Sounds
        this.load.audio('sub-crash', '../assets/sounds/sub-crash.mp3');
        this.load.audio('lights-on', '../assets/sounds/lights-on.mp3');
        this.load.audio('lights-off', '../assets/sounds/lights-off.mp3');
        this.load.audio('swallow', '../assets/sounds/swallow.mp3');
        this.load.audio('propeller', '../assets/sounds/propeller.mp3');
        this.load.audio('main-music', '../assets/sounds/ld48-ambient-play-music.mp3');
        this.load.audio('menu-music', '../assets/sounds/ld48-title-page-music.mp3');
        this.load.audio('bubble1', '../assets/sounds/bubble1.mp3');
        this.load.audio('bubble2', '../assets/sounds/bubble2.mp3');
        this.load.audio('bubble3', '../assets/sounds/bubble3.mp3');
        this.load.audio('whale', '../assets/sounds/whale.mp3');
        this.load.audio('sea-creature1', '../assets/sounds/sea-creature1.mp3');
        this.load.audio('sea-creature2', '../assets/sounds/sea-creature2.mp3');
        this.load.audio('hungry-monster', '../assets/sounds/hungry-monster.mp3');
        this.load.audio('sonar', '../assets/sounds/sonar-ping-short.mp3');
        this.load.audio('win-music', '../assets/sounds/ld48-victory.mp3');
        this.load.audio('lose-music', '../assets/sounds/ld48-gameover.mp3');
    }

    /**
     * Pre-create any static objects that will be used in the game e.g. animations
     */
    create() {
        consola.success('Game loaded');

        // Create animations
        const propAnimConfig = {
            key      : 'propellerAnimation',
            frames   : this.anims.generateFrameNumbers('propeller', { start: 0, end: 3, first: 0 }),
            frameRate: 20,
            repeat   : -1,
        };
        this.anims.create(propAnimConfig);

        const glowFishAnimConfig = {
            key      : 'glowFishAnimation',
            frames   : this.anims.generateFrameNumbers('glow-fish', { start: 0, end: 30, first: 0 }),
            frameRate: 20,
            repeat   : -1,
        };
        this.anims.create(glowFishAnimConfig);

        const bubblesAnimConfig = {
            key      : 'bubblesAnimation',
            frames   : this.anims.generateFrameNumbers('bubbles', { start: 0, end: 30, first: 0 }),
            frameRate: 20,
            repeat   : -1,
        };
        this.anims.create(bubblesAnimConfig);

        const bossFaceAnimConfig = {
            key      : 'bossFaceAnim',
            frames   : this.anims.generateFrameNumbers('boss-face', { start: 0, end: 30, first: 0 }),
            frameRate: 20,
        };
        this.anims.create(bossFaceAnimConfig);

        const bossTeethAnimConfig = {
            key      : 'bossTeethAnim',
            frames   : this.anims.generateFrameNumbers('boss-teeth', { start: 0, end: 30, first: 0 }),
            frameRate: 30,
        };
        this.anims.create(bossTeethAnimConfig);

        this.scene.start('MenuScene');
    }
}
