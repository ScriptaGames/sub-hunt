/* global Phaser */

import config from '../config';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        this.gameOverSprite = this.add.sprite(config.GAME_WIDTH / 2, config.GAME_HEIGHT / 2, 'game_over_screen-text-image');

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
                uiScene.scene.restart();
                gameScene.scene.restart();
                this.hide();
            }
        });

        this.hide(); // hide unless specifically shown
    }

    show(deathType) {
        if (deathType === 'rocks') {
            this.gameOverSprite.setTexture('game_over_screen-text-image');
        }
        else if (deathType === 'monster') {
            this.gameOverSprite.setTexture('game_over_screen-text-02-image');
        }

        this.playButton.setInteractive();
        this.scene.setVisible(true);
    }

    hide() {
        this.playButton.disableInteractive();
        this.scene.setVisible(false);
    }
}
