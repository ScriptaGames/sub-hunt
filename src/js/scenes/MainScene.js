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

        // Add the Actors to the scene
        const shapes = this.cache.json.get('shapes');
        this.matter.world.setBounds(0, 0, config.WORLD_WIDTH, config.WORLD_HEIGHT);

        const ground = this.matter.add.sprite(0, 0, 'ground-image', null, { shape: shapes.Trenches_render });
        ground.setPosition(1000 + ground.centerOfMass.x, 1950 + ground.centerOfMass.y);

        const subSprite = this.add.sprite(-22, -20, 'sub-image');
        const propSprite = this.add.sprite(82, 36, 'propeller').play('propellerAnimation');
        this.subContainer = this.add.container(1500, 300, [propSprite, subSprite]);
        this.subContainer.setSize(300, 150);
        this.subMatterContainer = this.matter.add.gameObject(this.subContainer, {
            shape: shapes.Sub_Base,
        });
        this.subMatterContainer.setScale(0.5, 0.5);

        // Set up the camera
        this.cameras.main.setBounds(0, 0, config.WORLD_WIDTH, config.WORLD_HEIGHT);
        this.cameras.main.startFollow(this.subMatterContainer, false, 0.05, 0.05);

        // Fullscreen button
        // TODO: Add this in the right position
        // const fullscreenButton = this.add.image(config.GAME_WIDTH - 16, 16, 'fullscreen', 0)
        // .setOrigin(1, 0).setInteractive();
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

        this.keys = this.input.keyboard.addKeys('W,S,A,D');
    }

    update() {
        const keys = this.keys;
        if (keys.W.isDown) {
            this.subMatterContainer.thrustLeft(config.THRUST_POWER);
        }
        if (keys.A.isDown) {
            this.subMatterContainer.thrustBack(config.THRUST_POWER);
        }
        if (keys.S.isDown) {
            this.subMatterContainer.thrustRight(config.THRUST_POWER);
        }
        if (keys.D.isDown) {
            this.subMatterContainer.thrust(config.THRUST_POWER);
        }
        const lerpRotation = Phaser.Math.Linear(this.subMatterContainer.rotation, 0, 0.2);

        this.subMatterContainer.setRotation(lerpRotation);
    }
}
