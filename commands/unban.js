const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unbans the user by given id")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("User to unban!")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async execute(interaction) {
    const isValid = interaction.memberPermissions.has([
      PermissionsBitField.Flags.BanMembers,
    ]);
    if (!isValid) {
      await interaction.reply({
        content: `You don't have BanMembers permission to execute this command.`,
        ephemeral: true,
      });
      return;
    }
    
    const { client, guild, guildId } = interaction;
    const user = interaction.options.getString("user");
    const id = client.bans.get(guildId).get(user);
    reply = "";
    if (id === undefined) {
      reply = `${user} was not found.`;
    } else {
      guild.members.unban(id);
      client.bans.get(guildId).delete(user);
      reply = `${user} was successfuly unbaned.`;
    }

    await interaction.reply({
      content: reply,
      ephemeral: true,
    });
  },
};
