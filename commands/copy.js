module.exports = {
    name: 'copy',
    async execute(msg, args) {
        await msg.delete();
        if (!msg.mentions.users.size) return;

        let usr = msg.mentions.users.first();

        if (msg.client.copy.get('user')) {
            let usr = await msg.client.users.cache.get(msg.client.copy.get('user'));
            await msg.channel.send(`stopped copying **@${usr.username}** .`).then((message) => {
                setTimeout(() => message.delete(), 3_000);
            }).catch(err => console.error(err));
            return msg.client.copy.set('user', null);
        }

        if (usr.id == msg.client.user.id) return;

        msg.client.copy.set('user', usr.id);
        return msg.channel.send(`now copying **@${usr.username}** .`).then((message) => {
            setTimeout(() => message.delete(), 3_000);
        }).catch(err => console.error(err));
    }
}