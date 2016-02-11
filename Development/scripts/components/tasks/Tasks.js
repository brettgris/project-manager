var React = require('react');

var Tasks = React.createClass({
	displayName: "Tasks",

	render: function () {
		return React.createElement(
			"div",
			{ className: "col-sm-3 section", id: "tasks" },
			React.createElement("h3", null)
		);
	}
});

module.exports = Tasks;