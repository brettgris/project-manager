var React = require('react');

var FolderAdd = React.createClass({
	displayName: "FolderAdd",

	getInitialState: function () {
		return {
			visible: false,
			name: ""
		};
	},
	onChange: function (e) {
		this.setState({
			name: e.target.value
		});
	},
	showForm: function () {
		this.setState({
			visible: true
		});
	},
	onSubmit: function (e) {
		e.preventDefault();

		var n = this.state.name;

		if (n.length > 1) this.props.addFolder({ name: n });
		this.setState({
			name: "",
			visible: false
		});
	},
	cancelAdd: function () {
		this.setState({
			name: "",
			visible: false
		});
	},
	render: function () {
		var showForm = function (self) {
			if (!self.state.visible) {
				return React.createElement(
					"h4",
					{ className: "folder-add" },
					"  ",
					React.createElement("a", { onClick: self.showForm, className: "glyphicon glyphicon-plus" })
				);
			} else {
				return React.createElement(
					"form",
					{ className: "folder-input", onSubmit: self.onSubmit },
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement("input", { type: "text", className: "form-control", id: "foldername", placeholder: "Folder Name", value: self.state.name, onChange: self.onChange }),
						React.createElement(
							"button",
							{ type: "button", className: "btn btn-default", onClick: self.onSubmit },
							React.createElement("span", { className: "glyphicon glyphicon-plus" })
						)
					),
					React.createElement(
						"a",
						{ onClick: self.cancelAdd },
						"Cancel"
					)
				);
			}
		};

		return React.createElement(
			"div",
			{ className: "add-wrapper" },
			showForm(this)
		);
	}
});

module.exports = FolderAdd;