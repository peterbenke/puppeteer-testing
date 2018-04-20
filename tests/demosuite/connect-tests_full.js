
// make a copy of this file and name it testsuite.js
// adjust it to your needs.
// change config_local.TestSuiteFile from testsuite_example.js to  testsuite.js

module.exports = {
    Conntest001: {
        // testen ob die Navigation in Deutsch gerendert wird
        pagePath: 'de.html',
        selector: '#wrapper-nav-main',
        imageName: 'Conn-test-navigation-001',
        styleDefinitions: 'body #cookiePolicyBar{ width:0; overflow:hidden ; } .invisibleInTest { display:none; }',

    } ,
    Conntest0011: {
        // testen ob der Top Wrapper mit der Prache korrekt funktioniert
        pagePath: 'de.html',
        selector: '#wrapper-top-bar',
        imageName: 'Conn-test-navigation-0011',
        styleDefinitions: 'body #cookiePolicyBar{ width:0; overflow:hidden ; } .invisibleInTest { display:none; }',

    } ,
    Conntest002: {
            // wird das registrierungsformular gerendert ?
            // besonderheit captcha bild muss verschwinden !
            pagePath: 'register.html',
            selector: '#mainContent',
            imageName: 'Conn-test-register-002',
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
    },
    Conntest003: {
        // Forums übersichtsseite. das erste Forum, normal aufgeklappt, wird via javascript verborgen, da sich die letzte Antwort täglich ändern kann
        pagePath: 'de/forum/forumindex.html',
        selector: '#mainContent',
        imageName: 'Conn-test-forumindex-003',
        styleDefinitions: 'body #cookiePolicyBar{ width:0; overflow:hidden ; } .invisibleInTest { display:none; } .tx-mmforum-forum-list-container {display: none}',
    }
    ,
    Conntest0031: {
        // wird der Suchfilter gerendert ?
        pagePath: 'de/forum/forumindex.html',
        selector: '.mmforum-search-filter',
        imageName: 'Conn-test-forumsearch-0031',
        styleDefinitions: 'body #cookiePolicyBar{ width:0; overflow:hidden ; } .mmforum-search-filter-sub { display: Block !important; } .tx-mmforum-forum-list-container {display: none}',
    }
    ,

    Conntest004: {
        // Werden die neuesten beiträge gerendert das immer nur max 200 Beiträge kommen, sollte das ausreichend getestet wreden, wenn der page Browser erscheint ..
        pagePath: 'de/forum/neueste-beitraege.html',
        selector: '#mainContent',
        imageName: 'Conn-test-forumlatest-004',
        styleDefinitions: 'body #cookiePolicyBar{ width:0; overflow:hidden ; } .tx-mmforum-topic-list-container { display: none !important; } ',
    }
    ,
    Conntest005: {
        // Werden die beiträge eines Forums gerendert ? da sich das ändern kann, alle im nicht eingeloggten zustand notwendigen änderungen vornehmen
        // title und autor sowie zeit austauschen. Info box einfach ausblenden ..

        pagePath: 'de/forum/themen/forum/topics/rund-um-allplan-connect.html',
        selector: '#mainContent',
        imageName: 'Conn-test-forumtopics-005',
        styleDefinitions: 'body #cookiePolicyBar{ width:0; overflow:hidden ; } .post_summary_box { display: none !important; } ',
        replaceDomElements: {
            r001:   {
                elementToReplace: '.topic-timestamp',
                newElementTag: 'div',
                newElementContent: '16.01.2018 von <a href="#">Velletti</a>a>',
            },
            r002:   {
                elementToReplace: '.topic-tags',
                newElementTag: 'div',
                newElementContent: 'tag1, Tag2, Tag-beispiel3',
            },
            r003:   {
                elementToReplace: '.topic_entry H4',
                newElementTag: 'h4',
                newElementContent: '<a href="#">Topic Default Title</a>',
            },


        }
    }
    ,
    Conntest006: {
        // Wird ein einzelner Beitrag gerendert ? da sich das ändern kann, alle im nicht eingeloggten zustand notwendigen änderungen vornehmen
        // title und autor sowie zeit austauschen. Info box einfach ausblenden ..
        // https://connect.allplan.com/de/forum/themen/topic/topics/stellenangebote/wissenwertes-zum-stellenmarkt.html

        pagePath: 'de/forum/themen/topic/topics/stellenangebote/wissenwertes-zum-stellenmarkt.html',
        selector: '.tx-mmforum-posts-listing',
        imageName: 'Conn-test-forumpost-006',
        styleDefinitions: 'body #cookiePolicyBar{ width:0; overflow:hidden ; } ',
        replaceDomElements: {
            r001:   {
                elementToReplace: 'ul.tx-mmforum-posts-listing .single',
                newElementTag: 'div',
                newElementContent: 'All possible answers removed!',
            },

        }
    }
    ,
    // https://connect.allplan.com/de/support/loesungen.html

    Conntest007: {
       // FAQ Liste

        pagePath: 'de/support/loesungen.html',
        selector: '.tx-nemsolution-pi1',
        imageName: 'Conn-test-faq-007',
        styleDefinitions: 'body #cookiePolicyBar{ width:0; overflow:hidden ; } ',
        replaceDomElements: {
            r001:   {
                elementToReplace: 'ul.tx-mmforum-posts-listing .single',
                newElementTag: 'div',
                newElementContent: 'All possible answers removed!',
            },

        }
    }
    ,





}

