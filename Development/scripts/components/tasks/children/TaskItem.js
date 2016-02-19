var React = require('react');

var TaskItem = React.createClass({
	displayName: "TaskItem",

	getInitialState: function () {
		return {
			edit: false,
			name: this.props.data.doc.name
		};
	},
	completeItem: function () {
		var data = this.props.data.doc;
		data.active = !data.active;

		this.props.onUpdate(data);
	},
	deleteItem: function () {
		var data = this.props.data.doc;
		data.id = this.props.data.id;
		data.rev = this.props.data.doc._rev;
		this.props.onRemove(data);
	},
	render: function () {
		var complete = this.props.data.doc.active ? "" : " complete";
		var checked = this.props.data.doc.active ? "unchecked" : "checked";

		return React.createElement(
			"div",
			{ className: "item" + complete },
			React.createElement("span", { className: checked, onClick: this.completeItem }),
			this.props.data.doc.name,
			React.createElement("span", { className: "glyphicon glyphicon-cog" }),
			React.createElement("span", { className: "glyphicon glyphicon-remove", onClick: this.deleteItem })
		);
	}
});

module.exports = TaskItem;