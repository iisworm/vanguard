const label = 'purge.js';
const Discord = require('discord.js');
const logger = require('../../loghandle');

module.exports = {
    name: 'purge',
    description: 'Purge amount of messages of your choosing.',
    args: true,
    adminOnly: true,
    guildOnly: true,
    async execute(msg, args) {
        if (!msg.guild.me.hasPermission('MANAGE_MESSAGES')) return msg.reply('I do not have required permissions. Please grant me `Manage Messages` so I may execute the command.');
        let amount = Number(args[0]) + 1;
        if (isNaN(amount)) {
            return msg.reply('Not a valid number');
        } else {
            if (args[0] <= 50) {
                await msg.channel.messages.fetch({ limit: amount })
                    .then(messages => {
                        msg.channel.bulkDelete(messages);
                        msg.reply(`I have purged ${messages.size - 1} messages.`).then(msg => msg.delete({ timeout: 2000 }))
                    })
                    .catch(err => logger.error({
                        label: label,
                        message: err
                    }));
            } else if (args[0] > 50) return msg.reply('You cannot purge more than 50 at once.').then(msg => msg.delete({ timeout: 2000 }));
        }
    }
};
