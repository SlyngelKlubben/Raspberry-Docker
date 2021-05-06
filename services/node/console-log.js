exports.info = function(msg) {
    console.log("[\x1b[36mInfo\x1b[0m] "+msg);
}
exports.warn = function(msg) {
    console.warn("[\x1b[33mWarn\x1b[0m] "+msg);
}
exports.error = function(msg) {
    console.error("[\x1b[31mError\x1b[0m] "+msg);
}
exports.debug = function(msg) {
    console.log("[\x1b[31mDebug\x1b[0m] "+msg);
}