const { Client, Intents, Collection } = require('discord.js-selfbot-v13');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const bot = new Client({
    intents: [
        Intents.FLAGS.MESSAGE_CONTENT,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    autoRedeemNitro: true,
});

bot.commands = new Collection();
bot.snipes = new Collection();
bot.editsnipes = new Collection();
bot.copy = new Collection();
bot.lockedGCs = new Collection();

let cFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(f => f.endsWith('.js'));
for (const file of cFiles) {
    let cmdPath = path.join(path.join(__dirname, 'commands'), file);
    let cmd = require(cmdPath);

    if ('name' in cmd && 'execute' in cmd) {
        bot.commands.set(cmd.name, cmd);
    }
}

const ePath = path.join(__dirname, 'events');
const events = fs.readdirSync(ePath);

for (const file of events) {
    const filePath = path.join(ePath, file);
    const event = require(filePath);
    if (event.once) {
        bot.once(event.name, (...args) => event.execute(...args));
    } else {
        bot.on(event.name, (...args) => event.execute(...args));
    };
};

bot.login(process.env.TOKEN);