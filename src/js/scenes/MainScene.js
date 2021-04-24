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

        const shapes = this.cache.json.get('shapes');
        this.matter.world.setBounds(0, 0, config.WORLD_WIDTH, config.WORLD_HEIGHT);

        const ground = this.matter.add.sprite(0, 0, 'ground-image', null, { shape: shapes.Trenches_render });
        ground.setPosition(1000 + ground.centerOfMass.x, 1950 + ground.centerOfMass.y);
        // ground.setOrigin(0, 0);

        this.subSprite = this.matter.add.sprite(1450, 300, 'sub-image', null, { shape: shapes.Sub_Base });
        this.subSprite.setScale(0.5, 0.5);


        this.add.sprite(1300, 350, 'propeller').play('propellerAnimation').setScale(0.5, 0.5);

        // Set up the camera
        this.cameras.main.setBounds(0, 0, config.WORLD_WIDTH, config.WORLD_HEIGHT);
        this.cameras.main.startFollow(this.subSprite, false, 0.05, 0.05);
        // this.cameras.main.setZoom(1);

        // Pointer controls
        this.pointerX = 1000;
        this.pointerY = 300;
        this.input.on('pointermove', (pointer) => {
            // consola.log('pointer:', pointer.x, pointer.y)
            this.pointerX = pointer.x;
            this.pointerY = pointer.y;
        });

        // Fullscreen button
        // TODO: Add this in the right possition
        const fullscreenButton = this.add.image(config.GAME_WIDTH - 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
        fullscreenButton.on('pointerup', () => {
            if (this.scale.isFullscreen) {
                consola.debug('Stop fullscreen');
                fullscreenButton.setFrame(0);
                this.scale.stopFullscreen();
            }
            else {
                consola.debug('Start fullscreen');
                fullscreenButton.setFrame(1);
                this.scale.startFullscreen();
            }
        }, this);

        this.keys = this.input.keyboard.addKeys('W,S,A,D');
    }

    update() {
        const keys = this.keys;
        if (keys.W.isDown) {
            this.subSprite.thrustLeft(config.THRUST_POWER);
        }
        if (keys.A.isDown) {
            this.subSprite.thrustBack(config.THRUST_POWER);
        }
        if (keys.S.isDown) {
            this.subSprite.thrustRight(config.THRUST_POWER);
        }
        if (keys.D.isDown) {
            this.subSprite.thrust(config.THRUST_POWER);
        }
        const lerpRotation = Phaser.Math.Linear(this.subSprite.rotation, 0, 0.2);

        this.subSprite.setRotation(lerpRotation);
    }
}
