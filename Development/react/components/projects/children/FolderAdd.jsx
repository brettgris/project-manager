var React = require('react');

var FolderAdd = React.createClass({
	getInitialState: function(){
		return {
			visible: false,
			name:""
		}
	},
	onChange: function(e){
		this.setState({
			name: e.target.value
		});
	},
	showForm: function(){
		this.setState({
			visible: true
		});
	},
	onSubmit: function(){
		var n = this.state.name;

		if (n.length>1) this.props.addFolder({name: n});
		this.setState({
			name: "",
			visible: false
		});
	},
	cancelAdd:function(){
		this.setState({
			name: "",
			visible: false
		});
	},
	render: function(){
		var showForm = function(self){
			if (!self.state.visible) {
				return (
					<h4 className="folder-add"> &nbsp;
						<a onClick={self.showForm} className="glyphicon glyphicon-plus"></a>
					</h4>
				);
			} else {
				return (
					<form className="folder-input">
						<div className="form-group">
							<input type="text" className="form-control" id="foldername" placeholder="Folder Name" value={self.state.name} onChange={self.onChange}></input>
							<button type="button" className="btn btn-default" onClick={self.onSubmit}>
								<span className="glyphicon glyphicon-plus"></span>
							</button>
						</div>
						<a onClick={self.cancelAdd}>Cancel</a>
					</form>
				);
			}
		}

		return(
			<div className="add-wrapper">
				{showForm(this)}
			</div>
		)
	}
});

module.exports = FolderAdd;