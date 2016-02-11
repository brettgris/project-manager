var React = require('react');

var Notes = React.createClass({
	displayName: "Notes",

	render: function () {
		return React.createElement(
			"div",
			{ className: "col-sm-6 section", id: "notes" },
			React.createElement("h3", null)
		);
	}
});

module.exports = Notes;