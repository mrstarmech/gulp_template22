import fs, { unwatchFile } from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otf2ttf = () => {
    return app.gulp.src(`${app.path.src_dir}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.path.src_dir}/fonts/`))
}

export const ttf2woff = () => {
    return app.gulp.src(`${app.path.src_dir}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats:['woff']
        }))
        .pipe(app.gulp.dest(app.path.dst.fonts))
        .pipe(app.gulp.src(`${app.path.src_dir}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.dst.fonts))
}

export const fontstyle = () => {
    let fsfile = `${app.path.src_dir}/scss/fonts.scss`;
    fs.readdir(app.path.dst.fonts, function (err, fsfiles) {
        if(fsfiles) {
            if(!fs.existsSync(fsfile)) {
                fs.writeFile(fsfile,'', cb);
                let newFileOnly;
                for (let i = 0; i < fsfiles.length; i++) {
                    let fontFileName = fsfiles[i].split('.')[0];
                    if(newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0]?fontFileName.split('-')[0]:fontFileName;
                        let fontWeight = fontFileName.split('-')[1]?fontFileName.split('-')[1]:fontFileName;
                        let weights = {
                            'thin':100,
                            'thinitalic':100,
                            'extralight':200,
                            'extralightitalic':200,
                            'light':300,
                            'lightitalic':300,
                            'medium':500,
                            'mediumitalic':500,
                            'semibold':600,
                            'semibolditalic':600,
                            'bold':700,
                            'bolditalic':700,
                            'extrabold':800,
                            'extrabolditalic':800,
                            'heavy':800,
                            'heavyitalic':800,
                            'black':900,
                            'blackitalic':900
                        }
                        if(weights[fontWeight.toLowerCase()] !== undefined) {
                            fontWeight = weights[fontWeight.toLowerCase()];
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fsfile,
                            `\n@font-face {\n\tfont-family: ${fontName};\n\tfont-display:swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontFileName.toLowerCase().includes('italic')?'italic':'normal'};\n}\r\n`,
                            cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log(`File ${fsfile} already exists. Delete old file to regenerate.`);
            }
        }
    });
    return app.gulp.src(`${app.path.src_dir}`);
    function cb(){}
}