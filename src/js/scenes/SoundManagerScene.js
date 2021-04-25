import config from '../config';

export default class SoundManagerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SoundManagerScene', active: true });
    }

    preload() {
        this.load.audio('sub-crash', '../assets/sounds/sub-crash.mp3');
        this.load.audio('lights-on', '../assets/sounds/lights-on.mp3');
        this.load.audio('lights-off', '../assets/sounds/lights-off.mp3');
    }

    create() {
        if (config.DISABLE_SOUNDS) return;

        this.subCrash = this.sound.add('sub-crash');
        this.lightsOn = this.sound.add('lights-on');
        this.lightsOff = this.sound.add('lights-off');

        this.gameScene = this.scene.get('MainScene');
        this.gameScene.events.on('healthChanged', (chargeLevel) => {
            this.subCrash.play();
        });

        this.gameScene.events.on('lightsOn', (chargeLevel) => {
            this.lightsOn.play();
        });

        this.gameScene.events.on('lightsOff', (chargeLevel) => {
            this.lightsOff.play();
        });
    }
}
