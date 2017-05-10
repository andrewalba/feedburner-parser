var Feed = require('rss-to-json');
var express = require('express');
var app = express();
var port = 8080;


app.listen(port, function() {
	console.log('app started');
});

app.get('/', function(req, res) {
	
	Feed.load(decodeURI(req.query.feed), function(err, rss) {
		var items = rss.items;
		var response;
		console.log(!req.query.limit);
		if (!req.query.limit) {
			response = items[0];
		}
		else {
			response = [];
			for (var i=0; i < parseInt(req.query.limit, 10); i++) {
				response.push(items[i]);
			}
		}
		res.setHeader('Content-Type', 'application/json');
		res.send(response);
	});
});
