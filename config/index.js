/**
 * Created by Bo on 09-May-17.
 */
let configValues = require('./config.json');

module.exports = {
    connectionString: () => {
        return 'mongodb://heroku_pdwl2bpx:t0k5vokgqljk7986hgnb26223q@ds155841.mlab.com:55841/heroku_pdwl2bpx';
    }
};