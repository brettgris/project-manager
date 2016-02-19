var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var ProjectActions = require('./ProjectActions');

var obj = {
	a: "alselightlesepallesteref",
	b: "2a058cc2a62605d626590ac5722abb4b7518c983"
}

var ProjectStore = Reflux.createStore({
	listenables: [ProjectActions],
	data: {},
	getProjects: function(accountid){
		HTTP.get('projects', obj, accountid).then(function(data){
			this.data.projects = data.rows;
			this.data.current = undefined;
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
	changeCurrent: function(data){
		this.data.current = data;
		this.triggerUpdate();
	},
	triggerUpdate: function(){
		this.trigger('change', this.data);
	}
});

module.exports = ProjectStore;