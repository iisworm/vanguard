const label = 'bleh.js';
const logger = require('../../loghandle');

module.exports = {
    name: 'bleh',
    description: 'Posts bleh.',
    adminOnly: true,
    guildOnly: true,
    execute(msg, args) {
        if (msg.author.id !== '195186412545376256') return;
        const blehEmbed = {
            image: {
                url: 'https://aeswere.ca/gallery/cache/discord/bleh_FULL.png',
            },
        }
        msg.reply({ embed: blehEmbed });
    }
};
