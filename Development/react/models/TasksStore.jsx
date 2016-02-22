var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var TasksActions = require('./TasksActions');

var obj = {
	a: "atiescouseaderaftendeare",
	b: "439733e813b74f0a6a6207e313e55ddec07f8cc4"
}

var TasksStore = Reflux.createStore({
	listenables: [TasksActions],
	data: {},
	getTasks: function(projectid){
		HTTP.get('tasks', obj, projectid).then(function(data){
			this.data.tasks = data.rows;
			this.triggerUpdate();
		}.bind(this));
	},
	addTask: function(data){
		HTTP.post('tasks',data).then(function(res){
			this.getTasks(data.project);
			this.triggerUpdate();
		}.bind(this));
	},
	updateTask: function(data){
		HTTP.put('tasks', data).then(function(res){
			this.getTasks(data.project);
			this.triggerUpdate();
		}.bind(this));
	},
	deleteTask: function(data){
		HTTP.remove('tasks',data.id,data.rev).then(function(res){
			this.getTasks(data.project);
	 		this.triggerUpdate();
		}.bind(this));
	},
	triggerUpdate: function(){
		this.trigger('change', this.data);
	}
});

module.exports = TasksStore;