var parser = require('rss-parser');
var dateFormat = require('dateformat');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
	parser.parseURL(decodeURI(request.query.feed), function(err, parsed) {
		var res;
		var limit = (!request.query.limit) ? 1 : parseInt(request.query.limit, 10);
		var items = [];
		parsed.feed.entries.forEach(function(entry) {
			var item = {};
			item.uid = entry.guid;
			item.updateDate = dateFormat(entry.pubDate, "isoDateTime");
			item.titleText = entry.title;
			item.mainText = entry.content;
			item.streamUrl = entry.enclosure.url;
			item.redirectionURL = entry.link;
			items.push(item);
		});
		if (limit < 2) {
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