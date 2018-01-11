/*

Test 04 : J.V.
--------------------------------------------------------------------------------------------------------------------------------------------

With Create folders needs

npm i mkdirp
npm i object.values


*/


const config = require('../config');
const puppeteer = require('puppeteer');
const fs = require('fs');
config.init( ) ;
config.compareImages( fs , { imageName: 'test-555-lg.png' }) ;


