
// make a copy of this file and name it testsuite.js
// adjust it to your needs.
// change config_local.TestSuiteFile from testsuite_example.js to  testsuite.js

module.exports = {
    Conntest001: {
        // testen ob die Navigation in Deutsch gerendert wird
        pagePath: 'de.html',
        selector: '#wrapper-nav-main',
        imageName: 'Conn-test-navigation-001',
        styleDefinitions: '.invisibleInTest { display:none; }',

    }

}

