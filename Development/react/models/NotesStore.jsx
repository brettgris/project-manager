var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var NotesActions = require('./NotesActions');

var obj = {
	a: "tomelyhounswethingtheyse",
	b: "bd085c184dbb0dfb912c75800166e3a46bbe49d6"
}

var NotesStore = Reflux.createStore({
	listenables: [NotesActions],
	data: {},
	getNotes: function(projectid){
		HTTP.get('notes', obj, projectid).then(function(data){
			this.data.notes = data.rows;
			this.triggerUpdate();
		}.bind(this));
	},
	addNote: function(data){
		HTTP.post('notes',data).then(function(res){
			this.getNotes(data.project);
			this.triggerUpdate();
		}.bind(this));
	},
	deleteNote: function(data){
		HTTP.remove('notes',data.id,data.rev).then(function(res){
			this.getNotes(data.project);
	 		this.triggerUpdate();
		}.bind(this));
	},
	updateNote: function(data){
		HTTP.put('notes', data).then(function(res){
			this.getNotes(data.project);
			this.triggerUpdate();
		}.bind(this));
	},
	triggerUpdate: function(){
		this.trigger('change', this.data);
	}
});

module.exports = NotesStore;