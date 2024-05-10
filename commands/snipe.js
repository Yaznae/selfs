module.exports = {
    name: 'snipe',
    aliases: ['s'],
    async execute(msg, args) {
        await msg.delete();

        function isNum(str) {
            return /^\d+$/.test(str);
        }

        const snipes = msg.client.snipes.get(msg.channel.id) || [];

        if (args.length && !isNum(args[0])) {
            let user_search;
            let user;
            if (msg.mentions.users.size) {
                user_search = msg.mentions.users.first().id;
            } else if (msg.guild) {
                let guild_search = await msg.guild.members.cache.find(u => u.user.username.toLowerCase().startsWith(args[0].toLowerCase()));
                if (guild_search) user_search = guild_search.id;
            } else if (isNum(args[0]) && args[0] > 20) {
                user_search = args[0];
            };
            try {
                user = await msg.client.users.cache.find(u => u.id == user_search);
            } catch (err) {
                return
            }
            if (!user) return;
            if (user == msg.client.user) return;
            let userSnipes = [];
            if (!snipes.length) return;
            snipes.forEach((foundSnipe) => {
                if (foundSnipe.author == user) userSnipes.push(foundSnipe);
            })
            if (!userSnipes.length) {
                return msg.channel.send(`no **snipe** found for user <@${user.id}> .`).then(message => {
                    setTimeout(() => message.delete(), 5_000);
                }).catch(err => console.error(err));
            } else {
                let snipe;
                let index;
                if (args.length < 2) {
                    index = 1;
                    snipe = userSnipes[index - 1];
                } else if (isNum(args[1])) {
                    index = parseInt(args[1]) - 1;
                    if (index + 1 > userSnipes.length) {
                        return msg.channel.send(`no **snipe** found for user ${args[0]} .`).then(message => {
                            setTimeout(() => message.delete(), 5_000);
                        }).catch(err => console.error(err));
                    }
                    snipe = userSnipes[index]
                } else {
                    index = 1;
                    snipe = userSnipes[index - 1]
                };
                let cont = `**@${snipe.author.username}**\n`;
                if (snipe.content) {
                    cont += snipe.content + ' ';
                }
                if (snipe.image) {
                    cont += '(' + snipe.image + ')';
                }
                cont += `\ndeleted <t:${Math.floor(snipe.date / 1000)}:R> \`(${index}/${userSnipes.length} messages)\``
                return msg.channel.send(cont);
            }
        };
        if (args.length && args[0] > snipes.length) {
            return msg.channel.send(`no **snipe** found for index \`${args[0]}\` .`).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        };

        const snipe = snipes[args[0] - 1 || 0];
        if (!snipe) {
            return msg.channel.send(`there's nothing to **snipe** .`).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        }

        let cont = `**@${snipe.author.username}**\n`;
        if (snipe.content) {
            cont += snipe.content + ' ';
        }
        if (snipe.image) {
            cont += '(' + snipe.image + ')';
        }
        cont += `\ndeleted <t:${Math.floor(snipe.date / 1000)}:R> \`(${args[0] || 1}/${snipes.length} messages)\``
        return msg.channel.send(cont);
    }
}