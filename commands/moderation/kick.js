const label = 'kick.js';
const logger = require('../../loghandle');

module.exports = {
    name: 'kick',
    description: 'Kicks designated user.',
    usage: '<user> [reason]',
    args: true,
    adminOnly: true,
    guildOnly: true,
    execute(msg, args, connection) {
        if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('You do not have required permissions to kick.');
        let target = msg.mentions.members.first();
        let reason = args.slice(1).join(' ').toString();
        let reply = `You did not provide a valid target, ${msg.author}.`;

        if (target === undefined) return msg.channel.send(reply);

        if (!target.kickable) {
            return msg.reply(`Targeted user cannot be kicked.`);
        } else {
            target.kick(reason);
            if (!reason.length) {
                msg.channel.send(`${target} has been kicked.`);
                return;
            } else {
                msg.channel.send(`${target} has been kicked for \`${reason}\`.`);
            }
        }
    }
};
