var exec = require('cordova/exec');

exports.getCacheSize = function (success, error) {
    exec(success, error, 'Cache', 'getCacheSize', []);
};

exports.clearCache = function (success, error) {
    exec(success, error, 'Cache', 'clearCache', []);
};
