//引入mockjs
const path = require('path');
const fs = require('fs');
const Mock = require('mockjs');

const mock = {};
const isMockFile = (file) => {
    return !!~file.indexOf('mock.js');
};

fs.readdirSync(path.join(__dirname + '/../mock'))
    .forEach((file) => {
        if (isMockFile(file)) {
            const config = require(`./${file}`);
            if (config.useMock) {
                Object.assign(mock, config.mockConfig || {});
            }
        }

    });

module.exports = mock;
