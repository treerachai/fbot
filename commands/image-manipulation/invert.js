module.exports = {
	description: 'Inverts an image\'s color',
	args: '(@user | Attachment | URL)',
	category: 'Fun',
	cooldown: 5000,
	run: async function (message, args) {
		const images = await this.utils.getImagesFromMessage(message, args);
		if (images.length === 0) return this.commandHandler.invalidArguments(message);

		let image = await this.utils.fetchImage(images[0]);
		if (image instanceof Error) return this.utils.handleCommandError(image, message);

		image = await image.invert();
		image = await this.utils.getBufferFromJimp(image);

		message.channel.send({
			files: [{
				attachment: image,
				name: 'invert.png'
			}]
		});
	}
};
