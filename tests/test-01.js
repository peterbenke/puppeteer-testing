/*

Test 01
--------------------------------------------------------------------------------------------------------------------------------------------

Create screenshots for all viewports

*/

const config = require('./config');

const puppeteer = require('puppeteer');
const imageName = 'allplan-01';

(async () => {

	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();

	for (let viewPort in config.viewPorts) {
	  if (config.viewPorts.hasOwnProperty(viewPort)) {

		let viewPortWidth = config.viewPorts[viewPort].width;
		let viewPortHeight = config.viewPorts[viewPort].height;
		let imagePath = config.compareFolders.results + '/' + imageName + '-' + viewPort + '.png';

		await page.setViewport({ width: viewPortWidth, height: viewPortHeight });
		await page.goto(config.baseUri);
		await page.screenshot({path: imagePath});
		console.log('Create screenshot: ' + imagePath);

		// console.log(viewPort);
		// console.log(viewPortWidth);
		// console.log(viewPortHeight);
		// console.log(imagePath);

	  }
	}

	// Result image (to caompare with base image)
	// await page.screenshot({path: config.compareFolders.results + '/allplan-07.png'});
	await browser.close();

	console.log('Finished...');

})();
