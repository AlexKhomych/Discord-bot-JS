const { SelectMenuBuilder } = require('discord.js')

module.exports = {
  menu_data: new SelectMenuBuilder()
    .setCustomId("select_menu")
    .setPlaceholder("SELECT ME!")
    .addOptions(
      {
        label: "First option",
        description: "Idk",
        value: "Really don't know",
      },
      {
        label: "Second option",
        description: "Idk too",
        value: "Ask someone else",
      }
    ),
  async execute(interaction) {
    value = interaction.values[0];
    await interaction.reply({
      content: `Welp.. ${value}`,
      ephemeral: true,
    });
  },
};
