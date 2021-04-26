/* global Phaser */

import config from '../config';

export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene', active: true });
    }

    create() {
        const victoryText = this.add.text(config.GAME_WIDTH / 2, config.GAME_HEIGHT / 2, 'Victory!', { backgroundColor: '#000' });
        victoryText.x -= victoryText.width / 2;

        this.restartButton = this.add.text(config.GAME_WIDTH / 2, victoryText.y + victoryText.height + 20, 'Play Again', { backgroundColor: '#000' });
        this.restartButton.x -= this.restartButton.width / 2;
        this.restartButton.on('pointerup', () => {
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

    show() {
        this.restartButton.setInteractive();
        this.scene.setVisible(true);
    }

    hide() {
        this.restartButton.disableInteractive();
        this.scene.setVisible(false);
    }
}
