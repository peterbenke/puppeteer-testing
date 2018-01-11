/*

Example createScreenshotsForViewPorts

*/


const config = require('../config');
const puppeteer = require('puppeteer');

const imageName = 'allplan-01';

config.createScreenshotsForViewPorts({
	imageName: 'allplan-01'
});
// console.log('Finished...');

