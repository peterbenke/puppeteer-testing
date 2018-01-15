/*

Example createScreenshotsDOMElementForViewPorts

*/

const config = require('./config');
const puppeteer = require('puppeteer');
const values = require('object.values');

const testsArray = require('./allplan-tests');

(async () => {

	await config.init();

        // config.baseUri = 'https:/allplan.local/' ;
        // config.debugLevel = 1 ;


	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();
	let allTests = values(testsArray) ;
	for (let i in allTests )  {
        let singleTest = allTests[i] ;
        console.log (singleTest ) ;
        const pagePath = 'pagePath' in singleTest ? singleTest.pagePath : 'index.php';
        const selector = 'selector' in singleTest ? singleTest.selector : 'BODY';
        const imageName = 'imageName' in singleTest ? singleTest.imageName : 'test-image-name-missing';
        const styleDefinitions = 'styleDefinitions' in singleTest ? singleTest.styleDefinitions : '';
        const replaceDomElements = 'replaceDomElements' in singleTest ? singleTest.replaceDomElements : false ;

        await config.createScreenshotsDOMElementForViewPorts(
                page,
                {
                    pagePath: pagePath ,
                    selector: selector,
                    imageName: imageName ,
                    styleDefinitions: styleDefinitions,
                    replaceDomElements: replaceDomElements
                }
            );
    }


	await browser.close();

	console.log('Finished...');

})();
