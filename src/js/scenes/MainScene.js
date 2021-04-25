/* global Phaser */

const consola = require('consola').withTag('MainScene');
import config from '../config';

import Sub from '../actors/Sub';
// import GlowFish from '../actors/GlowFish';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
    }

    create() {
        consola.info('Create');

        this.lights.enable().setAmbientColor(0x111111);

        const sky = this.add.graphics();
        sky.fillStyle(0x99ccff);
        sky.fillRect(0, 0, config.WORLD_WIDTH, config.SKY_HEIGHT);

        // Add the Actors to the scene
        this.shapes = this.cache.json.get('shapes');
        this.matter.world.setBounds(0, 0, config.WORLD_WIDTH, config.WORLD_HEIGHT);

        const ground = this.matter.add.sprite(0, 0, 'ground-image', null,
            { shape: this.shapes.ground });

        this.bubbles = [];
        for (let i = 0; i < 10; i++) {
            this.generateBubbles(200, 1800, 200, 1000);
        }
        this.time.addEvent({
            delay        : 2000,
            loop         : true,
            callback     : this.generateBubbles,
            callbackScope: this,
        });

        ground.setPosition(976 + ground.centerOfMass.x, 1820 + ground.centerOfMass.y);
        ground.setPipeline('Light2D');

        this.sub = new Sub({
            scene: this,
            sub  : {
                x  : -22,
                y  : -20,
                key: 'sub-image',
            },
            prop: {
                x  : 82,
                y  : 36,
                key: 'propeller',
            },
            pos     : { x: 1500, y: 300 },
            subShape: this.shapes.Sub_Base,
        });

        this.glowFishGroup = this.matter.world.nextGroup(true);
        for (let i = 0; i < 10; i++) {
            const x = Phaser.Math.Between(200, 1500);
            const y = Phaser.Math.Between(config.SKY_HEIGHT + 50, 300);
            const startFrame = Phaser.Math.Between(0, 30);
            const glowFish = this.matter.add.sprite(x, y, 'glow-fish').play({ key: 'glowFishAnimation', startFrame });
            glowFish.setCollisionGroup(this.glowFishGroup);
            glowFish.setScale(0.25, 0.25);
            glowFish.setPipeline('Light2D');
            glowFish.directionX = Phaser.Math.Between(-1, 1);
            if (glowFish.directionX === 0) {
                glowFish.directionX = -1;
            }
        }

        // Place Shipwreck and loot
        this.createShipwreckLoot();

        // Collision checks
        this.matter.world.on('collisionstart', (event, a, b) => {
            if ((a.gameObject === this.sub.subMatterContainer && b.collisionFilter.group === this.glowFishGroup) ||
                (b.gameObject === this.sub.subMatterContainer && a.collisionFilter.group === this.glowFishGroup)) {
                this.sub.pickupGlowFish();
                if (a.collisionFilter.group === this.glowFishGroup) {
                    a.gameObject.destroy();
                }
                else {
                    b.gameObject.destroy();
                }
            }
            else if (a.parent.label === 'loot') {
                this.collectLoot(a);
            }
            else if (b.parent.label === 'loot') {
                this.collectLoot(b);
            }
        });

        // Set up the camera
        this.cameras.main.setBounds(0, 0, config.WORLD_WIDTH, config.WORLD_HEIGHT);
        this.cameras.main.startFollow(this.sub.subMatterContainer, false, 0.05, 0.05);
        this.cameras.main.setBackgroundColor(0x004080);

        // Fullscreen button
        // TODO: Add this in the right position
        // const fullscreenButton = this.add.image(config.GAME_WIDTH - 16, 16, 'fullscreen', 0)
        // .setOrigin(1, 0).setInteractive();
        // fullscreenButton.on('pointerup', () => {
        //     if (this.scale.isFullscreen) {
        //         consola.debug('Stop fullscreen');
        //         fullscreenButton.setFrame(0);
        //         this.scale.stopFullscreen();
        //     }
        //     else {
        //         consola.debug('Start fullscreen');
        //         fullscreenButton.setFrame(1);
        //         this.scale.startFullscreen();
        //     }
        // }, this);

        this.input.on('pointerdown', (pointer) => {
            this.sub.toggleLights();
        });

        this.keys = this.input.keyboard.addKeys('W,S,A,D');
    }

    generateBubbles(minX = 200, maxX = 1800, minY = 2000, maxY = 3000) {
        const x = Phaser.Math.Between(minX, maxX);
        const y = Phaser.Math.Between(minY, maxY);

        const frameRate = Phaser.Math.Between(5, 30);
        const bubble = this.add.sprite(x, y, 'bubbles').play({ key: 'bubblesAnimation', frameRate });
        bubble.setScale(.25, .25);
        bubble.setPipeline('Light2D');
        bubble.setOrigin(0, 0);
        bubble.tint = 0x001a33;
        this.bubbles.push(bubble);
    }

    update(time, delta) {
        this.sub.update(this.keys);

        this.setAmbientColor();

        this.bubbles.forEach((bubble, index, object) => {
            bubble.y -= 50 * delta / 1000;
            if (bubble.y < config.SKY_HEIGHT) {
                bubble.destroy();
                object.splice(index, 1);
            }
        });

        this.matter.world.getAllBodies().forEach((body) => {
            if (body.collisionFilter.group === this.glowFishGroup) {
                body.gameObject.setVelocityX(.5 * body.gameObject.directionX);
                body.gameObject.flipX = body.gameObject.directionX < 0;

                if (body.gameObject.x < 100) {
                    body.gameObject.directionX = 1;
                }
                else if (body.gameObject.x > 1800) {
                    body.gameObject.directionX = -1;
                }
            }
        });
    }

    setAmbientColor() {
        const lightAmbient = Phaser.Display.Color.HexStringToColor('0x0066cc');
        const darkAmbient = Phaser.Display.Color.HexStringToColor('0x0');

        const maxDarkDepth = 2500;
        const subDepth = Phaser.Math.Clamp(this.sub.subMatterContainer.y, 0, maxDarkDepth);

        const newAmbient = Phaser.Display.Color.Interpolate.ColorWithColor(lightAmbient, darkAmbient,
            maxDarkDepth, subDepth);
        const newAmbientNumber = Phaser.Display.Color.ValueToColor(newAmbient).color;
        this.lights.setAmbientColor(newAmbientNumber);
        this.cameras.main.setBackgroundColor(newAmbient);
    }

    createShipwreckLoot() {
        const lootImage = this.matter.add.image(315, 2880, 'loot-image', null,
            { shape: this.shapes.Loot, label: 'loot' });

        lootImage.setScale(0.5, 0.5);
        lootImage.setPipeline('Light2D');

        const wreckImage = this.add.image(275, 2880, 'wreck-image');
        wreckImage.setScale(0.5, 0.5);
        wreckImage.setPipeline('Light2D');
    }

    collectLoot(loot) {
        // remove loot from scene
        loot.gameObject.destroy();

        // Update sub
        this.sub.collectLoot();
    }
}
