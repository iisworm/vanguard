const label = 'gif.js';
const fetch = require('node-fetch');

const words = ['birb', 'dog', 'kitten', 'kittens', 'puppy', 'puppies', 'birds', 'cat', 'kitty'];
const index = Math.floor(Math.random() * words.length);


async function gif(msg, query) {
    let url = `https://api.tenor.com/v1/search?q=${query}&key=${process.env.API_TENOR}&contentfilter=high&limit=8`;
    let response = await fetch(url);
    let json = await response.json();
    let index = Math.floor(Math.random() * json.results.length);

    const gifEmbed = {
        title: json.results[index].title,
        image: {
            url: json.results[index].media[0].gif.url,
        },
        footer: {
            text: 'GIF from Tenor: ' + query,
        },
        timestamp: new Date(),
    }

    msg.channel.send({ embed: gifEmbed });
}

module.exports = {
    name: 'gif',
    description: 'Send gifs with user given keywords or, if not provided with keywords, randomly chosen from a list.',
    alias: ['gifs'],
    cooldown: '7',
    usage: '<keywords>',
    args: false,
    execute(msg, args) {
        if (args[0] !== undefined) {
            let query = args.slice(0, args.length).join(' ');
            gif(msg, query);
        } else {
            let query = words[index];
            gif(msg, query);
        }
    }
};
