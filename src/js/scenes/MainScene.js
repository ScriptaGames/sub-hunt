/* global Phaser */

const consola = require('consola').withTag('MainScene');
import config from '../config';

import Sub from '../actors/Sub';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
    }

    create() {
        consola.info('Create');

        this.lights.enable().setAmbientColor(0x111111);

        // Add the Actors to the scene
        const shapes = this.cache.json.get('shapes');
        this.matter.world.setBounds(0, 0, config.WORLD_WIDTH, config.WORLD_HEIGHT);

        const ground = this.matter.add.sprite(0, 0, 'ground-image', null, { shape: shapes.Trenches_render });
        ground.setPosition(1000 + ground.centerOfMass.x, 1950 + ground.centerOfMass.y);
        ground.setPipeline('Light2D');

        this.sub = new Sub({
            scene: this,
            sub  : {
                x  : -22,
                y  : -20,
                key: 'sub-image',
            },
            prop: {
                x  : 82,
                y  : 36,
                key: 'propeller',
            },
            pos     : { x: 1500, y: 300 },
            subShape: shapes.Sub_Base,
        });

        // Set up the camera
        this.cameras.main.setBounds(0, 0, config.WORLD_WIDTH, config.WORLD_HEIGHT);
        this.cameras.main.startFollow(this.sub.subMatterContainer, false, 0.05, 0.05);

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

        this.input.on('pointerdown', (pointer) => {
            this.sub.toggleLights();
        });

        this.keys = this.input.keyboard.addKeys('W,S,A,D');
    }

    update() {
        this.sub.update(this.keys);
    }
}
