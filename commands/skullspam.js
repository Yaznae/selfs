module.exports = {
    name: 'skullspam',
    aliases: ['sks'],
    async execute(msg, args) {
        let channel = msg.channel;
        await msg.delete();
        if (!args.length) return;

        let skulls = ["☠️☠️", "☠️", "☠️"];
        let i = 0;
        if (!parseInt(args[0])) return;

        while (i < parseInt(args[0])) {
            let choice = Math.floor(Math.random() * 3);
            channel.send(skulls[choice]);
            i++;
        };
    }
}