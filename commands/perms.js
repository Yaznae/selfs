module.exports = {
    name: 'perms',
    async execute(msg, args) {
        await msg.delete();

        function isNum(val) {
            return /^\d+$/.test(val);
        }
        
        let search = args.join(' ')
        let role

        try {
            if (msg.mentions.roles.size) {
                role = msg.mentions.roles.first();
            } else if (isNum(search)) {
                role = await msg.guild.roles.cache.get(search);
            } else {
                role = await msg.guild.roles.cache.find(r => r.name.startsWith(search));
            }
        } catch (err) {
            console.log(err)
            return msg.channel.send(`invalid **role** .`).then(message => {
                setTimeout(() => message.delete(), 3_000);
            }).catch(err => console.error(err));
        }

        let response = `**@${role.name}**\nperms :\n`
        let perms = role.permissions.toArray()
        response += `\`${perms.join('`, `')}\``
        return msg.channel.send(response);
    }
}