module.exports = {

	baseUri: 'https://allplan.local/',

	browserOptions: {
		ignoreHTTPSErrors: true
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

	},





	/**
	 * Takes a screenshot of a DOM element on the page, with optional padding.
	 *
	 * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
	 * @return {!Promise<!Buffer>}
	 */
/*
	screenshotDOMElement: function(page, opts = {}){
	// async function screenshotDOMElement(page, opts = {}) {

		const padding = 'padding' in opts ? opts.padding : 0;
		const path = 'path' in opts ? opts.path : null;
		const selector = opts.selector;

		if (!selector){
			throw Error('Please provide a selector.');
		}

		const rect = await page.evaluate(selector => {
			const element = document.querySelector(selector);
			if (!element){
				return null;
			}
			const {x, y, width, height} = element.getBoundingClientRect();
			return {left: x, top: y, width, height, id: element.id};
		}, selector);

		if (!rect){
			throw Error(`Could not find element that matches selector: ${selector}.`);
		}

		return await page.screenshot({
			path,
			clip: {
				x: rect.left - padding,
				y: rect.top - padding,
				width: rect.width + padding * 2,
				height: rect.height + padding * 2
			}
		});

	}
*/




};
