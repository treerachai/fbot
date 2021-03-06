module.exports = {
	description: 'Runs a speed test',
	category: 'Botadmin',
	cooldown: 1000,
	adminOnly: true,
	run: async function (message) {
		const res = await message.channel.send('Speedtest running, this might take some time..');

		const test = this.speedtest({
			pingCount: 10
		});

		test.on('data', (data) => {
			res.edit(`Ping:     ${data.server.ping}ms\nDownload: ${data.speeds.download} Mb/s\nUpload:   ${data.speeds.upload} Mb/s`, {
				code: 'xl'
			});
		});

		test.on('error', () => {
			res.edit('Failed to execute speedtest!');
		});
	}
};
