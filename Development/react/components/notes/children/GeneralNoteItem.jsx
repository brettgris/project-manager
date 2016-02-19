var React = require('react');
var moment = require('moment');
var ReactQuill = require('react-quill');

var GeneralNoteItem = React.createClass({
	getInitialState: function(){
		return {
			value: this.props.data.doc.copy,
			type: this.props.data.doc.type,
			edit: false
		}
	},
	editNote: function(){
		this.setState({
			edit: true
		});
	},
	cancelEdit: function(){
		this.setState({
			edit: false
		});
	},
	deleteNote: function(){
		var data = {
			id: this.props.data.id,
			rev: this.props.data.doc._rev,
			project: this.props.data.doc.project
		}
		this.props.onDelete(data);
	},
	updateValue: function(e){
		this.setState({
			value: e
		});
	},
	selectChange: function(e){
		this.setState({
			type: e.target.value
		});
	},
	onSubmit: function(){
		if (this.state.value.length>0) {
			data = this.props.data.doc;
			data.copy = this.state.value;
			data.type = this.state.type;
			this.props.onUpdate(data);

			this.setState({
				edit: false
			});
		}
	},
	render: function(){
		var setView = function(self){
			if (!self.state.edit) {
				return(
					<div className="note">
						<div className={self.props.data.doc.type} dangerouslySetInnerHTML={{__html:self.props.data.doc.copy}}></div>
						<div className="details">
							<div className="icons">
								<span className="edit glyphicon glyphicon-pencil" onClick={self.editNote}></span>
								<span className="remove glyphicon glyphicon-remove" onClick={self.deleteNote}></span>
							</div>
						</div>
					</div>
				);
			} else {
				return(
					<div className="note">
						<ReactQuill value={self.state.value} theme="snow" onChange={self.updateValue} />
						<form className="add-form form-inline">
							<select className="form-control type" onChange={self.selectChange} value={self.state.type} >
								<option value="general">General</option>
								<option value="to">To</option>
								<option value="from">From</option>
								<option value="status">Status</option>
							</select>
							<button type="button" className="btn btn-primary submitbtn" onClick={self.onSubmit}>Submit</button>
							<button type="button" className="btn btn-default cancelbtn" onClick={self.cancelEdit}>Cancel</button>
						</form>
						
					</div>
				);
			}
		}

		return(
			<div>
				{setView(this)}
			</div>
		)
	}
});

module.exports = GeneralNoteItem;