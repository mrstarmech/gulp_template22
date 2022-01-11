import webpack from 'webpack-stream';

export const js = () => {
    return app.gulp.src(app.path.src.js, {sourcemaps:!app.prod})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpack({
            mode: app.prod ? 'production' : 'development',
            output: {
                filename: 'app.min.js'
            }
        }))
        .pipe(app.gulp.dest(app.path.dst.js))
        .pipe(app.plugins.browsersync.stream());
}