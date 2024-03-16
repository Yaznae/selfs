module.exports = {
    name: 'help',
    aliases: ['h'],
    async execute(msg, args) {
        await msg.delete();
        const prefix = process.env.PREFIX
        const helpMessage = `
\`::\` here are the available commands:

- \`${prefix}stealpfp @user\`
- \`${prefix}help\`
- \`${prefix}skullspam [amount]\`
- \`${prefix}afk\`
- \`${prefix}spam [amount] [message]\`
- \`${prefix}ladder [message]\`
- \`${prefix}banner @user\`
- \`${prefix}avatar @user\`
- \`${prefix}serveravatar @member\`
- \`${prefix}larp @user\`
- \`${prefix}serverlarp @member\`
- \`${prefix}copy @user\`
- \`${prefix}grabip @user\`
- \`${prefix}stream [text]\`
- \`${prefix}image [query]\`

`;

        return msg.channel.send(helpMessage);
    }
}