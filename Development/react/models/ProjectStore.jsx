var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var ProjectActions = require('./ProjectActions');

var obj = {
	a: "poseckozonsideevelfighth",
	b: "3bb0147c743778ddeb12fc813884ac432b0d4e9b"
}

var ProjectStore = Reflux.createStore({
	listenables: [ProjectActions],
	data: {},
	getProjects: function(accountid){
		HTTP.get('projects', obj, accountid).then(function(data){
			this.data.projects = data.rows;
			this.triggerUpdate();
		}.bind(this));
	},
	updateProject: function(data){
		HTTP.put('projects', data).then(function(res){
			this.getProjects(data.account);
			this.triggerUpdate();
		}.bind(this));
	},
	addProject: function(data){
		HTTP.post('projects',data).then(function(res){
			this.getProjects(data.account);
			this.triggerUpdate();
		}.bind(this));
	},
	triggerUpdate: function(){
		this.trigger('change', this.data);
	}
});

module.exports = ProjectStore;