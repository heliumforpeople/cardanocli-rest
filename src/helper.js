const {dirname} = require('path');
const fs = require('fs');

const PUBLIC_TMP = '/tmp'
const ROOT_DIR = dirname(require.main.filename);
const ABSOLUTE_TMP = `${ROOT_DIR}/../public${PUBLIC_TMP}`;

/**
 * @typedef {Object} app_config
 * @property {object} cli - Cli config
 * @property {string} cli.network - Cardano network to be used [Default: 'mainnet']
 * @property {string} cli.era - Cardano era to be used [Default: 'allegra']
 * @property {string} cli.dir - Directory where file are created. [Default: '.']
 * @property {string} cli.shelleyGenesisPath - Directory where file are created. [Default: null]
 */

 /**
  * @type {app_config} config - App Configuration object
  */
const config = (function () {
    'use strict';

    const yaml = require('js-yaml');
    const fs = require('fs');
    let content = '';
    let config = {};

    try {
        content = fs.readFileSync('./config.yaml', 'utf8');
    } catch (e) {
        throw 'config.yaml not found! Tips: copy and update config.yaml.dist'+"\n"+e;
    }

    try {
        config = yaml.load(content);
    } catch (e) {
        throw 'config.yaml incorrect YAML format!'+"\n"+e;
    }

    return config;
})();

 /**
  * @type {app_config} config - App Configuration object
  */
exports.config = config;

/**
 * @param {Request} request - ExpressJs Request object
 * @param  {...string} args - Exploded path string to be added
 * @returns {string} - Full url string
 */
exports.generateUrl = (request, ...args) => `${request.protocol}://${request.get('host')}${args.join('/')}`;

/**
 * @param {*} filePath - Target file path
 * @param {*} symlinkName - Symlink file name
 */
exports.createSymlink = (filePath, symlinkName) => {
    const { relative, resolve } = require('path');
    const fs  = require('fs');
    const absBasePath = resolve(config.cli.dir);
    const absFilePath = resolve(filePath)
    
    // Security: Allow only download from 'config.cli.dir'
    if(0 === absFilePath.indexOf(absBasePath)
        && fs.existsSync(absFilePath)
        && fs.statSync(absFilePath).isFile()) {
        fs.symlink(
            relative(ABSOLUTE_TMP, filePath),
            `${ABSOLUTE_TMP}/${symlinkName}`,
            (err) => (err) && console.log(err)
        );
    } else {
        throw new Error('Access denied!');
    }
};

/**
 * Clean Public temporary folder
 */
exports.cleanTMPFiles = () => {
    const findRemoveSync = require('find-remove');
    const cron = require('node-cron');
    
    cron.schedule('*/12 * * * *', function() {
        let result = {};
        
        result = findRemoveSync(ABSOLUTE_TMP,{age: {seconds: 600}, files: "*.*"});

        let count = Object.keys(result).length;

        if (count) {
            console.log(`Deleted ${count} expired file(s) in /public${PUBLIC_TMP}`);
            console.log(result);
        }
    });
};