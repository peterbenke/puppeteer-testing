/*

Example createScreenshotsDOMElementForViewPorts

*/

const config = require('../config');
config.debugLevel = 2 ;
const puppeteer = require('puppeteer');

(async () => {

	await config.init();

	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();

	await config.createScreenshotsDOMElementForViewPorts(
		page,
		{
			pagePath: 'index.php?id=143',
			selector: 'BODY',
			imageName: 'test-jv-001',
			styleDefinitions: '#tx_cookies{ display:none; }',
			replaceDomElements: {
                 r001:   {
                        elementToReplace: 'FIELDSET legend.powermail_legend',
                        newElementTag: 'div',
                        newElementContent: 'Default Legende',
                    },
            },
		}
	);

	await browser.close();

	console.log('Finished...');

})();
