module.exports = {
    name: 'lock',
    async execute(msg, args) {
        await msg.delete();

        if (msg.channel.type !== 'GROUP_DM') {
            return msg.channel.send(`this is not a **group chat** .`).then((message) => {
                setTimeout(() => message.delete(), 3_000);
            }).catch(err => console.error(err));
        }

        if (msg.channel.owner.id !== msg.author.id) {
            return msg.channel.send(`i am not the **group chat owner** .`).then((message) => {
                setTimeout(() => message.delete(), 3_000);
            }).catch(err => console.error(err));
        }

        let gc = msg.channel.id;

        if (msg.client.lockedGCs.get('IDs')) {
            let ids = msg.client.lockedGCs.get('IDs');
            if (ids.includes(gc)) {
                ids.splice(ids.findIndex(gc), 1)
                msg.client.lockedGCs.set('IDs', ids)

                return msg.channel.send(`unlocked **${msg.channel.name}** .`);
            } else {
                ids.push(gc)

                return msg.channel.send(`**${msg.channel.name}** was locked by **@${msg.client.user.displayName}`)
            }
        }

        msg.client.lockedGCs.set('IDs', [gc]);
        return msg.channel.send(`**${msg.channel.name}** was locked by **@${msg.client.user.displayName}`)
    }
}