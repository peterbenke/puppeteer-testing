let looksSame = require('looks-same');
let config = require('./config');
let fs = require('fs');

config.init() ;


let imageName    = 'test-555-lg.png' ;
let imageBase    = config.compareFolderRoot.basePath + "/" + config.compareFolders.base + "/" + imageName;
let imageResult  = config.compareFolderRoot.basePath + "/" + config.compareFolders.results + "/" + imageName;
let imageFailure  = config.compareFolderRoot.basePath + "/" + config.compareFolders.failure + "/" + imageName;


try {
    if ( config.debugLevel > 1 ) {
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
    if ( config.debugLevel > 1 ) {
        console.log('Does the Base file ' + imageBase + '  exist?  ');
    }
     fs.accessSync( imageBase , fs.constants.R_OK | fs.constants.W_OK);

} catch (err) {
    fs.writeFileSync(imageBase, fs.readFileSync(imageResult));
     if ( config.debugLevel > 0 ) {
         console.error('\n.......................................................\n');
         console.error('The Base file ' + imageBase + ' was  copied from Result! ');
         console.error('.........................................................\n\n');
     }

}

looksSame(imageBase, imageResult , {tolerance: 2.5} , function(error, equal) {
	//equal will be true, if images looks the same
	if ( equal === false ) {
	    console.log('equal:' + equal);
	    looksSame.createDiff({
        	reference: imageBase ,
        	current: imageResult ,
        	diff: imageFailure ,
        	highlightColor: '#ff00ff',  // color to highlight the differences
        	strict: false,              // strict comparsion
        	tolerance: 2.5
        }, function(error) {
            console.log('Result:' + imageFailure);
        });
	} else {
	    if ( config.debugLevel > 0 ) {
    	    console.log('equal:' + equal);
    	}
	}
});
