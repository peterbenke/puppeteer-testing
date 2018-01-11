/*

Example createScreenshotsDOMElementForViewPorts

*/

const config = require('../config');
const puppeteer = require('puppeteer');

(async () => {

	await config.init();

	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();

	await config.createScreenshotsDOMElementForViewPorts(
		page,
		{
			pagePath: 'index.php?id=143',
			selector: '#c161',
			imageName: 'test-555',
			styleDefinitions: '#tx_cookies{ display:none; }'
		}
	);

	await browser.close();
	console.log('Finished...');

})();
