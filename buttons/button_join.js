const { ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  button_data: new ButtonBuilder()
    .setCustomId("button_join")
    .setLabel("Join")
    .setStyle(ButtonStyle.Success)
    .setEmoji(":3bears:1007126180970909726"),
  async execute(interaction) {
    const { tnttag } = interaction.client;
    const id = interaction.user.id;
    let reply;
    if (tnttag.has(id)) {
      tnttag.delete(id);
      reply = "You left the game!";
    } else {
      tnttag.set(id, true);
      reply = "You joined succesfully!";
    }
    await interaction.reply({
      content: `${reply}\nCurrent number of players ${tnttag.size}`,
      ephemeral: true,
    });
  },
};
