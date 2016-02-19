var React = require('react');

var NotesHeader = React.createClass({
	displayName: "NotesHeader",

	render: function () {
		var title = this.props.project != undefined ? this.props.project["doc"]["name"] : "";
		var visible = this.props.project != undefined ? "" : " hide";

		return React.createElement(
			"div",
			{ className: "header" + visible },
			React.createElement(
				"h3",
				{ className: "center" },
				title
			)
		);
	}
});

module.exports = NotesHeader;