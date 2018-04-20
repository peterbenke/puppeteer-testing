/*

Example createScreenshotsDOMElementForViewPorts

*/

const config = require('./base');
const puppeteer = require('puppeteer');
const values = require('object.values');

const testsArray = require('./connect-tests_small');

(async () => {

	await config.init();

    // ********  +++ overwrite some Basic Settings  ++++ *******************
    // normaly
    // 0 = no Output, only errors , 1 = normal Output , 2 = full
    //    config.debugLevel = 2 ;

    //	config.baseUri = 'https://connect.allplan.com/' ;
    //	config.compareFolderRoot.basePath = './images' ;
    // ********  --- overwrite some Basic Settings	 ---- *****************

	const browser = await puppeteer.launch(config.browserOptions);
	const page = await browser.newPage();
	let allTests = values(testsArray) ;
	for (let i in allTests )  {
	    if( config.debugLevel > 0 ) {
	        console.log(i);
	    }
        let singleTest = allTests[i] ;
        if( config.debugLevel > 0 ) {
            console.log('.......... Next Test .........') ;
            console.log (singleTest ) ;
        }
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
            if( config.debugLevel > 0 ) {
                console.log('.......... end of Test ' + i + ' .........\n\n') ;
            }
    }


	await browser.close();

	console.log('\nFinished...');

})();
