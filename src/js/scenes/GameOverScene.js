/* global Phaser */

import config from '../config';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene', active: true });
    }

    create() {
        this.scene.setVisible(false); // hide unless specifically shown

        const gameOverText = this.add.text(config.GAME_WIDTH / 2, config.GAME_HEIGHT / 2, 'Game Over', { backgroundColor: '#000' });
        gameOverText.x -= gameOverText.width / 2;

        const restartButton = this.add.text(config.GAME_WIDTH / 2, gameOverText.y + gameOverText.height + 20, 'Restart Game', { backgroundColor: '#000' });
        restartButton.x -= restartButton.width / 2;
        restartButton.setInteractive();
        restartButton.on('pointerup', () => {
            const gameScene = this.scene.get('MainScene');
            const uiScene = this.scene.get('UIScene');
            uiScene.scene.restart();
            gameScene.scene.restart();
            this.scene.setVisible(false);
        });
    }
}
