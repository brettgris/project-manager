var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var FolderActions = require('./FolderActions');

var obj = {
	a: "witherepainsticharedisav",
	b: "9d328543f23add29d924a5e4bd1ceb3b7b2466aa"
}

var FolderStore = Reflux.createStore({
	listenables: [FolderActions],
	data: {},
	getFolders: function(accountid){
		HTTP.get('folders', obj, accountid).then(function(data){
			this.data.folders = data.rows;
			this.triggerUpdate();
		}.bind(this));
	},
	addFolder: function(data, accountid){
		HTTP.post('folders',data).then(function(res){
			this.getFolders(accountid);
		}.bind(this));
	},
	triggerUpdate: function(){
		this.trigger('change', this.data);
	}
});

module.exports = FolderStore;