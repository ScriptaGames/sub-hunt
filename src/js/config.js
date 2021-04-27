/* global ENV */

const config = {
    GAME_WIDTH       : 1024,
    GAME_HEIGHT      : 576,
    WORLD_WIDTH      : 2000,
    WORLD_HEIGHT     : 3000,
    DEBUG            : false,
    THRUST_POWER     : 0.00085,
    LIGHTS_ALWAYS_ON : false,
    INVULNERABLE     : false,
    SKY_HEIGHT       : 100,
    GRAVITY          : 0.08,
    DISABLE_SOUNDS   : false,
    BOSS_REVEAL_DEPTH: 2300,
    BOSS_REVEAL_TIME : 7,
    FADE_DURATION    : 250,
    ROCK_DAMAGE      : 0.25,
    MAX_DARK_DEPTH   : 2300,
};

if (ENV === 'dev') {
    config.LOG_LEVEL = Infinity;
}
else if (ENV === 'prod') {
    config.LOG_LEVEL = 3;
}

export default config;
