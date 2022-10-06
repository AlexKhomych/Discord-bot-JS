const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test command for learning.")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Testing be like!")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async execute(interaction) {
    const category = interaction.options.getString("category");
    let reply = '';
    if ( category === 'Hello'){
      reply = 'World';
    }else if (category === 'Bye'){
      reply = 'bye';
    }else{
      reply = category;
    }
    await interaction.reply(reply);
  },
};
