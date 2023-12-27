module.exports = {
    name: 'stealpfp',
    aliases: ['stealavatar', 'stealav'],
    async execute(msg, args) {
        await msg.delete();
        if (!msg.mentions.users.size) return;

        msg.client.user.setAvatar(msg.mentions.users.first().displayAvatarURL({ size: 2048, dynamic: true }))
    }
}