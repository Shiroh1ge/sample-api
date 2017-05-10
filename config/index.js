/**
 * Created by Bo on 09-May-17.
 */
let configValues = require('./config.json');

module.exports = {
    connectionString: () => {
        return 'mongodb://localhost/bako';
    }
};