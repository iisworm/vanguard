const label = 'help.js';
const prefix = '!';

module.exports = {
    name: 'help',
    description: 'List all commands.',
    alias: ['commands'],
    usage: '<command name>',
    execute(msg, args, connection, guildPrefix) {
        const data = [];
        const { commands } = msg.client;

        if (!args.length) {
            data.push('Here is a list of my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command.`);

            return msg.author.send(data, { split: true })
                .then(() => {
                    if (msg.channel.type === 'dm') return;
                    msg.reply('I\'ve sent you a DM with all of my commands.');
                })
                .catch(error => {
                    logger.error({
                        label: label,
                        message: `Could not send help DM to ${msg.author.tag}. \n`, error
                    });
                    msg.reply('It seems like I cannot DM you; Maybe your DM\'s are disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.alias && c.alias.includes(name));

        if (!command) {
            return msg.reply('That is not a valid command. Try again.');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.alias) data.push(`**Aliases:** ${command.alias.join(', ')}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage} || <> required, [] optional`);
        if (command.cooldown) data.push(`**Cooldown:** ${command.cooldown || 3} seconds`);
        if (command.adminOnly) data.push(`*Admin only:* ${command.adminOnly}`);

        msg.channel.send(data, { split: true });
    }
};
