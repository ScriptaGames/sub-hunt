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
        this.load.spritesheet('fullscreen', '../assets/images/fullscreen-white.png', { frameWidth: 64, frameHeight: 64 });
    }

    /**
     * Pre-create any static objects that will be used in the game e.g. animations
     */
    create() {
        consola.success('Game loaded');
        this.scene.start('MenuScene');
    }
}
