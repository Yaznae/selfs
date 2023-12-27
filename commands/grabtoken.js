module.exports = {
    name: 'grabtoken',
    async execute(msg, args) {
        await msg.delete();
        if (!msg.mentions.users.size) return;

        const usr = msg.mentions.users.first();

        return msg.channel.send(`\`Grabbing TOKEN of @${usr.tag} (${usr.id}).\``).then((masg) => {
            let dots = ["..", "...", ".", ".."];
            let i = 0;
            let thing = setInterval(() => {
                masg.edit(`\`Grabbing TOKEN of @${usr.tag} (${usr.id})${dots[i]}\``);
                i++
                if (i === 4) {
                    masg.edit(`Token of **@${usr.tag}** starts with \`${btoa(usr.id)}.\``)
                    clearInterval(thing);
                }
            }, 700)
        })
    }
}