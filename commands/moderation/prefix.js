const label = 'prefix.js';
const logger = require('../../loghandle');

module.exports = {
    name: 'prefix',
    description: 'Update command prefix',
    args: true,
    guildOnly: true,
    adminOnly: true,
    cooldown: '10',
    async execute(msg, args, connection, guildPrefix, prefix) {
        let oldPrefix = guildPrefix.get(msg.guild.id);
        try {
            await connection.query(
                `UPDATE GuildConfig SET cmdPrefix = '${args[0]}' WHERE guildID = ${msg.guild.id}`
            ).then(connection.query(
                `SELECT cmdPrefix FROM GuildConfig WHERE guildID = ?`, [msg.guild.id]
            ).then(async result => {
                await guildPrefix.set(msg.guild.id, result[0][0].cmdPrefix);
            })).catch(err => logger.error({
                label: label,
                message: err
            }));
            msg.reply(`Prefix updated successfully to ${args[0]}`);
            return prefix;
        } catch (err) {
            logger.error({
                label: label,
                message: err
            });
            msg.channel.send(`Prefix updated unsuccessfully. (Prefix is still ${oldPrefix})`);
        }
    }
};
