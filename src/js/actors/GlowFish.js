/* global Phaser */
// const consola = require('consola').withTag('GlowFish');

export default class GlowFish extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'glow-fish');
        config.scene.add.existing(this);
    }
}
