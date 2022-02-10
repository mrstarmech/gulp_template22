import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browsersync from "browser-sync";
import rename from "gulp-rename";
import newer from "gulp-newer";
import gulpif from "gulp-if";
import replace from "gulp-replace";

export const plugins = {
    plumber: plumber,
    replace: replace,
    notify: notify,
    browsersync: browsersync,
    rename: rename,
    newer: newer,
    if: gulpif
}