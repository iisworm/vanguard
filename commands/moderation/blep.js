const label = 'blep.js';
const logger = require('../../loghandle');

module.exports = {
    name: 'blep',
    description: 'Posts blep gif.',
    adminOnly: true,
    guildOnly: true,
    execute(msg, args) {
        if (msg.author.id !== '195186412545376256') return;
        const blepEmbed = {
            image: {
                url: 'https://aeswere.ca/gallery/cache/discord/catblelele_FULL.gif',
            },
        }
        msg.reply({ embed: blepEmbed });
    }
};
