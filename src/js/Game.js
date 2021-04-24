/*
global Phaser
*/

import config from './config';
import PreloadScene from 'scenes/PreloadScene';
import MainScene from 'scenes/MainScene';
import MenuScene from 'scenes/MenuScene';

export default class Game extends Phaser.Game {

    constructor() {
        const gameConfig = {
            type : Phaser.AUTO,
            scale: {
                mode      : Phaser.Scale.FIT,
                parent    : 'phaser-game',
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width     : config.GAME_WIDTH,
                height    : config.GAME_HEIGHT,
            },
            physics: {
                default: 'arcade',
                arcade : {
                    gravity: { y: config.GRAVITY },
                    debug  : config.DEBUG,
                },
            },
            scene: [PreloadScene, MenuScene, MainScene],
        };

        super(gameConfig);
    }
}

