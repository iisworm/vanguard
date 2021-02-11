const label = "bot.js";
const logger = require('./loghandle');
logger.info({
    label: label,
    message: "Init start"
});
require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const guildPrefix = new Map();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
let connection, prefix, modLogging;
const channels = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const modCommandFiles = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));
for (const file of modCommandFiles) {
    const command = require(`./commands/moderation/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    client.user.setStatus('online');
    client.user.setActivity('beep boops', { type: "LISTENING" });
    logger.info({
        label: label,
        message: `${client.user.tag} logged in.`
    });
    client.guilds.cache.forEach(guild => {
        connection.query(
            `SELECT cmdPrefix, botChannel, adminBotChannel, modLogID FROM GuildConfig WHERE guildID = ?`, [guild.id]).then(result => {
                guildPrefix.set(guild.id, result[0][0].cmdPrefix);
                channels.push(result[0][0].botChannel);
                channels.push(result[0][0].adminBotChannel);
                modLogging = result[0][0].modLogID;
                prefix = guildPrefix.get(guild.id);
            }).catch(err => logger.log(err));
    });
});

client.on('guildCreate', async (guild) => {
    try {
        await connection.query(`INSERT INTO Guilds VALUES (${guild.id}, ${guild.ownerID})`);
        await connection.query(`INSERT INTO GuildConfig (guildID) VALUES (${guild.id})`);
    } catch (err) {
        console.log(err);
    }
});


client.on('message', msg => {
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.alias && cmd.alias.includes(commandName));

    prefix = msg.channel.type !== 'dm' ? guildPrefix.get(msg.guild.id) : '!';

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;


    if (command?.adminOnly && (!msg.member.hasPermission('ADMINISTRATOR') && !msg.member.roles.cache.has('800678305426702377'))) {
        return msg.reply('You do not have required permissions.');
    }

    if (command?.adminOnly || channels.includes(msg.channel.id)) {
        //empty like my soul
    } else {
        return;
    }

    if (command?.guildOnly && msg.channel.type == 'dm') {
        return msg.reply(`Sorry ${command.name} can only be used in a guild, not DMs.`);
    }


    if (command?.args && !args.length) {
        let reply = `You didn't provide any arguments, ${msg.author}!`;

        if (command?.usage) {
            reply += `\nProper usage: \`${prefix}${command.name} ${command.usage}\``;
        }

        return msg.channel.send(reply);
    }

    if (!cooldowns.has(command?.name)) {
        cooldowns.set(command?.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command?.name);
    const cooldownAmount = (command?.cooldown || 3) * 1000;

    if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing ${command.name}.`)
        }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    try {
        command.execute(msg, args, connection, guildPrefix);
    } catch (err) {
        logger.error({
            label: label,
            message: err,
        });
        msg.reply('There was an error trying to execute that command.');
    }

});

(async () => {
    connection = await require('./database/mysql');
    await client.login(process.env.BOT_TOKEN).then(logger.info({
        label: label,
        message: 'logging in.'
    }));
})();
