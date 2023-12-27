module.exports = {
    name: 'clear',
    async execute(msg, args) {
        let amount = parseInt(args[0]);
        await msg.delete();
        let i = 0;

        if (!amount) return;

        let messages = await msg.channel.messages.fetch();
        let bMsgs = [];
        messages.filter(m => m.author.id == msg.author.id).forEach(mss => { bMsgs.push(mss.id); });
        if (amount) { bMsgs.splice(amount) };
        bMsgs.forEach(async m => {
            await msg.channel.messages.delete(m);
            i += 1;
            if (i == bMsgs.length) {
                return msg.channel.send(`deleted **${bMsgs.length}** messages`).then(ms => {
                    setTimeout(() => {
                        ms.delete();
                    }, 3000)
                });
            };
        });
    }
}