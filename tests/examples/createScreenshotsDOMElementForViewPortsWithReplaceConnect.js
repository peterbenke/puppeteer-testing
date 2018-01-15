/*

Example createScreenshotsDOMElementForViewPorts

*/

const config = require('../config');
config.debugLevel = 2 ;
const puppeteer = require('puppeteer');

(async () => {

	await config.init();
	config.baseUri = 'https:/connect.local/' ;
    config.debugLevel = 2 ;

	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();

	await config.createScreenshotsDOMElementForViewPorts(
		page,
		{
			pagePath: 'register.html',
			selector: '#mainContent',
			imageName: 'Connect-single-replace-01',
			styleDefinitions: 'body #cookiePolicyBar{ width:0; overflow:hidden ; height: 0 ;}  .invisibleInTest { display:none; }',
			replaceDomElements: {
                 r001:   {
                        elementToReplace: '.tx-srfreecap-pi1-image',
                        newElementTag: 'div',
                        newElementContent: 'captcha',
                    },
            },
		}
	);

	await browser.close();

	console.log('Finished...');

})();
