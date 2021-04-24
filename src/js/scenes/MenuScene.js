/* global Phaser */

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

        // TODO: create a main menu "Play" button
        this.scene.start('MainScene');
    }
}
