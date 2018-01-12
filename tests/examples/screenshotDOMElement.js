/*

Example screenshotDOMElement

*/

const config = require('../config');
const puppeteer = require('puppeteer');


(async () => {

	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();

	await page.setViewport({ width: 1200, height: 800 });
	await page.goto('https://connect.local/register.html');

	// Hide the cookie bar
	await page.addStyleTag({content: 'body #cookiePolicyBar{ width:0; overflow:hidden ; height: 0 ;}  .invisibleInTest { display:none; }'});

	await config.screenshotDOMElement(page, {
		path: 'test-1234567890.png',
		selector: 'body'
	});

	await browser.close();
	console.log('Finished...');

})();
