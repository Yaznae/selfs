const colors = require('colors');

module.exports = {
    name: 'ready',
    once: true,
    async execute(bot) {
        console.log(`# `.magenta.bold + `logged in as @${bot.user.username} `.bold +  `(${bot.user.id})`.magenta.bold);
    }
}