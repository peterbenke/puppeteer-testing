/*

Example fill form and submit

*/

const config = require('../config');

const puppeteer = require('puppeteer');
const imageName = 'allplan-powermail';
const pagePath = 'index.php?id=143';


(async () => {

	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();

	/**
	 * Takes a screenshot of a DOM element on the page, with optional padding.
	 *
	 * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
	 * @return {!Promise<!Buffer>}
	 */
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


	await page.setViewport({ width: 1800, height: 1000 });
	await page.goto(config.baseUri + pagePath);

	// Hide the cookie bar
	await page.addStyleTag({content: '#tx_cookies{ display:none; }'});

	// 1. screenshot: start
	await screenshotDOMElement({
		path: 'comparisonResults/test-01.png',
		selector: '#c161'
	});

	await page.click('#c161 input[type="submit"]');
	await page.waitForSelector('.parsley-required');

	// 2. screenshot: submit with errors, because form is empty
	await screenshotDOMElement({
		path: 'comparisonResults/test-02.png',
		selector: '#c161'
	});

	await page.type('#powermail_field_salutation_mandatory', 'Mr.');
	await page.type('#powermail_field_first_name_mandatory', 'Hans');
	await page.type('#powermail_field_last_name_mandatory', 'Meier');
	await page.type('#powermail_field_company', 'Allplan GmbH');
	await page.type('#powermail_field_street_mandatory', 'Konrad Zuse-Platz 1');
	await page.type('#powermail_field_zip_mandatory', '81829');
	await page.type('#powermail_field_city_mandatory', 'München');
	await page.type('#powermail_field_country_mandatory', 'DE');

	// 3. screenshot: filled form
	await screenshotDOMElement({
		path: 'comparisonResults/test-03.png',
		selector: '#c161'
	});

	await page.click('#c161 input[type="submit"]');
	await page.waitForSelector('#c162');

	// 4. screenshot: answer page
	await screenshotDOMElement({
		path: 'comparisonResults/test-04.png',
		selector: '#c162'
	});

	await browser.close();

	console.log('Finished...');

})();
