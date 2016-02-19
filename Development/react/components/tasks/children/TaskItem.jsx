var React = require('react');

var TaskItem = React.createClass({
	getInitialState: function(){
		return{
			edit: false,
			name: this.props.data.doc.name
		}
	},
	completeItem: function(){
		var data = this.props.data.doc;
		data.active = !data.active;
		
		this.props.onUpdate(data)
	},
	deleteItem: function(){
		var data = this.props.data.doc;
		data.id = this.props.data.id;
		data.rev = this.props.data.doc._rev;
		this.props.onRemove(data);
	},
	render: function(){
		var complete = (this.props.data.doc.active) ? "" : " complete";
		var checked = (this.props.data.doc.active) ? "unchecked" : "checked";

		return(
			<div className={"item"+complete}>
				<span className={checked} onClick={this.completeItem}></span>
				{this.props.data.doc.name}
				<span className="glyphicon glyphicon-cog"></span>
				<span className="glyphicon glyphicon-remove" onClick={this.deleteItem}></span>
			</div>
		);
	}
});

module.exports = TaskItem;