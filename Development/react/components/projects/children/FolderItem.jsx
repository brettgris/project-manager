var React = require('react');
var ProjectItem = require('./ProjectItem');
var ProjectAdd = require('./ProjectAdd');

var FolderItem = React.createClass({
	getInitialState: function(){
		return {
			visible: false,
			edit: false,
			name: this.props.data.doc.name
		}
	},
	componentDidMount: function(){
		if (this.props.id==0) {
			this.setState({
				visible: true
			});
		}
	},
	switchVisible: function(){
		var b = !this.state.visible;
		this.setState({
			visible: b
		});
	},
	showEdit: function(){
		this.setState({
			edit: !this.state.edit
		})
	},
	onNameChange: function(e){
		this.setState({
			name: e.target.value
		})
	},
	changeName: function(e){
		e.preventDefault();
		
		if (this.state.name.length>0) {
			var data = this.props.data.doc;
			data.name = this.state.name;

			this.props.onUpdate(data);
		}

		this.setState({
			edit: false
		});
	},
	render: function(){
		var visibleclass= (this.state.visible) ? " glyphicon-chevron-down" : " glyphicon-chevron-right";
		var projectvisible = (this.state.visible) ? "" : " hide";
		var foldervisible = (this.state.visible) ? " visible" : "";
		var titlevisible = (this.state.edit) ? " hide" : "";
		var editvisible = (this.state.edit) ? "" : " hide";

		var createProjects = this.props.projects.map( function(item,key){
			if (item.doc.folder==this.props.data.id){
				return(	
					<ProjectItem data={item} key={"folder"+key} folder={this.props.data} folders={this.props.folders} current={this.props.current} />
				);
			}
		}.bind(this));

		return(
			<div className="folder">
				<h4 className={"folder-title"+foldervisible+titlevisible}>
					{this.props.data.doc.name}
					<a className="glyphicon glyphicon-cog" onClick={this.showEdit}></a>
					<a className={"visible glyphicon"+visibleclass} onClick={this.switchVisible}></a>
				</h4>
				<form className={"edit"+editvisible} onSubmit={this.changeName}>
					<div className="form-group">
						<input type="text" className="form-control" id="foldername" value={this.state.name} onChange={this.onNameChange}></input>
						<button type="button" className="btn btn-default" onClick={this.changeName}>
							<span className="glyphicon glyphicon-plus"></span>
						</button>
					</div>
					<a onClick={this.showEdit}>Cancel</a>
				</form>
				<div className={"project-items"+projectvisible}>
					{createProjects}
					<ProjectAdd folder={this.props.data} />
				</div>
			</div>
		);	
	}
});

module.exports = FolderItem;