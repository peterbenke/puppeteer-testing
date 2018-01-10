var looksSame = require('looks-same');

looksSame('allplan-04.png', 'allplan-05.png', function(error, equal) {
	//equal will be true, if images looks the same
	console.log('equal:' + equal);
});

looksSame.createDiff({
	reference: 'allplan-04.png',
	current: 'allplan-05.png',
	diff: 'diff.png',
	highlightColor: '#ff00ff', //color to highlight the differences
	strict: false,//strict comparsion
	tolerance: 2.5
}, function(error) {
});