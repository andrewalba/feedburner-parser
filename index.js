var Feed = require('rss-to-json');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
	
	Feed.load(decodeURI(request.query.feed), function(err, rss) {
		var items = rss.items;
		var res;
		console.log(!request.query.limit);
		if (!request.query.limit) {
			res = items[0];
		}
		else {
			res = [];
			for (var i=0; i < parseInt(request.query.limit, 10); i++) {
				res.push(items[i]);
			}
		}
		response.setHeader('Content-Type', 'application/json');
		response.send(res);
	});
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});