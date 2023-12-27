module.exports = {
    name: 'messageUpdate',
    async execute(oldMsg, newMsg) {
        try {
            if (oldMsg.partial) await oldMsg.fetch();
            if (oldMsg.author.bot) return;
            const snipes = msg.client.editsnipes.get(oldMsg.channel.id) || [];
            const currDate = new Date();
            snipes.unshift({
                content: oldMsg.content,
                author: oldMsg.author,
                image: oldMsg.attachments.first() ? oldMsg.attachments.first().proxyURL : null,
                date: currDate.getTime(),
                sticker: oldMsg.stickers.first() ? oldMsg.stickers.first() : null,
                msgId: oldMsg.id
            });
            snipes.splice(20);
            msg.client.editsnipes.set(oldMsg.channel.id, snipes);
        } catch (error) {
            return
        }
    }
}