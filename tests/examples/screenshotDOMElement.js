/*

Example screenshotDOMElement

*/

const config = require('../config');
const puppeteer = require('puppeteer');


(async () => {

	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();

	await page.setViewport({ width: 1800, height: 1000 });
	await page.goto('https://allplan.local/index.php?id=143');

	// Hide the cookie bar
	await page.addStyleTag({content: '#tx_cookies{ display:none; }'});

	await config.screenshotDOMElement(page, {
		path: 'comparisonResults/test-1234567890.png',
		selector: '#c161'
	});

	await browser.close();
	console.log('Finished...');

})();
