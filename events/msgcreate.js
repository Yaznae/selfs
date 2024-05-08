module.exports = {
    name: 'messageCreate',
    async execute(msg) {
        let copyUsr = msg.client.copy.get('user');

        if (msg.author.id == copyUsr) {
            let atchd = [];
            let stckrs = [];
            let message = msg.content + ' ' ? msg.content : '';
            if (msg.attachments.size) {
                for (let atch in msg.attachments) { atchd.push(atch.proxyURL); };
                message += `(${atchd.join(', ')})`;
            };
            if (msg.stickers.size) {
                msg.stickers.forEach((stck) => {
                    stckrs.push(`https://media.discordapp.net/stickers/${stck.id}.png`);
                });
                message += `(${stckrs.join(', ')})`;
            };
            if (!msg) return;
            msg.channel.send(message);
        };

        let prefix = process.env.PREFIX;
        if (msg.author.id !== msg.client.user.id || !msg.content.startsWith(prefix)) return;

        if (msg.content.toLowerCase().includes('skull')) {
            await msg.react("💀");
        }

        if (msg.content.toLowerCase() == "bro" || msg.content.toLowerCase() == "nah") {
            return msg.react("☠️");
        }

        let args = msg.content.slice(prefix.length).trim().split(/ +/);
        let cmdName = args.shift().toLowerCase();

        let cmd = msg.client.commands.get(cmdName) || msg.client.commands.find(command => command.aliases && command.aliases.includes(cmdName));
        if (!cmd) return;

        try {
            await cmd.execute(msg, args);
        } catch (err) {
            console.error(err);
        }
    }
}