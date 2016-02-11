var React = require('react');

var AccountDetails = React.createClass({
	displayName: "AccountDetails",

	render: function () {
		return React.createElement(
			"div",
			{ id: "details", className: "module" },
			React.createElement(
				"h3",
				null,
				"DETAILS"
			)
		);
	}
});

module.exports = AccountDetails;