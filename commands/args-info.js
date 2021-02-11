const label = 'args-info.js';

module.exports = {
    name: 'args-info',
    description: 'Information about the arguments provided',
    args: true,
    usage: '<arguments>',
    execute(msg, args) {
        if (args[0] === 'boob') {
            msg.channel.send('ies');
        }

        msg.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    }
};
