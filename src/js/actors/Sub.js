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

        this.subMatterContainer = config.scene.matter.add.gameObject(this.subContainer, { shape: config.subShape });
        this.subMatterContainer.setScale(0.5, 0.5);

        // relative to sprite origin
        this.lightLocation = {
            x: 135 - this.subSprite.width / 2,
            y: 20 - this.subSprite.height / 2,
        };

        this.lightColor = 0xffffff;

        this.createLights(config.scene);
    }

    update(keys) {
        if (keys.W.isDown) {
            this.subMatterContainer.thrustLeft(config.THRUST_POWER);
        }
        if (keys.A.isDown) {
            this.subMatterContainer.thrustBack(config.THRUST_POWER);
        }
        if (keys.S.isDown) {
            this.subMatterContainer.thrustRight(config.THRUST_POWER);
        }
        if (keys.D.isDown) {
            this.subMatterContainer.thrust(config.THRUST_POWER);
        }
        const lerpRotation = Phaser.Math.Linear(this.subMatterContainer.rotation, 0, 0.2);

        this.subMatterContainer.setRotation(lerpRotation);

        this.light.x = this.lightLocation.x + this.subMatterContainer.x;
        this.light.y = this.lightLocation.y + this.subMatterContainer.y;
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
        this.light = scene.lights.addLight(this.lightLocation.x + this.subMatterContainer.x,
            this.lightLocation.y + this.subMatterContainer.y, 300)
            .setColor(this.lightColor).setIntensity(5);
    }
}
