import fileinclude from "gulp-file-include";
import webphtml from "gulp-webp-html-nosvg";
import realfavicon from 'gulp-real-favicon';
import version from "gulp-version-number";
import fs from 'fs';

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fileinclude({prefix: '@@'}))
        .pipe(app.plugins.replace(/@img\//g,'img/'))
        .pipe(webphtml())
        .pipe(realfavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(app.FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(version({
            'value':'%MD5%',
            'append': {
                'key': '_v',
                'cover': 0,
                'to': [
                    'css',
                    'js'
                ]
            },
            'output': {
                'file': 'gulp/version.json'
            }
        }))
        .pipe(app.gulp.dest(app.path.dst.html))
        .pipe(fileinclude({prefix: '##', basepath: 'src'}))
        .pipe(app.plugins.rename({
            extname: ".php"
        }))
        .pipe(app.gulp.dest(app.path.dst.html))
        .pipe(app.plugins.browsersync.stream());
}