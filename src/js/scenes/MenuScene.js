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

        // Play Button
        this.playButton = this.add.sprite(config.GAME_WIDTH / 2, config.GAME_HEIGHT - 100, 'button-play-20-image');
        this.playButton.setInteractive();
        this.playButton.setScale(0.5);

        this.playButton.on('pointerover', () => {
            this.playButton.setTexture('button-play-50-image');
        });

        this.playButton.on('pointerout', () => {
            this.playButton.setTexture('button-play-20-image');
        });

        this.playButton.on('pointerup', () => {
            this.events.emit('mainGameMusic');
            this.scene.start('MainScene');
        });

        // Instructions Button
        this.instructionsButton = this.add.sprite(config.GAME_WIDTH / 2, config.GAME_HEIGHT - 50, 'button-instructions-20-image');
        this.instructionsButton.setInteractive();
        this.instructionsButton.setScale(0.5);

        this.instructionsButton.on('pointerover', () => {
            this.instructionsButton.setTexture('button-instructions-50-image');
        });

        this.instructionsButton.on('pointerout', () => {
            this.instructionsButton.setTexture('button-instructions-20-image');
        });

        this.instructionsButton.on('pointerup', () => {
            this.scene.start('InstructionsScene');
        });

        // Mute Button
        this.soundActive = true;
        this.muteButton = this.add.sprite(config.GAME_WIDTH - 50, config.GAME_HEIGHT - 50, 'button-unmute-image');
        this.muteButton.setInteractive();
        this.muteButton.setScale(0.7);

        this.muteButton.on('pointerup', () => {
            if (this.soundActive) {
                this.muteButton.setTexture('button-mute-image');
                // this.scene.setActive(false, 'SoundManagerScene');
                this.game.sound.mute = true;
                this.soundActive = false;
            }
            else {
                this.muteButton.setTexture('button-unmute-image');
                // this.scene.setActive(true, 'SoundManagerScene');
                this.game.sound.mute = false;
                this.soundActive = true;
            }
        });
    }
}
