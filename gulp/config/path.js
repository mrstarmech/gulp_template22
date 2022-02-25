import * as npath from 'path';
const root = npath.basename(npath.resolve());

const srcf = './src';
const intf = './int';
const dstf = './dst';

export const path = {
    root_dir: root,
    src_dir: srcf,
    int_dir: intf,
    dst_dir: dstf,
    src: {
        assets: `${srcf}/assets/**/*.*`,
        html: `${srcf}/*.html`,
        scss: `${srcf}/scss/style.scss`,
        js: `${srcf}/js/app.js`,
        img: `${srcf}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcf}/img/**/*.svg`,
        svgicons: `${srcf}/svgicons/*.svg`,
    },
    ints: {
        html: `${intf}/*.html`
    },
    intd: {
        html: `${intf}/`
    },
    dst: {
        assets: `${dstf}/assets/`,
        html: `${dstf}/`,
        css: `${dstf}/css/`,
        js: `${dstf}/js/`,
        img: `${dstf}/img/`,
        fonts: `${dstf}/fonts/`,
    },
    watch: {
        assets: `${srcf}/assets/**/*.*`,
        html: `${srcf}/**/*.html`,
        scss: `${srcf}/scss/**/*.scss`,
        js: `${srcf}/js/**/*.js`,
        img: `${srcf}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    },
    clean: [
        `${dstf}/**`,
        `${intf}/**`,
        `!${dstf}/fonts`
    ]
}