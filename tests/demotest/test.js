const puppeteer = require('puppeteer');

(async () => {

	const args = [
	];

	const options = {
		args,
		ignoreHTTPSErrors: true,
	};

	const browser = await puppeteer.launch(options);
	const page = await browser.newPage();

	await page.setViewport({ width: 1960, height: 1000 })
	await page.goto('https://example.com');
	await page.screenshot({path: 'example-com.png'});
	await browser.close();

	console.log('Done...');

})();