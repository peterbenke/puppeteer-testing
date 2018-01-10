/*

Test 02
--------------------------------------------------------------------------------------------------------------------------------------------

Create the same screenshots as in Test 01, but with an outsourced function

*/


const config = require('./config');
const puppeteer = require('puppeteer');

const imageName = 'allplan-01';

config.createScreenshotsForViewPorts({
	imageName: 'allplan-01'
});
// console.log('Finished...');

