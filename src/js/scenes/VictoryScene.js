/* global Phaser */

import config from '../config';

export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene', active: true });
    }

    create() {
        this.scene.setVisible(false); // hide unless specifically shown

        const victoryText = this.add.text(config.GAME_WIDTH / 2, config.GAME_HEIGHT / 2, 'Victory!', { backgroundColor: '#000' });
        victoryText.x -= victoryText.width / 2;

        const restartButton = this.add.text(config.GAME_WIDTH / 2, victoryText.y + victoryText.height + 20, 'Play Again', { backgroundColor: '#000' });
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
