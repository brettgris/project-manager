var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var FolderActions = require('./FolderActions');

var obj = {
	a: "senlyingelydiresondescan",
	b: "62e526a1528b6099c75e18940209f9c35860bbd3"
};

var FolderStore = Reflux.createStore({
	listenables: [FolderActions],
	data: {},
	getFolders: function (accountid) {
		HTTP.get('folders', obj, accountid).then(function (data) {
			this.data.folders = data.rows;
			this.triggerUpdate();
		}.bind(this));
	},
	addFolder: function (data, accountid) {
		HTTP.post('folders', data).then(function (res) {
			this.getFolders(accountid);
		}.bind(this));
	},
	triggerUpdate: function () {
		this.trigger('change', this.data);
	}
});

module.exports = FolderStore;