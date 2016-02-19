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
	showEdit: function () {
		this.setState({
			edit: !this.state.edit
		});
	},
	onNameChange: function (e) {
		this.setState({
			name: e.target.value
		});
	},
	changeName: function (e) {
		e.preventDefault();

		if (this.state.name.length > 0) {
			var data = this.props.data.doc;
			data.name = this.state.name;

			this.props.onUpdate(data);
		}

		this.setState({
			edit: false
		});
	},
	render: function () {
		var complete = this.props.data.doc.active ? "" : " complete";
		var checked = this.props.data.doc.active ? "unchecked" : "checked";
		var taskvisible = this.state.edit ? " hide" : "";
		var editvisible = this.state.edit ? "" : " hide";

		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "item" + complete + taskvisible },
				React.createElement("span", { className: checked, onClick: this.completeItem }),
				this.props.data.doc.name,
				React.createElement("span", { className: "glyphicon glyphicon-cog", onClick: this.showEdit }),
				React.createElement("span", { className: "glyphicon glyphicon-remove", onClick: this.deleteItem })
			),
			React.createElement(
				"form",
				{ className: "edit" + editvisible, onSubmit: this.changeName },
				React.createElement(
					"div",
					{ className: "form-group" },
					React.createElement("input", { type: "text", className: "form-control", id: "foldername", value: this.state.name, onChange: this.onNameChange }),
					React.createElement(
						"button",
						{ type: "button", className: "btn btn-default", onClick: this.changeName },
						React.createElement("span", { className: "glyphicon glyphicon-plus" })
					)
				),
				React.createElement(
					"a",
					{ onClick: this.showEdit },
					"Cancel"
				)
			)
		);
	}
});

module.exports = TaskItem;