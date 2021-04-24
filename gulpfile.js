const gulp = require('gulp');
const del = require('del');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const path = require('path');
const browserSync = require('browser-sync').create();
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const tap = require('gulp-tap');
const replace = require('gulp-string-replace');

const paths = {
    phaser: './node_modules/phaser/dist/',
    base  : './src',
    build : './dist',
    assets: {
        src : './src/assets',
        dest: './dist/assets',
    },
    styles: {
        src : './src/css',
        dest: './dist/css',
    },
    script: {
        src : './src/js',
        dest: './dist/js',
    },
    game: {
        entry: './src/js/index.js',
        dest : 'index.js',
    },
};


gulp.task('scripts', () => {
    return browserify(
        {
            paths  : [path.join(__dirname, paths.script.src)],
            entries: paths.game.entry,
            debug  : true,
        })
        .transform(babelify)
        .bundle()
        .pipe(source(paths.game.dest))
        .pipe(buffer())
        .pipe(gulpif(!isProduction(), sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(isProduction(), terser()))
        .pipe(gulpif(!isProduction(), sourcemaps.write('./source-maps')))
        .pipe(gulp.dest(paths.script.dest));
});

async function indexHtmlPhaserScript(file, t) {
    if (isProduction()) {
        return t.through(replace, ['phaser.js', 'phaser.min.js']);
    }
}

async function indexHtmlSetEnv(file, t) {
    if (isProduction()) {
        return t.through(replace, ["ENV = 'dev'", "ENV = 'prod'"]);
    }
}

async function clean() {
    del([paths.build]);
}

async function copyHTML() {
    gulp.src([paths.base + '/index.html'])
        .pipe(tap(indexHtmlPhaserScript))
        .pipe(tap(indexHtmlSetEnv))
        .pipe(gulp.dest(paths.build));
}

async function copyAssets() {
    gulp.src(paths.assets.src + '/**/*')
        .pipe(gulp.dest(paths.assets.dest));
}

async function copyPhaser() {
    const phaserFile = isProduction() ? '/phaser.min.js' : '/phaser.js';

    gulp.src(paths.phaser + phaserFile)
        .pipe(gulp.dest(paths.script.dest));
}

async function copyStyles() {
    gulp.src(paths.styles.src + '/**/*.css')
        .pipe(gulp.dest(paths.styles.dest));
}

async function watch() {
    gulp.watch(paths.base + '/**/*.*', gulp.series('build', 'reload'));
}

async function reload() {
    browserSync.reload();
}

async function serve() {
    browserSync.init({
        server: {
            baseDir: './dist',
            files  : './dist/**/*.*',
        },
    });
}

function isProduction() {
    return argv.production;
}

gulp.task('reload', reload);
gulp.task('serve', serve);
gulp.task('watch', watch);
gulp.task('clean', clean);
gulp.task('copy-html', copyHTML);
gulp.task('copy-assets', copyAssets);
gulp.task('copy-phaser', copyPhaser);
gulp.task('copy-styles', copyStyles);
gulp.task('copy-static', gulp.series('copy-html', 'copy-assets', 'copy-phaser', 'copy-styles'));
gulp.task('build', gulp.series('copy-static', 'scripts'));
gulp.task('build-watch-serve', gulp.series('copy-static', 'scripts', 'serve', 'watch'));
gulp.task('default', gulp.series('build'));
