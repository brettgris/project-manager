var React = require('react');

var AccountItem = React.createClass({
	displayName: "AccountItem",

	handleClick: function () {
		this.props.handleClick(this.props.data.id);
	},
	render: function () {
		var style = {};
		if (this.props.data.doc["image"]) {
			style["backgroundImage"] = "url(" + this.props.data.doc["image"] + ")";
		}
		var accountclass = this.props.current == this.props.data.id ? "account selected" : "account";
		return React.createElement(
			"div",
			{ className: accountclass },
			React.createElement(
				"div",
				null,
				React.createElement("a", { style: style, onClick: this.handleClick })
			)
		);
	}
});

module.exports = AccountItem;