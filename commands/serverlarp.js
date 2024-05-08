module.exports = {
    name: 'serverlarp',
    aliases: ['slarp'],
    async execute(msg, args) {
        await msg.delete();
        if (msg.guild == null) return;
        if (!msg.mentions.members.size) return;

        const usr = msg.mentions.members.first();
        const avatar = usr.displayAvatarURL({ dynamic: true, size: 2048 }) ? usr.avatar : usr.user.displayAvatarURL({ size: 2048, dynamic: true })

        try {
            if (msg.client.user.premiumType == 2) {
                msg.guild.members.me.setAvatar(avatar)
            } else {
                const avatar = usr.displayAvatarURL({ dynamic: false, size: 2048 }) ? usr.avatar : usr.user.displayAvatarURL({ size: 2048, dynamic: false })
                msg.client.user.setAvatar(avatar)
            }
            await msg.guild.members.me.setNickname(usr.displayName)
        } catch (e) {
            console.log(e);
        }
    }
}