const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const { modals } = interaction.client;
    const modal = modals.get(`join`);
    
    await interaction.showModal(modal.modal_data);
  },
};
