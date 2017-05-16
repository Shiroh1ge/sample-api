/**
 * Created by Bo on 16-May-17.
 */
var fs = require('fs');

fs.readdirSync(__dirname).forEach(function (file) {
    if (file !== 'index.js') {
        var moduleName = file.split('.')[0];
        var uppercaseModuleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

        module.exports = function(io) {
            exports[uppercaseModuleName] = require('./' + moduleName)(io);
        }
    }
});