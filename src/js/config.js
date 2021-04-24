/* global ENV */

const config = {
    GAME_WIDTH : 2000,
    GAME_HEIGHT: 3000,
    DEBUG      : true,
};

if (ENV === 'dev') {
    config.LOG_LEVEL = Infinity;
}
else if (ENV === 'prod') {
    config.LOG_LEVEL = 3;
}

export default config;
