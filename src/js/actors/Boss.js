/* global Phaser */

const consola = require('consola').withTag('Boss');

import gameConfig from '../config';

export default class Boss extends Phaser.GameObjects.GameObject {
    constructor(config) {
        super(config.scene);

        this.sub = config.sub;

        this.reveal = false;
        this.fullyRevealed = false;
        this.revealTick = 0.0;
        this.fullyRevealedTick = gameConfig.BOSS_REVEAL_TIME;

        this.pingTick = 0;
        this.pingInterval = 1000;

        this.trackSub = true;

        this.eyesSprite = config.scene.add.sprite(config.eyes.x, config.eyes.y, config.eyes.key);
        // this.eyesSprite.setScale(2);
        this.eyesSprite.setVisible(false);

        this.face = config.scene.add.sprite(0, 0, 'boss-face');
        // this.face.setScale(2);
        this.face.setVisible(false);
        this.face.setDepth(-100);

        this.subSprite = config.scene.add.sprite(-10, -5, 'sub-image');
        this.subSprite.setDepth(1);
        this.subSprite.setVisible(false);
        this.subSprite.setScale(0.5);

        this.teeth = config.scene.add.sprite(0, 0, 'boss-teeth');
        // this.teeth.setScale(2);
        this.teeth.setVisible(false);
        this.teeth.setDepth(100);

        this.bossContainer = config.scene.add.container(config.x, config.y,
            [this.eyesSprite, this.face, this.subSprite, this.teeth]);

        config.scene.add.existing(this.bossContainer);
    }

    update(delta) {
        if (this.trackSub) {
            this.bossContainer.x = this.sub.subMatterContainer.x;
            this.bossContainer.y = this.sub.subMatterContainer.y;
        }

        if (this.reveal && !this.fullyRevealed) {
            this.revealTick += delta / 1000.0;
            const tint = Phaser.Display.Color.Interpolate.RGBWithRGB(0, 0, 0, 65, 65, 65,
                this.fullyRevealedTick, this.revealTick);
            this.eyesSprite.setTint(Phaser.Display.Color.ValueToColor(tint).color);

            if (this.revealTick >= this.fullyRevealedTick) {
                this.sub.subContainer.setVisible(false);
                this.fullyRevealed = true;
                this.eyesSprite.setTint(0xffffff);
                this.face.setVisible(true);
                this.subSprite.setVisible(true);
                this.teeth.setVisible(true);
                this.face.play('bossFaceAnim');
                this.teeth.play('bossTeethAnim');
                this.trackSub = false;
                this.scene.events.emit('bossAttack');
            }
        }
    }

    setReveal(value) {
        this.eyesSprite.setVisible(value);
        if (!value) {
            this.face.setVisible(false);
            this.teeth.setVisible(false);
        }

        if (!this.reveal && value) {
            if (!this.fullyRevealed) {
                this.eyesSprite.setTint(0x0);
                this.revealTick = 0;
                this.pingTick = 0;
                this.pingInterval = 1000;
                this.scene.time.addEvent({
                    delay        : this.pingInterval,
                    loop         : false,
                    callback     : this.startPings,
                    callbackScope: this,
                });
            }
        }

        this.reveal = value;
    }

    startPings() {
        if (!this.reveal || this.fullyRevealed) return;

        this.scene.time.addEvent({
            delay   : this.pingInterval,
            loop    : false,
            callback: () => {
                this.pingInterval = Phaser.Math.Linear(1000, 100, this.revealTick / this.fullyRevealedTick);
                this.startPings();
            },
            callbackScope: this,
        });

        consola.info('ping');
        this.scene.events.emit('ping');
    }
}
