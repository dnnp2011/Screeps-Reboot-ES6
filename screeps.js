const { readdirSync, readFileSync } = require('fs');
const { dirname, extname, join } = require('path');
const { ScreepsAPI } = require('screeps-api');
const { branch } = require('git-rev-sync');


const dest = (process.argv[2] || 'main').trim();
const cfg = require('./screeps.json')[dest];

const options = {
    file: './dist/main.js',
};

if (cfg === null) {
    throw new Error('Select a valid destination');
}

run({ config: cfg });


function run(screepsOptions = {}) {
    if (!screepsOptions.dryRun) {
        uploadSource(screepsOptions.configFile || screepsOptions.config, options);
    }

    console.log('Successfully uploaded code to', dest);
}

function runUpload(api, branch, code) {
    api.raw.user.branches().then((data) => {
        let branches = data.list.map((b) => b.branch);
        if (branches.includes(branch)) {
            api.code.set(branch, code);
        } else {
            api.raw.user.cloneBranch('', branch, code);
        }
    });
}

function uploadSource(config, options) {
    if (!config) {
        console.log('screeps() needs a config e.g. screeps({configFile: \'./screeps.json\'}) or screeps({config: { ... }})');
    } else {
        if (typeof config === 'string') {
            config = loadConfigFile(config);
        }
        let code = getFileList(options.file);
        let branch = getBranchName(config.branch);
        let api = new ScreepsAPI(config);
        if (!config.token) {
            api.auth().then(() => {
                runUpload(api, branch, code);
            });
        } else {
            runUpload(api, branch, code);
        }
    }
}

function loadConfigFile(configFile) {
    let data = readFileSync(configFile, 'utf8');
    let cfg = JSON.parse(data);
    console.log('Cfg ', cfg);
    if (!validateConfig(cfg)) {
        throw new TypeError('Invalid config');
    }
    if (cfg.email && cfg.password && !cfg.token && cfg.hostname ===
        'screeps.com') {
        console.log('Please change your email/password to a token');
    }
    return cfg;
}

function validateConfig(cfg) {
    if (cfg.hostname && cfg.hostname === 'screeps.com') {
        return [
            typeof cfg.token === 'string',
            cfg.protocol === 'http' || cfg.protocol === 'https',
            typeof cfg.hostname === 'string',
            typeof cfg.port === 'number',
            typeof cfg.path === 'string',
            typeof cfg.branch === 'string',
        ].reduce((a, b) => a && b);
    }
    return [
        (typeof cfg.email === 'string' && typeof cfg.password === 'string') ||
        typeof cfg.token === 'string',
        cfg.protocol === 'http' || cfg.protocol === 'https',
        typeof cfg.hostname === 'string',
        typeof cfg.port === 'number',
        typeof cfg.path === 'string',
        typeof cfg.branch === 'string',
    ].reduce((a, b) => a && b);
}

function getFileList(outputFile) {
    let code = {};
    let base = dirname(outputFile);
    let files = readdirSync(base)
        .filter((f) => extname(f) === '.js' || extname(f) === '.wasm');

    files.map((file) => {
        if (file.endsWith('.js')) {
            code[file.replace(/\.js$/i, '')] = readFileSync(join(base, file), 'utf8');
        } else {
            code[file] = {
                binary: readFileSync(join(base, file)).toString('base64'),
            };
        }
    });
    return code;
}

function getBranchName(branch$1) {
    if (branch$1 === 'auto') {
        return branch();
    } else {
        return branch$1;
    }
}
