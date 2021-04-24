/* global Phaser */

const consola = require('consola').withTag('MainScene');
import config from '../config';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
    }

    create() {
        consola.info('Create');

        let shapes = this.cache.json.get('shapes');
        this.matter.world.setBounds(0, 0, config.WORLD_WIDTH, config.WORLD_HEIGHT);

        let ground = this.matter.add.sprite(0, 0, 'ground-image', null, {shape: shapes.Trenches_render});
        ground.setPosition(1000 + ground.centerOfMass.x, 1950 + ground.centerOfMass.y);
        // ground.setOrigin(0, 0);

        this.subSprite = this.matter.add.sprite(1000, 300, 'sub-image', null, {shape: shapes.Sub_Base});
        this.subSprite.setScale(0.5, 0.5);
        // this.subSprite.thrustRight(0.05);

        // this.add.sprite(400, 300, 'propeller').play('propellerAnimation');

        // Set up the camera
        this.cameras.main.setBounds(0, 0, config.WORLD_WIDTH, config.WORLD_HEIGHT);
        this.cameras.main.startFollow(this.subSprite, false, 0.05, 0.05);
        this.cameras.main.setZoom(1);

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
        this.subSprite.setVelocity(0, 1);
    }
}
