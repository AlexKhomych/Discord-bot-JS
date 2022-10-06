module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Preloading bans...`);
    ids = client.guilds.cache.keys();
    for ( id of ids){
      const guild = client.guilds.cache.get(id);
      const bans = await guild.bans.fetch();
      const banned_members = new Map(bans.map((ban) => { return [ban.user.tag, ban.user.id]}));
      client.bans.set(guild.id, banned_members);
    }
    console.log(`Logged in as ${client.user.tag}`);
  },
};
