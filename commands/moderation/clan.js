const label = 'clan.js';
const logger = require('../../loghandle');

module.exports = {
    name: 'clan',
    description: 'Add user to clan',
    args: true,
    adminOnly: true,
    guildOnly: true,
    execute(msg, args, connection) {
        if (!msg.guild.me.hasPermission('MANAGE_ROLES')) return msg.reply('I do not have permission to manage roles, please grant me the permission of `Manage Roles` so I may add and remove roles.');
        if (args[1] == 'demote') {
            try {
                connection.query(`SELECT userRoleID, memberRoleID FROM GuildConfig WHERE guildID = ${msg.guild.id}`)
                    .then(result => {
                        msg.mentions.members.first().roles.add(result[0][0].userRoleID);
                        msg.mentions.members.first().roles.remove(result[0][0].memberRoleID);
                    })
                    .catch(err => logger.error(err))
            } catch (err) {
                logger.error(err)
            }
        } else {
            try {
                connection.query(`SELECT userRoleID, memberRoleID FROM GuildConfig WHERE guildID = ${msg.guild.id}`)
                    .then(result => {
                        msg.mentions.members.first().roles.add(result[0][0].memberRoleID);
                        msg.mentions.members.first().roles.remove(result[0][0].userRoleID);
                    })
                    .catch(err => logger.error(err))
            } catch (err) {
                logger.error(err)
            }
        }
    }
};
