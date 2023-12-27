module.exports = {
    name: 'serveravatar',
    aliases: ['sav', 'serverpfp', 'spfp'],
    async execute(msg, args) {
        if (msg.guild == null) return;

        function isNum(str) {
            return /^\d+$/.test(str);
        }

        await msg.delete();

        if (!args.length) {
            let usr = await msg.member.fetch();
            if (!usr.avatar) {
                return msg.channel.send(`no **server avatar** is set .`).then((message) => {
                    setTimeout(() => message.delete(), 3_000).catch(err => console.error(err));
                });
            } else {
                return msg.channel.send(usr.displayAvatarURL({ size: 1024, dynamic: true }));
            }
        } else {
            let member;
            if (msg.mentions.users.size) {
                member = msg.mentions.users.first().id
            } else if (!isNum(args[0])) {
                mmbr = await msg.guild.members.cache.find((usr) => usr.user.username.toLowerCase().startsWith(args[0]));
                if (mmbr) member = mmbr.id;
            } else if (isNum(args[0])) {
                member = args[0];
            }

            try {
                const usr = await msg.guild.members.cache.get(member);
                if (!usr.avatar) {
                    return msg.channel.send(`**@${usr.username} has no **server avatar** set .`).then((message) => {
                        setTimeout(() => message.delete(), 3_000).catch(err => console.error(err));
                    });
                } else {
                    return msg.channel.send(usr.displayAvatarURL({ size: 1024, dynamic: true }));
                }
            } catch (err) {
                console.error(err);
                return msg.channel.send(`unable to find that **user** .`).then((message) => {
                    setTimeout(() => message.delete(), 3_000).catch((err) => console.error(err));
                });
            }
        }
    }
}