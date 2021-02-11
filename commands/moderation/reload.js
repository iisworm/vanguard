const label = 'reload.js';

module.exports = {
    name: 'reload',
    description: 'Reloads commands.',
    execute(msg, args) {
        if (args[0] != undefined) {
            const commandName = args[0].toLowerCase();
            const command = msg.client.commands.get(commandName) || msg.client.commands.find(cmd => cmd.alias && cmd.alias.includes(commandName));

            if (!command) return channel.send(`There is no command or alias with the name \`${commandName}\`, ${msg.author}!`);

            delete require.cache[require.resolve(`./${command.name}.js`)];

            try {
                const newCommand = require(`./${command.name}.js`);
                msg.client.commands.set(newCommand.name, newCommand);
                msg.channel.send(`Command \`${command.name}\`was reloaded.`);
            } catch (error) {
                logger.error({ label, message: error });
                msg.channel.send(`There was an error reloading \`${command?.name}\`:\n\`${error.message}\``);
            }
        }
    }
};