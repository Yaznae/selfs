module.exports = {
    name: 'stream',
    async execute(msg, args) {
        await msg.delete();
        let status = !args.length ? '⛧' : args.join(' ');
        let url = 'https://twitch.tv/y4zuna';
        let i = 0;

        if (!i) {
            await msg.client.user.setActivity(status, { type: 'STREAMING', url: url });
            i += 1
        } else {
            await msg.client.user.setPresence({ activity: null });
            i = 0
        }
    }
}