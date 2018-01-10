module.exports = {

	baseUri: 'https://allplan.local/',

	browserOptions: {
		ignoreHTTPSErrors: true
	},

	compareFolderRoot: {
		basePath: '../path-you-want/http/images'
	},

	compareFolders: {
		base: 'comparisonBase',
		failue: 'comparisonFailure',
		results: 'comparisonResults'
	},

	viewPorts: {
		lg: {
			width: 1800,
			height: 1000
		},
		md: {
			width: 1100,
			height: 1000
		},
		sm: {
			width: 750,
			height: 1000
		},
		xs: {
			width: 400,
			height: 1000
		}
	},

	/**
	 * Init functions
	 */
	init: function() {

		console.log("Initialize project ... ") ;
		console.log("First create folders, if not exist ... see: " + this.compareFolderRoot.basePath) ;

		const mkdirp = require('mkdirp');
		const values = require('object.values');

		// Create folders
		mkdirp(this.compareFolderRoot.basePath, function (err) {
			if (err) console.error(err)
		});
		let folders = values(this.compareFolders) ;
		console.log(folders) ;
		for (let i in folders )  {
			mkdirp( this.compareFolderRoot.basePath + "/" + folders[i] , function (err) {
				if (err) console.error(err)
			});
		}

	},

	/**
	 * createScreenshotsForViewPorts
	 * Create screenshots for all available viewports in defined result folder (compareFolders.results)
	 * Appends the viewport to the given image name, e.g. 'screenshot-01' => 'screenshot-01-lg.png'
	 * imageName: Name of the image (only name without path and file extension, e.g. 'screenshot-01')
	 * pagePath: path after baseUri, e.g. 'home.html'
	 * @param {!{imageName:string, pagePath:string}=} options
	 */
	createScreenshotsForViewPorts: function(options = {}){

		const imageName = 'imageName' in options ? options.imageName : 'test';
		const pagePath = 'pagePath' in options ? options.pagePath : '';

		const puppeteer = require('puppeteer');

		(async () => {

			try{

				const browser = await puppeteer.launch(this.browserOptions);
				const page = await browser.newPage();

				// Loop through the defined viewports
				for (let viewPort in this.viewPorts) {

					if (this.viewPorts.hasOwnProperty(viewPort)) {

						let viewPortWidth = this.viewPorts[viewPort].width;
						let viewPortHeight = this.viewPorts[viewPort].height;
						let imagePath = this.compareFolders.results + '/' + imageName + '-' + viewPort + '.png';
						let uri = this.baseUri;
						if(pagePath !== ''){
							uri += pagePath;
						}

						await page.setViewport({ width: viewPortWidth, height: viewPortHeight });
						await page.goto(uri);
						await page.screenshot({path: imagePath});

						console.log('Create screenshot: ' + imagePath);

						console.log('uri:' + uri);
						// console.log('viewPort:' + viewPort);
						// console.log('viewPortWidth: ' + viewPortWidth);
						// console.log('viewPortHeight: ' + viewPortHeight);
						// console.log('imagePath:' + imagePath);

					}

				}

				await browser.close();

			}catch(error){

				console.log('*** Error! ***');
				console.log('Message: ' + JSON.stringify(error));
				process.exit();

			}

		})();

	}


};
