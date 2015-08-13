cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "id": "cordova-plugin-console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "id": "cordova-plugin-console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/com.hellojihyun.cordova.plugin.Muse/www/Muse.js",
        "id": "com.hellojihyun.cordova.plugin.Muse.Muse",
        "clobbers": [
            "window.Muse"
        ]
    },
    {
        "file": "plugins/nl.sylvain.cordova.osc/www/OSCListener.js",
        "id": "nl.sylvain.cordova.osc.OSCListener",
        "clobbers": [
            "window.OSCListener"
        ]
    },
    {
        "file": "plugins/nl.sylvain.cordova.osc/www/OSCSender.js",
        "id": "nl.sylvain.cordova.osc.OSCSender",
        "clobbers": [
            "window.OSCSender"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-console": "1.0.2-dev",
    "com.hellojihyun.cordova.plugin.Muse": "1.0.0",
    "nl.sylvain.cordova.osc": "0.1.0"
}
// BOTTOM OF METADATA
});