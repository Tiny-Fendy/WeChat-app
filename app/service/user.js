const { Service } = require('egg');
let flag = 0;

module.exports = class UserService extends Service {
    async createSession() {
        return `1000${flag++}`;
    }
};
