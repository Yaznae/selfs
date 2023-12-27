module.exports = {
    name: 'spam',
    async execute(msg, args) {
        await msg.delete();
        if (!args.length || args.length < 2) return;

        let amount = args.shift();
        if (!parseInt(amount)) {
            return msg.channel.send(`invalid **amount** given .`).then(message => {
                setTimeout(() => message.delete()).catch(err => console.error(err));
            });
        };

        let spamMsg = args.join(' ');
        let i = 0;
        while (i < amount) {
            await msg.channel.send(spamMsg);
            i += 1;
        };
    }
}