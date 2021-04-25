import config from '../config';

const consola = require('consola').withTag('Sub');

export default class Sub extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, config.key, config.frame, config.options);
        config.scene.add.existing(this);

        // relative to sprite origin
        this.lightLocation = {
            x: 135 - this.originX * this.width,
            y: 20 - this.originY * this.height,
        };

        this.lightColor = 0xffffff;

        this.createLights(config.scene);
    }

    update(keys) {
        if (keys.W.isDown) {
            this.thrustLeft(config.THRUST_POWER);
        }
        if (keys.A.isDown) {
            this.thrustBack(config.THRUST_POWER);
        }
        if (keys.S.isDown) {
            this.thrustRight(config.THRUST_POWER);
        }
        if (keys.D.isDown) {
            this.thrust(config.THRUST_POWER);
        }
        const lerpRotation = Phaser.Math.Linear(this.rotation, 0, 0.2);

        this.setRotation(lerpRotation);

        this.light.x = this.lightLocation.x + this.x;
        this.light.y = this.lightLocation.y + this.y;
    }

    toggleLights() {
        if (this.light.isEmpty()) {
            this.light.setRadius(300);
        }
        else {
            this.light.setEmpty();
        }
    }

    createLights(scene) {
        this.light = scene.lights.addLight(this.lightLocation.x + this.x, this.lightLocation.y + this.y, 300)
            .setColor(this.lightColor).setIntensity(2);
    }
}
