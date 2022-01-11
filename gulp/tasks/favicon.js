import fs from 'fs';
import realfavicon from 'gulp-real-favicon';

const favicon_impl = (cb) => {
    realfavicon.generateFavicon({
        masterPicture: `${app.path.src_dir}/favicon_master.png`,
        dest: `${app.path.dst.html}`,
        iconsPath: './',
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {
                design: 'raw'
            },
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: '#da532c',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 50,
                themeColor: '#5bbad5'
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false,
            readmeFile: false,
            htmlCodeFile: false,
            usePathAsIs: false
        },
        markupFile: app.FAVICON_DATA_FILE
    }, cb);
}

export const favicon = (cb) => {
    if(fs.existsSync(app.FAVICON_DATA_FILE)) {
        let currentVersion = JSON.parse(fs.readFileSync(app.FAVICON_DATA_FILE)).version;
        realfavicon.checkForUpdates(currentVersion,(err)=>{
            if(err) {
                throw err;
            } else {
                favicon_impl(cb);
            }
        });
    } else {
        favicon_impl(cb);
    }
}