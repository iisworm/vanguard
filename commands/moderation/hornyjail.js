const label = 'hornyjail.js';
const logger = require('../../loghandle');

module.exports = {
    name: 'hornyjail',
    description: 'Send user to horny jail',
    args: true,
    alias: ['bonk'],
    adminOnly: true,
    guildOnly: true,
    execute(msg, args, connection) {
        if (!msg.guild.me.hasPermission('MANAGE_ROLES')) return msg.reply('I do not have permission to manage roles, please grant me the permission of `Manage Roles` so I may add and remove roles.');
        if (args[1] == 'remove') {
            try {
                connection.query(`SELECT muteRoleID FROM GuildConfig WHERE guildID = ${msg.guild.id}`)
                    .then(result => {
                        msg.mentions.members.first().roles.remove(result[0][0].muteRoleID);
                    })
                    .catch(err => logger.error(err))
            } catch (err) {
                logger.error(err)
            }
        } else {
            try {
                connection.query(`SELECT muteRoleID FROM GuildConfig WHERE guildID = ${msg.guild.id}`)
                    .then(result => {
                        msg.mentions.members.first().roles.add(result[0][0].muteRoleID);
                    })
                    .catch(err => logger.error(err))
            } catch (err) {
                logger.error(err)
            }
        }
    }
};
