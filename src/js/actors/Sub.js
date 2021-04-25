/* global Phaser */

import config from '../config';

const consola = require('consola').withTag('Sub');

export default class Sub extends Phaser.GameObjects.GameObject {
    constructor(config) {
        super(config.scene);

        this.subSprite = config.scene.add.sprite(config.sub.x, config.sub.y, config.sub.key);
        this.subSprite.setPipeline('Light2D');
        this.propSprite = config.scene.add.sprite(config.prop.x, config.prop.y, config.prop.key).play('propellerAnimation');
        this.propSprite.setPipeline('Light2D');

        this.subContainer = config.scene.add.container(config.pos.x, config.pos.y, [this.propSprite, this.subSprite]);

        const colGroup = config.scene.matter.world.nextGroup();
        this.subMatterContainer = config.scene.matter.add.gameObject(this.subContainer, { shape: config.subShape });
        this.subMatterContainer.setScale(0.5, 0.5);
        this.subMatterContainer.setCollisionGroup(colGroup);

        // relative to sprite origin
        this.lightLocation = {
            x: 135 - this.subSprite.width / 2,
            y: 20 - this.subSprite.height / 2,
        };

        this.lightColor = 0xffffff;

        this.lightChargeLevel = 1.0;
        this.health = 1.0;

        config.scene.time.addEvent({
            delay        : 1000,
            loop         : true,
            callback     : this.lightPowerTick,
            callbackScope: this,
        });

        this.createLights(config.scene);
    }

    lightPowerTick() {
        if (this.lightIsOn() && !config.LIGHTS_ALWAYS_ON) {
            this.lightChargeLevel = Phaser.Math.Clamp(this.lightChargeLevel - .1, 0, 1);
            if (this.lightChargeLevel === 0) {
                consola.info('out of power');
                this.toggleLights();
            }
            this.scene.events.emit('lightChargeChanged', this.lightChargeLevel);
        }
    }

    update(keys) {
        if (!this.isDead()) {
            const atSurface = this.subMatterContainer.y < config.SKY_HEIGHT + this.subSprite.height / 2;
            if (keys.W.isDown && !atSurface) {
                this.subMatterContainer.thrustLeft(config.THRUST_POWER);
            }
            if (keys.A.isDown) {
                this.subMatterContainer.thrustBack(config.THRUST_POWER);
                this.flipX('left');
            }
            if (keys.S.isDown) {
                this.subMatterContainer.thrustRight(config.THRUST_POWER);
            }
            if (keys.D.isDown) {
                this.subMatterContainer.thrust(config.THRUST_POWER);
                this.flipX('right');
            }
            const lerpRotation = Phaser.Math.Linear(this.subMatterContainer.rotation, 0, 0.2);

            this.subMatterContainer.setRotation(lerpRotation);

            if (atSurface) {
                this.subMatterContainer.y = config.SKY_HEIGHT + this.subSprite.height / 2;
            }
        }

        this.light.x = this.lightLocation.x + this.subMatterContainer.x;
        this.light.y = this.lightLocation.y + this.subMatterContainer.y;
    }

    flickerLights() {
        consola.info('flicker');
        const delay = Phaser.Math.Between(100, 500);
        this.scene.time.addEvent({
            delay        : delay,
            loop         : false,
            callback     : this.flickerLights,
            callbackScope: this,
        });

        this.toggleLights();
    }

    toggleLights() {
        if (!this.lightIsOn() && this.lightChargeLevel > 0) {
            this.light.setRadius(300);
        }
        else {
            this.light.setEmpty();
        }
    }

    lightIsOn() {
        return !this.light.isEmpty();
    }

    createLights(scene) {
        this.light = scene.lights.addLight(this.lightLocation.x + this.subMatterContainer.x,
            this.lightLocation.y + this.subMatterContainer.y, 300)
            .setColor(this.lightColor).setIntensity(5);
    }

    pickupGlowFish() {
        consola.info('picked up glowfish');
        this.lightChargeLevel = Phaser.Math.Clamp(this.lightChargeLevel + .3, 0, 1);
        this.scene.events.emit('lightChargeChanged', this.lightChargeLevel);
    }

    takeDamage(amount) {
        this.health = Phaser.Math.Clamp(this.health - amount, 0, 1);
        this.scene.events.emit('healthChanged', this.health);
        if (this.health === 0) {
            consola.info('dead');
            this.propSprite.anims.stop();
        }
    }

    isDead() {
        return this.health === 0;
    }

    flipX(direction) {
        if (direction === 'left') {
            this.subMatterContainer.setScale(0.5, 0.5);
        }
        else if (direction === 'right') {
            this.subMatterContainer.setScale(-0.5, 0.5);
        }
    }
}
