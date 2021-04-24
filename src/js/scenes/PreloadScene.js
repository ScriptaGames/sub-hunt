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
        this.load.image('ground-image', '../assets/images/sample_background.png');
        this.load.image('sub-image', '../assets/images/Sub-Base.png');

        // Sprite sheets
        this.load.spritesheet('fullscreen', '../assets/images/fullscreen-white.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('propeller', '../assets/images/Sub-Prop-sprite-sheet.png', { frameWidth: 56, frameHeight: 26 })

        // Physics shapes
        this.load.json('ground-shape', 'assets/json/ground-shape.json');
    }

    /**
     * Pre-create any static objects that will be used in the game e.g. animations
     */
    create() {
        consola.success('Game loaded');

        // Create animations
        let config = {
            key: 'propellerAnimation',
            frames: this.anims.generateFrameNumbers('propeller', {start: 0, end: 3, first: 0}),
            frameRate: 20,
            repeat: -1
        };

        this.anims.create(config);

        this.scene.start('MenuScene');
    }
}
