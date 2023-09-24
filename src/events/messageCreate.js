const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if(message.author.bot) return;
    if(message.channel.id === "926126777502412823" || message.channel.id === "926126777502412824" || message.channel.id === "1107432861075771505" || message.channel.id === "926474490626572295"){
      message.delete(1)
      const emojiLoading = message.guild.emojis.cache.find((emoji) => emoji.name === "8104loadingemote");
      const embed = new EmbedBuilder()
        .setColor(0xfce700)
        .setTitle(`${emojiLoading} | ${message.channel.id === "926126777502412824" || message.channel.id === "926474490626572295" ? "Анкета-10" : "Анкета-9"} | На рассмотрении | ${message.channel.id === "1107432861075771505" || message.channel.id === "926474490626572295" ? "ГС Нелегалов" : "ГС/ЗГС Гос"}`)
        .setDescription(message.content)
        .setTimestamp()
        .setFooter({ text: message.member.displayName, iconURL: message.member.displayAvatarURL() });
      const confirm = new ButtonBuilder()
        .setCustomId('acceptMiddle')
        .setLabel("Одобрить")
        .setEmoji({name: "✅"})
        .setStyle(ButtonStyle.Success)

      const decline = new ButtonBuilder()
        .setCustomId('declineMiddle')
        .setLabel("Отказать")
        .setEmoji({name: "⛔"})
        .setStyle(ButtonStyle.Danger)

      const row = new ActionRowBuilder()
        .addComponents(confirm, decline);

      message.channel.send({content: `${message.guild.id === "926474490320408576" ? "<@&926474490421080071>" : "<@&926126773551382535>, <@&926126773551382533>"}`, embeds: [embed], components: [row]});
    } else if (message.channel.id === '1033401082413596782'){
      message.delete(1)
      const imageFields = [];
      if (message.attachments.size > 0) {
          message.attachments.forEach((attachment) => {
              if (attachment.url) {
                  const imageLink = `[тык](${attachment.url})`;
                  imageFields.push({
                      name: 'Изображение',
                      value: imageLink,
                      inline: true
                  });
              }
          });
      }

      const emojiLoading = message.guild.emojis.cache.find((emoji) => emoji.name === "8104loadingemote");

      const embed = new EmbedBuilder()
          .setTitle(`${emojiLoading} | Выдача ЧСП`)
          .setDescription(message.content)
          .setFooter({
              text: `${message.author.username}`,
              iconURL: message.author.displayAvatarURL()
          })
          .setTimestamp()
          .setColor(0xfce700)
          .addFields(imageFields);

      message.channel.send({
          content: "<@337095648610353175>",
          embeds: [embed],
          components: [
              new ActionRowBuilder()
                  .addComponents(
                      new ButtonBuilder()
                        .setCustomId('acceptCHSP')
                        .setLabel("Отказать")
                        .setEmoji({name: "✅"})
                        .setStyle(ButtonStyle.Success)
                  )
                  .addComponents(
                      new ButtonBuilder()
                        .setCustomId('declineCHSP')
                        .setLabel("Отказать")
                        .setEmoji({name: "⛔"})
                        .setStyle(ButtonStyle.Danger)
                  )
          ]
      }).then(message => {
          message.pin();
      });
    }
  },
};
