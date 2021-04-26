/* global Phaser */

import config from '../config';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const gameOverText = this.add.text(config.GAME_WIDTH / 2, config.GAME_HEIGHT / 2, 'Game Over', { backgroundColor: '#000' });
        gameOverText.x -= gameOverText.width / 2;

        this.restartButton = this.add.text(config.GAME_WIDTH / 2, gameOverText.y + gameOverText.height + 20, 'Restart Game', { backgroundColor: '#000' });
        this.restartButton.x -= this.restartButton.width / 2;
        this.restartButton.on('pointerup', () => {
            const gameScene = this.scene.get('MainScene');
            const uiScene = this.scene.get('UIScene');
            uiScene.scene.restart();
            gameScene.scene.restart();
            this.hide();
        });

        this.hide(); // hide unless specifically shown
    }

    show() {
        this.restartButton.setInteractive();
        this.scene.setVisible(true);
    }

    hide() {
        this.restartButton.disableInteractive();
        this.scene.setVisible(false);
    }
}
