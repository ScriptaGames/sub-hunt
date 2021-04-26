/* global Phaser */

import config from '../config';
const consola = require('consola').withTag('VictoryScene');

export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }

    create() {
        consola.log('Create');

        this.add.image(config.GAME_WIDTH / 2, config.GAME_HEIGHT / 2, 'victory_screen-text-image');

        // Play Button
        this.playButton = this.add.sprite(config.GAME_WIDTH / 2, config.GAME_HEIGHT - 120,
            'button-playagain-20-image');
        this.playButton.setInteractive();
        this.playButton.setScale(0.5);

        this.playButton.on('pointerover', () => {
            this.playButton.setTexture('button-playagain-50-image');
        });

        this.playButton.on('pointerout', () => {
            this.playButton.setTexture('button-playagain-20-image');
        });

        this.playButton.on('pointerup', () => {
            if (this.scene.isVisible()) {
                const gameScene = this.scene.get('MainScene');
                const uiScene = this.scene.get('UIScene');
                this.events.emit('mainGameMusic');
                uiScene.scene.restart();
                gameScene.scene.restart();
                this.hide();
            }
        });

        this.hide(); // hide unless specifically shown
    }

    show() {
        this.playButton.setInteractive();
        this.scene.setVisible(true);
    }

    hide() {
        this.playButton.disableInteractive();
        this.scene.setVisible(false);
    }
}
