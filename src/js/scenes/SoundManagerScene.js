/* global Phaser */

import config from '../config';

export default class SoundManagerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SoundManagerScene', active: true });
    }

    preload() {
        this.load.audio('sub-crash', '../assets/sounds/sub-crash.mp3');
        this.load.audio('lights-on', '../assets/sounds/lights-on.mp3');
        this.load.audio('lights-off', '../assets/sounds/lights-off.mp3');
        this.load.audio('swallow', '../assets/sounds/swallow.mp3');
        this.load.audio('propeller', '../assets/sounds/propeller.mp3');
        this.load.audio('main-music', '../assets/sounds/ld48-ambient-play-music.mp3');
        this.load.audio('bubble1', '../assets/sounds/bubble1.mp3');
        this.load.audio('bubble2', '../assets/sounds/bubble2.mp3');
        this.load.audio('bubble3', '../assets/sounds/bubble3.mp3');
        this.load.audio('whale', '../assets/sounds/whale.mp3');
        this.load.audio('sea-creature1', '../assets/sounds/sea-creature1.mp3');
        this.load.audio('sea-creature2', '../assets/sounds/sea-creature2.mp3');
        this.load.audio('hungry-monster', '../assets/sounds/hungry-monster.mp3');
        this.load.audio('sonar', '../assets/sounds/sonar-ping-short.mp3');
    }

    create() {
        if (config.DISABLE_SOUNDS) return;

        this.miscSounds = [
            this.sound.add('bubble1'),
            this.sound.add('bubble2'),
            this.sound.add('bubble3'),
            this.sound.add('whale'),
            this.sound.add('sea-creature1'),
            this.sound.add('sea-creature2'),
        ];
        this.scene.get('MainScene').time.addEvent({
            delay        : 5000,
            loop         : false,
            callback     : this.playRandomSound,
            callbackScope: this,
        });

        this.subCrash = this.sound.add('sub-crash');
        this.lightsOn = this.sound.add('lights-on');
        this.lightsOff = this.sound.add('lights-off');
        this.swallow = this.sound.add('swallow');
        this.propeller = this.sound.add('propeller');
        this.propeller.play({ loop: true });
        this.bossAttack = this.sound.add('hungry-monster');
        this.sonar = this.sound.add('sonar');

        this.gameScene = this.scene.get('MainScene');
        this.gameScene.events.on('healthChanged', (health) => {
            this.subCrash.play();
            if (health === 0) {
                this.propeller.stop();
            }
        });

        this.gameScene.events.on('lightsOn', () => {
            this.lightsOn.play();
        });

        this.gameScene.events.on('lightsOff', () => {
            this.lightsOff.play();
        });

        this.gameScene.events.on('pickupGlowFish', () => {
            this.swallow.play({ volume: 0.5 });
        });

        this.gameScene.events.on('bossAttack', () => {
            this.bossAttack.play();
        });

        this.gameScene.events.on('ping', () => {
            this.sonar.play();
        });

        this.mainMusic = this.sound.add('main-music');
        this.mainMusic.play({ loop: true, volume: 0.25 });
    }

    playRandomSound() {
        const delay = Phaser.Math.Between(15000, 3000);
        this.scene.get('MainScene').time.addEvent({
            delay        : delay,
            loop         : false,
            callback     : this.playRandomSound,
            callbackScope: this,
        });

        const soundIndex = Phaser.Math.Between(0, this.miscSounds.length - 1);
        this.miscSounds[soundIndex].play();
    }
}
