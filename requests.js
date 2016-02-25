var request = require('request');
var secret = require('./secret');
var fs = require('fs');
var tokenFile = __dirname+'/token.txt';
var url = 'http://cloud.mrjasu.com/api';

module.exports = {
	// Authenticate user
	authenticate: function authenticate (callback) {
		request.post({url: url+'/authenticate', 
		  form: {
		    name: secret.username,
		    password: secret.password
		  }}, function (err, httpResponse, body) {
		    if (err) throw err;
		    var res = JSON.parse(httpResponse.body);
		    writeToken(res.token);
		    callback(res);
		});
	},
	// Upload current IP
	setIp: function setIp (callback) {
		readToken(function (token) {
			request({
				url: url+'/setip',
				headers: {
					'x-access-token': token
				}
			}, function (err, response, body) {
				if (err) throw err;
				console.log(body);
				callback(body);
  			});
		});
	}
};

function writeToken (token) {
	fs.writeFile(tokenFile, token, function (err) {
		if (err) throw err;
	});
};

function readToken (callback) {
	fs.readFile(tokenFile, 'utf8', function (err, data) {
  		if (err) throw err;
  		callback(data);
	});
};