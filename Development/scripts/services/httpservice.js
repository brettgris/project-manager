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
	get: function (url, data, val) {
		if (!this.dbs[url]) this.init(url, data);
		return this.dbs[url].query("docview/docview", {
			key: val,
			include_docs: true
		}).then(function (response) {
			var arr = response.rows;
			arr = arr.sort(function (a, b) {
				return a.doc.created - b.doc.created;
			});
			response.rows = arr;
			return response;
		});
	},
	post: function (url, data) {
		var d = new Date();
		data.created = d.getTime();

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