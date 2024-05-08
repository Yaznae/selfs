module.exports = {
    name: 'larp',
    async execute(msg, args) {
        await msg.delete();
        if (!msg.mentions.users.size) return;

        const usr = msg.mentions.users.first();

        try {
            await msg.client.user.setAvatar(usr.displayAvatarURL({ size: 2048, dynamic: true }));
            if (!msg.guild) {
                await msg.client.user.setGlobalName(usr.globalName);
            } else {
                await msg.guild.members.me.setNickname(usr.globalName)
            }
        } catch (e) {
            console.log(e);
        }
    }
}