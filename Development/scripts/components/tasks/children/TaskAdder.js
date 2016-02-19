var React = require('react');

var TaskAdder = React.createClass({
	displayName: "TaskAdder",

	getInitialState: function () {
		return {
			name: ""
		};
	},
	onChange: function (e) {
		this.setState({
			name: e.target.value
		});
	},
	onSubmit: function () {
		if (this.state.name.length > 0) {
			var data = {
				name: this.state.name,
				active: true,
				project: this.props.project.id
			};

			this.props.onAdd(data);
		}

		this.setState({
			name: ""
		});
	},
	render: function () {
		return React.createElement(
			"form",
			{ className: "task-input" },
			React.createElement(
				"div",
				{ className: "form-group" },
				React.createElement("input", { type: "text", className: "form-control", id: "taskname", placeholder: "Task Name", value: this.state.name, onChange: this.onChange }),
				React.createElement(
					"button",
					{ type: "button", className: "btn btn-default", onClick: this.onSubmit },
					React.createElement("span", { className: "glyphicon glyphicon-plus" })
				)
			)
		);
	}
});

module.exports = TaskAdder;