module.exports = {
    name: 'editsnipe',
    aliases: ['es'],
    async execute(msg, args) {
        function isNum(str) {
            return /^\d+$/.test(str);
        }

        const snipes = msg.client.editsnipes.get(msg.channel.id) || [];
        
        if (args.length && !isNum(args[0])) return;
        if (args.length && args[0] > snipes.length) {
            await msg.delete();
            return msg.channel.send(`no **snipe** found for index \`${args[0]}\` .`).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        };

        const snipe = snipes[args[0] - 1 || 0];
        if (!snipe) {
            await msg.delete();
            return msg.channel.send(`there's nothing to **snipe** .`).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        }

        let cont = `**@${snipe.author.username}** edited <t:${Math.floor(snipe.date / 1000)}:R> \`(${args[0] || 1}/${snipes.length} edits)\`\n`;
        if (snipe.content) {
            cont += snipe.content + '\n';
        }
        if (snipe.image) {
            cont += snipe.image
        }
        await msg.delete();
        return msg.channel.send(cont);
    }
}