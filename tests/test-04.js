/*

Test 04 : J.V.
--------------------------------------------------------------------------------------------------------------------------------------------

With Create folders needs

npm i mkdirp
npm i object.values


*/


const config2 = require('./config2');
const puppeteer = require('puppeteer');
config2.init( ) ;

const imageName = 'allplan-01';

config2.createScreenshotsForViewPorts({
	imageName: 'allplan-01'
});
// console.log('Finished...');

