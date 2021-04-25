const consola = require('consola').withTag('Sub');

export default class Sub extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'glow-fish');
        config.scene.add.existing(this);
    }
}
