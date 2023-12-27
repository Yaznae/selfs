const colors = require('colors');

module.exports = {
    name: 'channelRecipientAdd',
    async execute(c, u) {
        let ids = c.client.lockedGCs.get('IDs');
        if (ids.includes(c.id)) {
            try {
                await c.removeMember(u);
            } catch (err) {
                console.error(`# no perms at ${c.name}`)
            }
        } else return;
    }
}