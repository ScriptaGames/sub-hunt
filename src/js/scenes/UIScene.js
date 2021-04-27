/* global Phaser */
const consola = require('consola').withTag('UIScene');
import config from '../config';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        consola.info('Create');

        this.scene.setVisible(false); // hide unless specifically set to visible

        this.gameScene = this.scene.get('MainScene');
        this.gameScene.events.on('lightChargeChanged', (chargeLevel) => {
            this.drawPowerBar(chargeLevel);
        });
        this.gameScene.events.on('healthChanged', (health) => {
            this.drawHealthBar(health);
        });

        // UI
        this.powerBar = this.add.graphics();
        this.healthBar = this.add.graphics();
        this.drawPowerBar(1.0);
        this.drawHealthBar(1.0);
    }

    drawPowerBar(chargeLevel) {
        const x = (config.GAME_WIDTH / 2) - 350;
        const y = config.GAME_HEIGHT - 50;

        const lightIcon = this.add.image(x - 30, y - 10, 'light-icon-image');
        lightIcon.setOrigin(0, 0);
        lightIcon.setScale(0.8);


        this.powerBar.fillStyle(0x555555);
        this.powerBar.fillRect(x, y, 150, 20);
        this.powerBar.fillStyle(0xfffff0);
        this.powerBar.fillRect(x, y, 150 * chargeLevel, 20);
    }

    drawHealthBar(health) {

        const x = (config.GAME_WIDTH / 2) + 200;
        const y = config.GAME_HEIGHT - 50;

        const healthIcon = this.add.image(x - 35, y - 7, 'health-icon-image');
        healthIcon.setOrigin(0, 0);
        healthIcon.setScale(0.8);

        this.powerBar.fillStyle(0x555555);
        this.powerBar.fillRect(x, y, 150, 20);
        this.powerBar.fillStyle(0xfffff0);
        this.powerBar.fillRect(x, y, 150 * health, 20);
    }
}
