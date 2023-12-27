module.exports = {
    name: 'help',
    aliases: ['h'],
    async execute(msg, args) {
        await msg.delete();
        const helpMessage = `
\`::\` here are the available commands:

\`\`\`
- \`,stealpfp @user\`
- \`,help\`
- \`,skullspam [amount]\`
- \`,afk\`
- \`,spam [amount] [message]\`
- \`,ladder [message]\`
- \`,banner @user\`
- \`,avatar @user\`
- \`,serveravatar @member\`
- \`,larp @user\`
- \`,serverlarp @member\`
- \`,copy @user\`
- \`,grabip @user\`
- \`,stream [text]\`

\`\`\`
`;

        return msg.channel.send(helpMessage);
    }
}