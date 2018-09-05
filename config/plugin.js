const path = require('path');

/**
 * 模板引擎
 * */

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};

/**
 * mongodb操作
 * */

exports.db = {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-mongodb')
};
