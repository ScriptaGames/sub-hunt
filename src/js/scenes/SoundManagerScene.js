/* global Phaser */

import config from '../config';

const consola = require('consola').withTag('SoundManagerScene');

export default class SoundManagerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SoundManagerScene' });
    }

    preload() {
        /* Sounds loaded in PreloadScene for progress bar */
    }

    create() {
        if (config.DISABLE_SOUNDS) return;

        consola.info('Creating Sound Manager');

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
        this.bossAttack = this.sound.add('hungry-monster');
        this.sonar = this.sound.add('sonar');

        this.menuScene = this.scene.get('MenuScene');
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

        this.menuMusic = this.sound.add('menu-music');
        this.menuMusic.play();
        this.mainMusic = this.sound.add('main-music');
        this.menuScene.events.on('mainGameMusic', () => {
            this.menuMusic.stop();
            this.mainMusic.play({ loop: true, volume: 0.25 });
            this.propeller.play({ loop: true });
        });
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
