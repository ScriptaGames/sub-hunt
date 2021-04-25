
const consola = require('consola').withTag('Sub');

export default class Sub extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);

        this.setOrigin(0, 0);

        // relative to sprite top-left
        this.lightLocation = {
            x: 135,
            y: 20,
        };

        this.lightColor = 0xffffff;

        this.createLights(config.scene);

        config.scene.input.on('pointerdown', (pointer) => {
            if (this.light.isEmpty()) {
                this.light.setRadius(300);
            } else {
                this.light.setEmpty();
            }
        });

        config.scene.input.on('pointermove', (pointer) => {
            this.move(pointer);
        });
    }

    move(location) {
        this.x = location.x;
        this.y = location.y;
        if (this.light) {
            this.light.x = this.lightLocation.x + this.x;
            this.light.y = this.lightLocation.y + this.y;
        }
    }

    createLights(scene) {
        this.light = scene.lights.addLight(this.lightLocation.x + this.x, this.lightLocation.y + this.y, 300).setColor(this.lightColor).setIntensity(2);
    }
}