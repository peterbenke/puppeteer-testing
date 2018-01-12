/*

Example replaceElementsBySelectorWithElement -> will replace all

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
	await page.screenshot({path: 'image-04-before.png'});



	await config.replaceElementsBySelectorWithElement(
		page,
		{
			elementToReplace: '#nav-main LI',
			newElementTag: '',
			newElementContent: '<a href="#">Dummy2</a>',
		}
	);



	// Afterwards
	await page.screenshot({path: 'image-04-afterwards.png'});

	await browser.close();
	console.log('Finished...');

})();
