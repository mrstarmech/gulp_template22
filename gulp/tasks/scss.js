import dart_sass from 'sass';
import gulp_sass from 'gulp-sass';
import cleancss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import prefixer from 'gulp-autoprefixer';
import groupmedia from 'gulp-group-css-media-queries';

const sass = gulp_sass(dart_sass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: !app.prod })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupmedia())
        .pipe(webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp"
        }))
        .pipe(prefixer({
            grid:true,
            overrideBrowserList: ["last 5 versions"],
            cascade:true
        }))
        .pipe(app.gulp.dest(app.path.dst.css))
        .pipe(cleancss())
        .pipe(app.plugins.rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.dst.css))
        .pipe(app.plugins.browsersync.stream());
}