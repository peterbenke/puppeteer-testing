/*

Test comparing images  : J.V.
--------------------------------------------------------------------------------------------------------------------------------------------
Steps to use and understand this test
- start this test. Maybe you need to adjust the config
- if config_loclal exists, now the eneeded Comparisation Folder will also exist
- Copy an Image file test-555-lg.png to "compareFolderRoot" / "compareFolderResult"
- as comparison/Base is empty, the file from comparison/Result will be copied there

- as both files are now identically, the test will work

- modify the result file with photoshop
- restart this test

- now the test will generate an image in failure

*/


const config = require('../config');
const puppeteer = require('puppeteer');

config.init( ) ;
config.compareImages( { imageName: 'test-555-lg.png',  tolerance: '2.5' , highlightColor: '#FF00FF' }) ;
