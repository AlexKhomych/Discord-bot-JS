const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Returns an embed."),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("This is an EMBED!")
      .setDescription("This is very cool description!")
      .setColor(0x1e2436)
      .setImage(interaction.client.user.displayAvatarURL())
      .setAuthor({
        url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .addFields([
        {
          name: "Field 1",
          value: "Field value 1",
          inline: true,
        },
        {
          name: "Field 2",
          value: "Field value 2",
          inline: true,
        },
        {
          name: "Filed 3",
          value: "Field value 3",
          inline: false,
        },
      ]);
    const { buttons } = interaction.client;
    const button_join = buttons.get(`button_join`);

    const { menus } = interaction.client;
    const select_menu = menus.get(`select_menu`);

    await interaction.reply({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          button_join.button_data
        ),
        new ActionRowBuilder().addComponents(
          select_menu.menu_data
        ),
      ],
    });
  },
};
