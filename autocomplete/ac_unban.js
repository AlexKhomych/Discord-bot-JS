module.exports = {
  name: "unban",
  choices: null,
  async execute(interaction) {
    const { client, guildId } = interaction;
    const ban_list = client.bans.get(guildId);
    this.choices = Array.from(ban_list.keys());
  },
};
