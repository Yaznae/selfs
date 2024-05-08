module.exports = {
    name: 'owner',
    async execute(msg, args) {
        await msg.delete();
        if (!msg.guild) return;

        let owner = await msg.guild.members.fetch(msg.guild.ownerId);
        console.log(owner)
        return msg.channel.send(`guild owner name: **${owner.displayName}** \`(@${owner.user.username})\`\nguild owner id: \`${owner.id}\``)
    }
}