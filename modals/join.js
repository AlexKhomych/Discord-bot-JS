const { ActionRowBuilder, TextInputBuilder } = require("@discordjs/builders");
const { ModalBuilder, TextInputStyle } = require("discord.js");

module.exports = {
  modal_data: new ModalBuilder()
    .setCustomId("join")
    .setTitle("Join request")
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("name")
          .setLabel(`What's your name?`)
          .setStyle(TextInputStyle.Short)
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("age")
          .setLabel(`How old are you?`)
          .setStyle(TextInputStyle.Short)
      )
    ),
  async execute(interaction) {
    const name = interaction.fields.getTextInputValue("name");
    const age = parseInt(interaction.fields.getTextInputValue("age"));
    interaction.reply({
      content: `Your name is ${name} and your age is ${age}`,
      ephemeral: true,
    });
  },
};
