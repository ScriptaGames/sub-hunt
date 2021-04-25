export default class SoundManagerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SoundManagerScene', active: true });
    }

    preload() {
        this.load.audio('sub-crash', '../assets/sounds/sub-crash.mp3');
    }

    create() {
        this.subCrash = this.sound.add('sub-crash');
        this.gameScene = this.scene.get('MainScene');
        this.gameScene.events.on('healthChanged', (chargeLevel) => {
            this.subCrash.play();
        });
    }
}
