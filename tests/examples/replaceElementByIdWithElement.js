/*

Example replaceElementByIdWithElement

*/

const config = require('../config');
const puppeteer = require('puppeteer');

(async () => {

	await config.init();

	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();

	await page.setViewport({ width: 1800, height: 1000 });
	await page.goto('https://allplan.local/');

	// Before
	await page.screenshot({path: 'image-01-before.png'});



	await config.replaceElementByIdWithElement(
		page,
		{
			elementToReplace: 'tools',
			newElementTag: 'div',
			newElementContent: 'Hello world',
		}
	);



	// Afterwards
	await page.screenshot({path: 'image-02-afterwards.png'});

	await browser.close();
	console.log('Finished...');

})();
