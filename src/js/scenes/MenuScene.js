/* global Phaser */

import config from '../config';

const consola = require('consola').withTag('MenuScene');

/**
 * MenuScene is the scene of the main menu of the game
 */
export default class MenuScene extends Phaser.Scene {

    /**
     * construct passing the unique key to the game instance
     */
    constructor() {
        super({ key: 'MenuScene' });
    }

    /**
     * Create the games Main Menu
     *
     * @param {object} data generic data to pass between scenes
     */
    create(data) {
        consola.info('Create');

        this.events.emit('mainMenuMusic');

        const titleImage = this.add.image(0, 0, 'title-scene-image');
        titleImage.setOrigin(0, 0);
        titleImage.setScale(.55);


        this.startButton = this.add.text(150, config.GAME_HEIGHT / 2, 'Start Game', { backgroundColor: '#000' });
        this.startButton.x -= this.startButton.width / 2;
        this.startButton.setInteractive();
        this.startButton.on('pointerup', () => {
            this.events.emit('mainGameMusic');
            this.scene.start('MainScene');
        });
    }
}
