
// make a copy of this file and name it testsuite.js
// adjust it to your needs.
// change config_local.TestSuiteFile from testsuite_example.js to  testsuite.js

module.exports = {
   test01: {
            pagePath: 'index.php?id=143',
            selector: '#c161',
            imageName: "test-01" ,
            styleDefinitions: '#tx_cookies{ display:none; }',

        },
    test02: {
            pagePath: 'index.php?id=143',
            selector: 'BODY',
            imageName: 'test-jv-001',
            styleDefinitions: '#tx_cookies{ display:none; }',
            replaceDomElements: {
                 r001:   {
                        elementToReplace: 'FIELDSET legend.powermail_legend',
                        newElementTag: 'div',
                        newElementContent: 'Standard Legende',
                    },
        },
    }
};

