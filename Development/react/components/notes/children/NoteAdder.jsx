var React = require('react');
var ReactQuill = require('react-quill');

var NoteAdder = React.createClass({
	getInitialState: function(){
		return{
			value: "",
			type: "general"
		}
	},
	updateAdd: function(e){
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
			var data = {
				copy: this.state.value,
				type: this.state.type,
				project: this.props.project.id
			}
			this.props.addNote(data);

			this.setState({
				value: ""
			});
		}
	},
	render: function(){
		var visible = (this.props.project!=undefined) ? "" : " hide";

		return(
			<div className={"add"+visible}>
				<ReactQuill value={this.state.value} theme="snow" onChange={this.updateAdd} />
				<form className="add-form form-inline" onChange={this.selectChange} >
					<select className="form-control type">
						<option value="general">General</option>
						<option value="to">To</option>
						<option value="from">From</option>
						<option value="status">Status</option>
					</select>
					<button type="button" className="btn btn-primary submitbtn" onClick={this.onSubmit}>Submit</button>
				</form>
			</div>
		);
	}
});

module.exports = NoteAdder;