/*
global Phaser
*/

import config from './config';
import PreloadScene from 'scenes/PreloadScene';
import MainScene from 'scenes/MainScene';
import MenuScene from 'scenes/MenuScene';
import UIScene from 'scenes/UIScene';
import SoundManagerScene from './scenes/SoundManagerScene';
import GameOverScene from './scenes/GameOverScene';
import VictoryScene from './scenes/VictoryScene';
import InstructionsScene from './scenes/InstructionsScene';
import BackstoryScene from './scenes/BackstoryScene';

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
                default: 'matter',
                matter : {
                    debug  : config.DEBUG,
                    gravity: {
                        y: 0,
                    },
                },
            },
            scene: [PreloadScene, MenuScene, MainScene, UIScene, SoundManagerScene, GameOverScene, VictoryScene,
                InstructionsScene, BackstoryScene],
        };

        super(gameConfig);
    }
}

