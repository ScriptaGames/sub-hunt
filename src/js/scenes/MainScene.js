/* global Phaser */

const consola = require('consola').withTag('MainScene');

export default class MainScene extends Phaser.Scene {

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // External assets
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        consola.info('Create');
        this.add.image(400, 300, 'sky');

        const particles = this.add.particles('red');

        const emitter = particles.createEmitter({
            speed    : 100,
            scale    : { start: 1, end: 0 },
            blendMode: 'ADD',
        });

        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);

        // Fullscreen button
        const fullscreenButton = this.add.image(800 - 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
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
    }
}
