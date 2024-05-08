const { Collection } = require('discord.js-selfbot-v13');

module.exports = {
    name: 'help',
    aliases: ['h'],
    async execute(msg, args) {
        await msg.delete();
        const prefix = process.env.PREFIX
        const cmdFiles = msg.client.commands
        let helpMessage = `\`::\` here are the available commands:\n`
        cmdFiles.forEach(thing => {
            console.log(thing.name)
            helpMessage += `    - \`${prefix}${thing.name}\`\n`
        })

        return msg.channel.send(helpMessage);
    }
}