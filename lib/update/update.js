const updateNotifier = require('update-notifier')
const chalk = require('chalk')
const pkg = require('../../package.json')

const notifier = updateNotifier({
	pkg,
	updateCheckInterval: 1000,
})

function updateVer() {
	if (notifier.update) {
		console.log(`New version ${chalk.green(notifier.update.latest)} found, please update`)
		notifier.notify()
	} else {
		console.log('There is no updatable version')
	}
}

module.exports = updateVer