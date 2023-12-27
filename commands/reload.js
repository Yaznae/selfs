const fs = require('node:fs');

module.exports = {
    name: 'reload',
    aliases: ['rel'],
    async execute(msg, args) {
        let cmds = [];
        let errs = [];
        console.log(args)
        await msg.delete();
        args.forEach(arg => {
            const cmdName = arg.toLowerCase();
            const cmd = msg.client.commands.get(cmdName) || msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

            if (!cmd) {
                return msg.channel.send(`there is no **command** with the name \`${cmdName}\` .`).then(message => {
                    setTimeout(() => message.delete(), 5_000);
                }).catch(err => console.error(err));
            }

            const fName = fs.readdirSync('./commands').find(file => file.includes(`${cmdName}.js`));

            delete require.cache[require.resolve(`./${cmd.name}.js`)];

            try {
                const newCmd = require(`./${cmd.name}.js`);
                msg.client.commands.set(newCmd.name, newCmd);
                return cmds.push(newCmd.name)
            } catch (err) {
                console.error(err);
                return errs.push(cmdName)
            };
        })
        if (cmds.length) {
            return msg.channel.send(`the following commands were **reloaded** successfully :\n\`${cmds.join('`, `')}\``).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        }
        if (errs.length) {
            return msg.channel.send(`there were **problems** reloading the following commands :\n\`${errs.join('`, `')}\``).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        };
    },
};