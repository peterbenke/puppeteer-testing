
// make a copy of this file and name it config_local.js
// adjust it to your needs.

module.exports = {


    // 0 = no Output, only errors , 1 = normal Output , 2 = full
    debugLevel: 2,

	baseUri: 'https://allplan.local/',

	browserOptions: {
		ignoreHTTPSErrors: true
	},

	compareFolderRoot: {
		basePath: '../../domain/path-you-want/http/images'
	}


};
