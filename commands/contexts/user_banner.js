const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");
const axios = require("axios");
require("dotenv").config();

const TOKEN = process.env.TOKEN;

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("User banner")
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    const { id, username } = interaction.targetUser;
    axios.get(`https://discord.com/api/users/${id}`, {
      headers: {
        Authorization: `Bot ${TOKEN}`,
      },
    }).then((res) => {
        const { banner } = res.data;
        if (banner) {
            const extension = banner.startsWith("a_") ? ".gif" : ".png";
            const url = `https://cdn.discordapp.com/banners/${id}/${banner}${extension}?size=1024`;
            interaction.reply({
                content: `${url}`,
                ephemeral: true,
              });
        }else{
            interaction.reply({
                content: `${username} doesn't have a banner`,
                ephemeral: true,
              });
        }
    });
  },
};
