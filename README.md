# puppeteer

## Requirements
  * Chrome M59+ / in Windows M60+ 
  * Node v7.6.0 or greater
  
## tested windows 10 (fall 2017 version) with a vagrant box using ubuntu 16.04
    
    to get an actual version of Node i used
    
### get Chrome in ubuntu
    
    from : https://askubuntu.com/questions/510056/how-to-install-google-chrome
    
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
    echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list
    sudo apt-get update 
    sudo apt-get install google-chrome-stable

### get newer node version under ubuntu
    from: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04
    
    curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
    sudo bash nodesource_setup.sh
    sudo apt-get install nodejs
    
    nodejs -v

## Installation
    ' go to your home dir f.e. 
    cd /vagrant
    git clone git@github.com:peterbenke/puppeteer-testing.git
    
    cd puppeteer-testing  
    
     
    npm i puppeteer
    npm i looks-same
    npm i mkdirp
    npm i object.values
    npm i fs
    
  * puppeteer
  * looks-same: Compare screenshots
  * mkdirp: Create directories recursive
  * object.values: Handle objects as arrays
  * fs: files access  
   
## First test

	cd tests/demotest
	node test.js
	
=> Should create the following image:

	tests/demotest/example-com.png


## create a test suite
	
	cd ../tests/demosuite
	cp config_example.js config_local.js	
	
Edit and adjust the config_local.js to your needs!
Have a look into the samples: connect-tests_full.js and the connect-tests_small.js 	
(Remark: as the layout nd structure of the Site has changed, some of the tests will not run anymore)
	

### trouble shooting
In my vagrant box, some libs needed for chrome did not work
  
     Error: Failed to launch chrome!
    /vagrant/puppeteer-testing/node_modules/puppeteer/.local-chromium/linux-515411/chrome-linux/chrome: error while loading shared libraries: libgconf-2.so.4: cannot open shared object file: No such file or directory
    
Try this:
    sudo apt-get install -yq --no-install-recommends libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 libnss3

### Known Issues

    The testsuite example actually stops, if the tested selector does not exist 
     
  
## Useful links

### puppeteer

  * puppeteer:<br>
    https://github.com/GoogleChrome/puppeteer  
  * puppeteer API:<br>
    https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
  * puppeteer examples:<br>
    https://github.com/checkly/puppeteer-examples
  * Online puppeteer tester:<br> 
    https://try-puppeteer.appspot.com/
  
### Headless chrome
  
  * https://developers.google.com/web/updates/2017/04/headless-chrome
  * https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
  
### npm packages

  * https://www.npmjs.com/package/puppeteer
  * https://www.npmjs.com/package/looks-same
  
  