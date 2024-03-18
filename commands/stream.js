module.exports = {
    name: 'stream',
    async execute(msg, args) {
        let status = !args.length ? '⛧' : args.join(' ');
        let url = 'https://twitch.tv/y4zuna';
        let i = 0;

        if (!i) {
            await msg.client.user.setActivity(status, { type: 'STREAMING', url: url });
            i += 1
        } else {
            await msg.client.user.setActivity();
            i = 0
        }
    }
}