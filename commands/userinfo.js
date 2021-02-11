const label = 'userinfo.js';
const logger = require('../loghandle');

module.exports = {
    name: 'user-info',
    description: 'Displays mentioned users\' info.',
    alias: ['userinfo', 'user', 'info'],
    execute(msg, args) {
        const userEmbed = {
            color: 0xff3400,
            title: 'User Information:',
            author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL({ dynamic: true }),
            },
            thumbnail: {
                url: msg.author.avatarURL({ dynamic: true }),
            },
        };

        msg.channel.send({ embed: userEmbed });
    }
};
