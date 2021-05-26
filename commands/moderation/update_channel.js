const label = 'update_channel.js';
const logger = require('../../loghandle');

module.exports = {
    name: 'update',
    description: 'Update channels with defined Channel ID\'s',
    usage: '<channel mention>',
    args: true,
    adminOnly: true,
    guildOnly: true,
    execute(msg, args, connection) {
        let modLogChannel;
        //`UPDATE GuildConfig SET modLogID = '${modLogChannel.id}' WHERE guildID = ?', [guild.id]
        logger.info('test');
    }
};
