module.exports = {
    name: 'serverlarp',
    aliases: ['slarp'],
    async execute(msg, args) {
        await msg.delete();
        if (msg.guild == null) return;
        if (!msg.mentions.members.size) return;

        const usr = msg.mentions.members.first();

        try {
            msg.client.user.setAvatar(usr.displayAvatarURL({ size: 2048, dynamic: true }));
            msg.guild.members.fetch(msg.client.user.id).then((me) => {
                me.setNickname(usr.nickname);
            })
        } catch (e) {
            console.log(e);
        }
    }
}