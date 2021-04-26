/* global ENV */

const config = {
    GAME_WIDTH      : 1024,
    GAME_HEIGHT     : 576,
    WORLD_WIDTH     : 2000,
    WORLD_HEIGHT    : 3000,
    DEBUG           : false,
    THRUST_POWER    : 0.00085,
    LIGHTS_ALWAYS_ON: true,
    INVULNERABLE    : false,
    SKY_HEIGHT      : 100,
    GRAVITY         : .75,
    DISABLE_SOUNDS  : false,
};

if (ENV === 'dev') {
    config.LOG_LEVEL = Infinity;
}
else if (ENV === 'prod') {
    config.LOG_LEVEL = 3;
}

export default config;
