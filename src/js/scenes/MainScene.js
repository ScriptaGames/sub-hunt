/* global Phaser */

const consola = require('consola').withTag('MainScene');

export default class MainScene extends Phaser.Scene {

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
    }

    create() {
        consola.info('Create');

        let groundShape = this.cache.json.get('ground-shape');
        this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        // this.add.image(0, 0, 'ground-image').setOrigin(0, 0);

        let ground = this.matter.add.sprite(0, 0, 'ground-image', null, {shape: groundShape.sample_background});
        ground.setPosition(1000 + ground.centerOfMass.x, 1950 + ground.centerOfMass.y);
        // ground.setOrigin(0, 0);

        this.subSprite = this.matter.add.sprite(1000, 300, 'sub-image');

        // this.add.sprite(400, 300, 'propeller').play('propellerAnimation');

        // Fullscreen button
        // TODO: Add this in the right possition
        // const fullscreenButton = this.add.image(800 - 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
        // fullscreenButton.on('pointerup', () => {
        //     if (this.scale.isFullscreen) {
        //         consola.debug('Stop fullscreen');
        //         fullscreenButton.setFrame(0);
        //         this.scale.stopFullscreen();
        //     }
        //     else {
        //         consola.debug('Start fullscreen');
        //         fullscreenButton.setFrame(1);
        //         this.scale.startFullscreen();
        //     }
        // }, this);
    }

    update() {
        // let position = this.subSprite.copyPosition();
        // this.subSprite.setPosition(position.x, position.y + 10)
        this.subSprite.setVelocity(0, 0.5);
    }
}
