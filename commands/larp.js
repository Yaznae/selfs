module.exports = {
    name: 'larp',
    async execute(msg, args) {
        await msg.delete();
        if (!msg.mentions.users.size) return;

        const usr = msg.mentions.users.first();

        try {
            await msg.client.user.setAvatar(usr.displayAvatarURL({ size: 2048, dynamic: true }));
            await msg.client.user.setGlobalName(usr.globalName);
        } catch (e) {
            console.log(e);
        }
    }
}