export const server = (done) => {
    app.plugins.browsersync.init({
        server: {
            baseDir: `${app.path.dst.html}`
        },
        notify: false,
        port: 3000,
    })
}