/* global ENV */

const config = {
    GAME_WIDTH : 800,
    GAME_HEIGHT: 600,
    GRAVITY    : 300,
    DEBUG      : false,
};

if (ENV === 'dev') {
    config.LOG_LEVEL = Infinity;
}
else if (ENV === 'prod') {
    config.LOG_LEVEL = 3;
}

export default config;
