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
        this.load.image('title-scene-image', '../assets/images/Sub Game Title Frame-base2.png');

        // Sprite sheets
        this.load.spritesheet('fullscreen', '../assets/images/fullscreen-white.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('propeller', '../assets/images/Sub-Prop-sprite-sheet.png', { frameWidth: 56, frameHeight: 26 });
        this.load.spritesheet('glow-fish', '../assets/images/Glow_Fish_Animated-Spritesheet.png', { frameWidth: 220, frameHeight: 114 });
        this.load.spritesheet('bubbles', '../assets/images/Bubbles Spritesheet.png', { frameWidth: 154, frameHeight: 300 });
        this.load.spritesheet('boss-face', '../assets/images/Boss-Face_Animated-Spritesheet.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('boss-teeth', '../assets/images/Boss-Teeth_Animated-Spritesheet.png', { frameWidth: 256, frameHeight: 256 });

        // Physics shapes
        this.load.json('shapes', 'assets/json/shapes.json');
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
