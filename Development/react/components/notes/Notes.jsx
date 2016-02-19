var React = require('react');
var Reflux = require('Reflux');

var ProjectActions = require('../../models/ProjectActions');
var ProjectStore = require('../../models/ProjectStore');
var NotesActions = require('../../models/NotesActions');
var NotesStore = require('../../models/NotesStore');

var NotesHeader = require('./children/NotesHeader');
var GeneralNoteItem = require('./children/GeneralNoteItem');
var NoteAdder = require('./children/NoteAdder');

var Notes = React.createClass({
	mixins:[Reflux.listenTo(ProjectStore, 'changeProject'),Reflux.listenTo(NotesStore, 'changeNotes')],
	getInitialState: function(){
		return {
			project: undefined,
			notes: []
		}
	},
	changeProject: function(e,data){
		if (data.current!=undefined) {
			NotesActions.getNotes(data.current['id']);
		}
		this.setState({
			project: data.current,
			notes: []
		});
	},
	changeNotes: function(e,data){
		this.setState({
			notes: data.notes
		});
	},
	addNote: function(data){
		NotesActions.addNote(data);
	},
	deleteNote: function(data){
		NotesActions.deleteNote(data);
	},
	updateNote: function(data){
		NotesActions.updateNote(data);
	},
	render: function(){
		var createNotes = this.state.notes.map( function(item, key){
			if (this.state.project!=undefined) {
				return(
					<GeneralNoteItem data={item} key={"note"+key} onDelete={this.deleteNote} onUpdate={this.updateNote} />
				)
			}
		}.bind(this));

		return (
			<div className="col-sm-6 section" id="notes">
				<NotesHeader project={this.state.project} />
				{createNotes}
				<NoteAdder project={this.state.project} addNote={this.addNote} />
			</div>
		)
	}
});

module.exports = Notes;