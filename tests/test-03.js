/*

Test 01
--------------------------------------------------------------------------------------------------------------------------------------------

Create screenshots for all viewports

*/

const config = require('./config');

const puppeteer = require('puppeteer');
const imageName = 'allplan-powermail';
const pagePath = 'index.php?id=143';


(async () => {

	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();

	console.log(page);
	process.exit();


	await page.setViewport({ width: 1800, height: 1000 });
	await page.goto(config.baseUri + pagePath);

	/**
	 * Takes a screenshot of a DOM element on the page, with optional padding.
	 *
	 * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
	 * @return {!Promise<!Buffer>}
	 */
/*
	async function screenshotDOMElement(opts = {}) {
		const padding = 'padding' in opts ? opts.padding : 0;
		const path = 'path' in opts ? opts.path : null;
		const selector = opts.selector;

		if (!selector)
			throw Error('Please provide a selector.');

		const rect = await page.evaluate(selector => {
			const element = document.querySelector(selector);
		if (!element)
			return null;
		const {x, y, width, height} = element.getBoundingClientRect();
		return {left: x, top: y, width, height, id: element.id};
	}, selector);

		if (!rect)
			throw Error(`Could not find element that matches selector: ${selector}.`);

		return await page.screenshot({
			path,
			clip: {
				x: rect.left - padding,
				y: rect.top - padding,
				width: rect.width + padding * 2,
				height: rect.height + padding * 2
			}
		});
	}
*/

	await screenshotDOMElement({
		path: 'comparisonResults/test-01.png',
		selector: '#c161'
	});

	// await page.screenshot({path: 'comparisonResults/test-01.png'});


	// Result image (to caompare with base image)
	// await page.screenshot({path: config.compareFolders.results + '/allplan-07.png'});
	await browser.close();

	console.log('Finished...');

})();
