/* global Phaser */
const consola = require('consola').withTag('UIScene');

export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
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
        this.powerBar.fillStyle(0x555555);
        this.powerBar.fillRect(10, 10, 50, 20);
        this.powerBar.fillStyle(0xffff00);
        this.powerBar.fillRect(10, 10, 50 * chargeLevel, 20);
    }

    drawHealthBar(health) {
        this.powerBar.fillStyle(0x555555);
        this.powerBar.fillRect(10, 40, 50, 20);
        this.powerBar.fillStyle(0xff0000);
        this.powerBar.fillRect(10, 40, 50 * health, 20);
    }
}
