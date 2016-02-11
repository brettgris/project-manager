var React = require('react');

var AccountButton = React.createClass({
	displayName: "AccountButton",

	render: function () {
		return React.createElement(
			"div",
			{ className: "add-wrapper" },
			React.createElement(
				"div",
				{ className: "add" },
				React.createElement(
					"button",
					{ className: "btn btn-default", type: "submit", onClick: this.props.handleClick },
					React.createElement("span", { className: "glyphicon glyphicon-plus" })
				)
			)
		);
	}
});

module.exports = AccountButton;