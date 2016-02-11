var PouchDB = require('pouchdb');
var baseUrl = 'https://brettgris.cloudant.com/';

var service = {
	dbs: [],
	init: function (url, data) {
		this.dbs[url] = new PouchDB(baseUrl + url, {
			auth: {
				username: data.a,
				password: data.b
			}
		});
	},
	get: function (url, data) {
		if (!this.dbs[url]) this.init(url, data);
		return this.dbs[url].allDocs({
			include_docs: true
		}).then(function (response) {
			return response;
		});
	},
	post: function (url, data) {
		return this.dbs[url].post(data).then(function (response) {
			return response;
		});
	},
	put: function (url, data) {
		return this.dbs[url].put(data).then(function (response) {
			return response;
		});
	},
	remove: function (url, id, rev) {
		return this.dbs[url].remove(id, rev).then(function (response) {
			return response;
		});
	}
};

module.exports = service;