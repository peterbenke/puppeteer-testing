
// make a copy of this file and name it testsuite.js
// adjust it to your needs.
// change config_local.TestSuiteFile from testsuite_example.js to  testsuite.js

module.exports = {

    Conntest02: {
            pagePath: 'register.html',
            selector: '#mainContent',
            imageName: 'Conn-test-002',
            styleDefinitions: 'body #cookiePolicyBar{ width:0; overflow:hidden ; } .invisibleInTest { display:none; }',
            replaceDomElements: {
                 r001:   {
                        elementToReplace: '#mainContent #c8805',
                        newElementTag: 'div',
                        newElementContent: 'Default Intro Text das ist SEHR neu',
                    },
                 r002:   {
                         elementToReplace: '.invisibleInTest',
                         newElementTag: 'div',
                         newElementContent: '<br />',
                     },
                 r003:   {
                          elementToReplace: '#cookiePolicyBar',
                          newElementTag: '',
                          newElementContent: '<br />',
                      },

        },
    }
}

