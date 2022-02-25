import gulp from 'gulp';
import {path} from './gulp/config/path.js';
import {plugins} from './gulp/plugins/plugins.js';

global.app = {
    prod: process.argv.includes('--prod'),
    gulp: gulp,
    path: path,
    plugins: plugins,
    FAVICON_DATA_FILE: `${path.src_dir}/faviconDataFile.json`
}

import { copy } from './gulp/tasks/copy.js';
import { clean } from './gulp/tasks/clean.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { img } from './gulp/tasks/img.js';
import { svgsprite } from './gulp/tasks/svgsprite.js';
import { otf2ttf, ttf2woff, fontstyle } from './gulp/tasks/fonts.js';
import { favicon } from './gulp/tasks/favicon.js'

function watch() {
    gulp.watch(path.watch.assets, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, img);
}


const fonts = gulp.series(otf2ttf, ttf2woff, fontstyle);
const main = gulp.series(fonts, favicon, gulp.parallel(copy, html, scss, js, img));
const dev = gulp.series(clean, main, gulp.parallel(watch, server));
const build = gulp.series(clean, main);

gulp.task('default', dev);

export { svgsprite, dev, build, img, scss, js, copy, clean, fonts, favicon }