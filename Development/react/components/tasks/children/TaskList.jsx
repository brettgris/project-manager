var React = require('react');
var TaskItem = require('./TaskItem');
var TaskAdder = require('./TaskAdder');

var TaskList = React.createClass({
	getInitialState: function(){
		return{
			visible: this.props.active
		}
	},
	switchVisible: function(){
		this.setState({
			visible: !this.state.visible
		});
	},
	render: function(){
		var headervisible = (this.state.visible) ? " visible" : "";
		var visibleclass = (this.state.visible) ? " glyphicon-chevron-down" : " glyphicon-chevron-right";
		var createItems = this.props.tasks.map( function(item,key){
			if (item.doc.active==this.props.active) {
				return(
					<TaskItem key={"task"+item.id} data={item} onUpdate={this.props.onUpdate} onRemove={this.props.onRemove}/>
				);
			}
		}.bind(this));

		var addAdder = function(self){
			if (self.props.onAdd) {
				return(
					<TaskAdder project={self.props.project} onAdd={self.props.onAdd} />
				);
			}
		}

		return(
			<div className="list">
				<h4 className={headervisible}>
					{this.props.name}
					<span className={"glyphicon"+visibleclass} onClick={this.switchVisible}></span>
				</h4>
				<div className={"items"+headervisible}>
					{createItems}
					{addAdder(this)}
				</div>
			</div>
		);
	}
});

module.exports = TaskList;