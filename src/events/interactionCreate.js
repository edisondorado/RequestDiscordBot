const { Events, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isButton()){
		if (interaction.customId === "acceptMiddle"){
			if(!interaction.member.roles.cache.has("926126773551382535") && !interaction.member.roles.cache.has("926126773551382533")) return;
			const emojiLoading = interaction.guild.emojis.cache.find((emoji) => emoji.name === "8104loadingemote");
			const existingEmbed = interaction.message.embeds[0];
			const updatedEmbed = new EmbedBuilder(existingEmbed)
				.setTitle(`${emojiLoading} | ${interaction.channel.id === "926126777502412824" || interaction.channel.id === "926474490626572295" ? "Анкета-10" : "Анкета-9"} | На рассмотрении | Тех.Администрация`);
			const updatedButtons = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('acceptFinal')
						.setLabel("Одобрить")
						.setEmoji({name: "✅"})
						.setStyle(ButtonStyle.Success),
					new ButtonBuilder()
						.setCustomId('declineMiddle')
						.setLabel("Отказать")
						.setEmoji({name: "⛔"})
						.setStyle(ButtonStyle.Danger)
				)
			interaction.message.edit({
				content: `${interaction.guild.id === "926474490320408576" ? "<@&926474490421080068>" : "<@&1089118564713242625>"}`,
				embeds: [updatedEmbed],
				components: [updatedButtons]
			})
			interaction.message.channel.send(`${interaction.guild.id === "926474490320408576" ? "<@&926474490421080068>" : "<@&1089118564713242625>"}`).then((message) => message.delete(1))
			interaction.reply({content: "Вы успешно одобрили анкету.", ephemeral: true})
		} else if(interaction.customId === 'acceptFinal') { 
			if(!interaction.member.roles.cache.has("1089118564713242625")) return;
			const existingEmbed = interaction.message.embeds[0];
			const updatedEmbed = new EmbedBuilder(existingEmbed)
				.setTitle(`✅ | ${interaction.channel.id === "926126777502412824" || interaction.channel.id === "926474490626572295" ? "Анкета-10" : "Анкета-9"} | Одобрена`)
				.setColor(0x00ff00)
			interaction.message.edit({
				content: "",
				embeds: [updatedEmbed],
				components: []
			})
			interaction.reply({content: "Вы успешно одобрили анкету.", ephemeral: true})
		} else if (interaction.customId === "declineMiddle") {
			if(!interaction.member.roles.cache.has("926126773551382535") && !interaction.member.roles.cache.has("926126773551382533") && !interaction.member.roles.cache.has("1089118564713242625") && !interaction.member.roles.cache.has('926474490421080068') && !interaction.member.roles.cache.has('926474490421080071')) return;
			const modal = new ModalBuilder()
				.setTitle("Отказать анкету")
				.setCustomId("declineMiddleModal")
				.setComponents(
					new ActionRowBuilder().setComponents(
							new TextInputBuilder()
								.setLabel('Причина')
								.setCustomId("reasonDecline")
								.setStyle(TextInputStyle.Paragraph)
					)
				);
			interaction.showModal(modal);
		} else if (interaction.customId === 'acceptCHSP'){
			if (interaction.member.id !== "337095648610353175") return;
			const updatedEmbed = new EmbedBuilder(interaction.message.embeds[0])
				.setTitle('✅ | Выдача ЧСП')
				.addFields({name: `${interaction.member.displayName}`, value: "Одобрил"})
				.setColor(0x00ff00)
			interaction.message.edit({
				content: '',
				embeds: [updatedEmbed],
				components: []
			})
			interaction.reply({content: "Вы успешно одобрили запрос.", ephemeral: true})
		} else if (interaction.customId === 'declineCHSP'){
			if (interaction.member.id !== "337095648610353175") return;
			const updatedEmbed = new EmbedBuilder(interaction.message.embeds[0])
				.setTitle('⛔ | Выдача ЧСП')
				.addFields({name: `${interaction.member.displayName}`, value: "Отказал"})
				.setColor(0xff0000)
			interaction.message.edit({
				content: '',
				embeds: [updatedEmbed],
				components: []
			}).then(message => message.unpin())
			interaction.reply({content: "Вы успешно отказали запрос.", ephemeral: true}).then
		}

	} else if(interaction.type === InteractionType.ModalSubmit){
		if(interaction.customId === "declineMiddleModal"){
			const reason = interaction.fields.getTextInputValue('reasonDecline');
			const existingEmbed = interaction.message.embeds[0];
			const updatedEmbed = new EmbedBuilder(existingEmbed)
				.setTitle(`⛔ | ${interaction.channel.id === "926126777502412824" || interaction.channel.id === "926474490626572295" ? "Анкета-10" : "Анкета-9"} | Отказано`)
				.addFields({name: `${interaction.member.displayName} • Отказал`, value: `Причина: ${reason}`})
				.setColor(0xff0000)
			interaction.message.edit({
				content: "",
				embeds: [updatedEmbed],
				components: []
			})
			interaction.reply({content: "Вы успешно отказали анкету.", ephemeral: true})
			return true;
		}
	}
  },
};
