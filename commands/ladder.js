module.exports = {
    name: 'ladder',
    aliases: ['ldr'],
    async execute(msg, args) {
        await msg.delete();

        if (!args.length) return;

        for (const i of args) {
            await msg.channel.send(i);
        }
    }
}