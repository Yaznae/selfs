const colors = require('colors');

module.exports = {
    name: 'messageDelete',
    once: false,
    async execute(msg) {
        try {
            if (msg.partial) await msg.fetch();
            const snipes = msg.client.snipes.get(msg.channel.id) || [];
            const currDate = new Date();

            if (msg.author.bot) return;
            if (msg.author.id == msg.client.user.id) return;

            snipes.unshift({
                content: msg.content,
                author: msg.author,
                image: msg.attachments.first() ? msg.attachments.first().proxyURL : null,
                date: currDate.getTime(),
                sticker: msg.stickers.first() ? msg.stickers.first() : null
            });
            snipes.splice(20);
            msg.client.snipes.set(msg.channel.id, snipes);
        } catch (err) {
            return
        }
    },
};