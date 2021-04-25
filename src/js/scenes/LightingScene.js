/* global Phaser */
import Sub from '../actors/Sub';

const consola = require('consola').withTag('LightingScene');

export default class LightingScene extends Phaser.Scene {

    constructor() {
        super({ key: 'LightingScene' });
    }

    preload() {
        // External assets
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
    }

    create() {
        consola.info('Create');

        this.darknessLevels = [
            0x999999,
            0x666666,
            0x333333,
            0x111111,
            0x0,
        ];
        this.darknessIndex = 0;

        this.bg = this.add.image(400, 300, 'sky');
        this.bg.setPipeline('Light2D');

        this.lights.enable().setAmbientColor(0xaaaaaa);
        this.sub = new Sub({
            scene: this,
            x    : 300,
            y    : 300,
            key  : 'sub-image',
        });
        this.sub.setPipeline('Light2D');

        this.time.addEvent({
            delay        : 1000,
            loop         : true,
            callback     : this.changeDarkness,
            callbackScope: this,
        });
    }

    changeDarkness() {
        this.darknessIndex = (this.darknessIndex + 1) % this.darknessLevels.length;
        this.lights.setAmbientColor(this.darknessLevels[this.darknessIndex]);
    }
}
