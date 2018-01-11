module.exports = {

    // 0 = no Output, only errors , 1 = normal Output , 2 = full
    debugLevel: 1,

	baseUri: 'https://allplan.local/',

	browserOptions: {
		ignoreHTTPSErrors: true
	},

	compareFolderRoot: {
		basePath: '../path-you-want/http/images'
	},

	compareFolders: {
		base: 'comparisonBase',
		failure: 'comparisonFailure',
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

		if ( this.debugLevel > 0  ) {
            console.log("\nInitialising Project ... ") ;
        }

        // Overwrite some of the default Config values that will different on a local, dev, test, build server.
        let fs = require('fs');
        try {
             fs.accessSync('./config_local.js', fs.constants.R_OK | fs.constants.W_OK);

             const confLocal = require('./config_local');
             this.compareFolderRoot.basePath = confLocal.compareFolderRoot.basePath ;
             this.debugLevel                 = confLocal.debugLevel ;
             this.baseUri                    = confLocal.baseUri;
             this.browserOptions             = confLocal.browserOptions ;

        } catch (err) {
            console.error('\n.......................................................\n');
            console.error('The file ./config_local does not exist! \nCopy the File ./config_example.js to ./config_local and adjust it to your needs.');
            console.error('.........................................................\n\n');
            process.exit() ;
        }

        if ( this.debugLevel > 1 ) {
            console.log("First Create Folders (if not exist) ... See: " + this.compareFolderRoot.basePath + "\n(the compareFolderRoot.basepath should be defined in config_local.js)\n ") ;
        }

		const mkdirp = require('mkdirp');
		const values = require('object.values');

		// Create folders
		mkdirp(this.compareFolderRoot.basePath, function (err) {
			if (err) {
			    console.error("problem during creating Base Folder : " + this.compareFolderRoot.basePath + ")\n ") ;

                console.error(err)
                process.exit() ;
			}
		});
		let folders = values(this.compareFolders) ;
		if ( this.debugLevel > 1 ) {
		    console.log(folders) ;
		}
		for (let i in folders )  {
			mkdirp( this.compareFolderRoot.basePath + "/" + folders[i] , function (err) {
				if (err) {
				    console.error("problem during creating Subfolders to : " + this.compareFolderRoot.basePath + ")\n ") ;

				    console.error(err)
				    process.exit() ;
				}
			});
		}

	},

	/**
	 * Takes a screenshot of a DOM element on the page, with optional padding.
	 *
	 * @see https://gist.github.com/malyw/b4e8284e42fdaeceab9a67a9b0263743
	 * @param {!Promise<!Page>} page
	 * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
	 * @return {!Promise<!Buffer>}
	 */
	screenshotDOMElement: async function(page, opts = {}){

		const padding = 'padding' in opts ? opts.padding : 0;
		const path = 'path' in opts ? opts.path : null;
		const selector = opts.selector;

		/**
		 * @see https://stackoverflow.com/questions/47257451/how-to-pass-dynamic-page-automation-commands-to-puppeteer-from-external-file
		 */
		return Promise.all([

			(async () => {

				async function screenshotDOMElement() {
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

				await screenshotDOMElement({
					path: path,
					selector: selector
				});

			})()

		]);

	},


	/**
	 * createScreenshotsDOMElementForViewPorts
	 * Create screenshots for all available viewports in defined result folder (this.compareFolderRoot.basePath + '/' + this.compareFolders.results)
	 * Appends the viewport to the given image name, e.g. 'screenshot-01' => 'screenshot-01-lg.png'
	 * @param  {Promise} page
	 * @param {Object} options
	 * string pagePath: Path to the page, e.g. 'home.html' (without baseUri)
	 * string selector: Selector on the page, e.g. '#content'
	 * string imageName: Name of the image, without path and file-extension
	 * string styleDefinitions: Additional style definitions, e.g. '#header{ display:none; }'
	 * int    padding: Number of pixels inside the screenshot
	 * @returns {*}
	 */
	createScreenshotsDOMElementForViewPorts: function(page, options = {}){

		const pagePath = 'pagePath' in options ? options.pagePath : '';
		const selector = options.selector;
		const imageName = 'imageName' in options ? options.imageName : 'test';
		const styleDefinitions = 'styleDefinitions' in options ? options.styleDefinitions : '';
		const padding = 'padding' in options ? options.padding : 0;

		try{

			return Promise.all([

				(async () => {

					async function screenshotDOMElement(opts = {}) {

						let path = 'path' in opts ? opts.path : null;
						let selector = opts.selector;
						let padding = 'padding' in opts ? opts.padding : 0;

						if (!selector){
							throw Error('Please provide a selector.');
						}

						let rect = await page.evaluate(selector => {
							let element = document.querySelector(selector);
							if (!element){
								return null;
							}
							let {x, y, width, height} = element.getBoundingClientRect();
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


					// Loop through the defined viewports
					for (let viewPort in this.viewPorts) {

						if (this.viewPorts.hasOwnProperty(viewPort)) {

							let viewPortWidth = this.viewPorts[viewPort].width;
							let viewPortHeight = this.viewPorts[viewPort].height;
							let imagePath = this.compareFolderRoot.basePath + '/' + this.compareFolders.results + '/' + imageName + '-' + viewPort + '.png';
							let uri = this.baseUri;
							if(pagePath !== ''){
								uri += pagePath;
							}
							if (this.debugLevel >= 2)  {
								console.log('uri:' + uri);
								console.log('viewPort:' + viewPort);
								console.log('viewPortWidth: ' + viewPortWidth);
								console.log('viewPortHeight: ' + viewPortHeight);
								console.log('imagePath:' + imagePath);
								console.log('styleDefinitions:' + styleDefinitions);
							}

							await page.setViewport({ width: viewPortWidth, height: viewPortHeight });
							await page.goto(uri);

							// Set styles, if exist
							if(styleDefinitions !== ''){
								await page.addStyleTag({content: styleDefinitions});
							}

							// And shot
							await screenshotDOMElement({
								path: imagePath,
								selector: selector,
								padding: padding
							});
                            await this.compareImages( { imageName:  imageName + '-' + viewPort + '.png' ,  tolerance: '2.5' , highlightColor: '#FF00FF' }) ;
						}

					}


				})()

			]);


		}catch(e){

			console.log(e);

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

						if (this.debugLevel >= 2) {
							console.log('Create screenshot: ' + imagePath);
							console.log('uri:' + uri);
							console.log('viewPort:' + viewPort);
							console.log('viewPortWidth: ' + viewPortWidth);
							console.log('viewPortHeight: ' + viewPortHeight);
							console.log('imagePath:' + imagePath);
						}
                        await this.compareImages( { imageName:  imageName + '-' + viewPort + '.png' ,  tolerance: '2.5' , highlightColor: '#FF00FF' }) ;
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
	 * compareImages
     * @param {Object} options
	 * imageName: Name of the image (only name without path , e.g. 'screenshot-01.png')
	 * @param {!{imageName:string}=} options
	 */
    compareImages: function( options = {}) {

        const imageName = 'imageName' in options ? options.imageName : 'test';
        const tolerance = 'tolerance' in options ? options.tolerance : '2.5';
        const highlightColor = 'highlightColor' in options ? options.highlightColor : '#FF00FF';
        (async () => {

            try{

                let imageBase    = this.compareFolderRoot.basePath + "/" + this.compareFolders.base + "/" + imageName;

                let imageResult  = this.compareFolderRoot.basePath + "/" + this.compareFolders.results + "/" + imageName;
                let imageFailure  = this.compareFolderRoot.basePath + "/" + this.compareFolders.failure + "/" + imageName;

                const fs = require('fs');
                // FIRST we do some Checks/setups , removing old errors Image and creating a new Base Image, if it does not exist ..
                try {
                    if ( this.debugLevel > 1 ) {
                        console.log('Does the Result file ' + imageResult + '  exist?  ');
                    }
                     fs.accessSync( imageResult , fs.constants.R_OK | fs.constants.W_OK);

                } catch (err) {
                    console.error('\n.......................................................\n');
                    console.error('The Result file ' + imageResult + ' does not exist! Can Not Compare files ');
                    console.error('.........................................................\n\n');
                    process.exit() ;
                }

                try {
                    if ( this.debugLevel > 1 ) {
                        console.log('Does the Base file ' + imageBase + '  exist?  ');
                    }
                     fs.accessSync( imageBase , fs.constants.R_OK | fs.constants.W_OK);

                } catch (err) {
                    fs.writeFileSync(imageBase, fs.readFileSync(imageResult));
                     if ( this.debugLevel > 0 ) {
                         console.error('\n.......................................................\n');
                         console.error('The Base file ' + imageBase + ' was  copied from Result! ');
                         console.error('.........................................................\n\n');
                     }
                }
                try {
                    if ( this.debugLevel > 1 ) {
                        console.log('Does an old Failure file ' + imageFailure + '  exist?  ');
                    }
                     fs.accessSync( imageFailure ,  fs.constants.W_OK);
                     fs.unlinkSync(imageFailure)

                } catch (err) {

                }
                // END of some Checks/setups , removing old errors Image and creating a new Base Image, if it does not exist ..

                let looksSame = require('looks-same');

                looksSame(imageBase, imageResult , {tolerance: tolerance, highlightColor: highlightColor} , function(error, equal) {
                    //equal will be true, if images looks the same
                    if ( equal === false ) {
                        console.log('equal:' + equal);
                        looksSame.createDiff({
                            reference: imageBase ,
                            current: imageResult ,
                            diff: imageFailure ,
                            highlightColor: highlightColor,  // color to highlight the differences
                            strict: false,                  // strict comparsion
                            tolerance: tolerance
                        }, function(error) {
                            console.log('Result:' + imageFailure);
                        });
                    } else {
                        if ( this.debugLevel > 0 ) {
                            console.log('equal:' + equal);
                        }
                    }
                });

            } catch(error){

                console.log('*** Error! ***');
                console.log('Message: ' + JSON.stringify(error));
                process.exit();

            }

        })();

    }

};
