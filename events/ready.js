const colors = require('colors');

module.exports = {
    name: 'ready',
    once: true,
    async execute(bot) {
        await bot.user.setActivity('⛧', { type: 'STREAMING', url: 'https://twitch.tv/y4zuna' })
        console.log(`# `.magenta.bold + `logged in as @${bot.user.username} `.bold +  `(${bot.user.id})`.magenta.bold);
    }
}