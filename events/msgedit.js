module.exports = {
    name: 'messageUpdate',
    async execute(oldMsg, newMsg) {
        try {
            if (oldMsg.partial) oldMsg = await oldMsg.fetch();
            if (newMsg.partial) newMsg = await newMsg.fetch();
            if (oldMsg.author.bot) return;
            if (oldMsg.author.id == oldMsg.client.user.id) return;

            let snipes = oldMsg.client.editsnipes.get(oldMsg.channel.id) || [];
            const currDate = new Date();
            snipes.unshift({
                content: oldMsg.content,
                author: oldMsg.author,
                image: oldMsg.attachments.size ? oldMsg.attachments.first().proxyURL : null,
                date: currDate.getTime(),
                sticker: oldMsg.stickers.size ? oldMsg.stickers.first() : null,
                msgId: oldMsg.id
            });
            snipes.splice(20);
            oldMsg.client.editsnipes.set(oldMsg.channel.id, snipes);
        } catch (error) {
            console.log(error)
            return
        }
    }
}