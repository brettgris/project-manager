var React = require('react');
var $ = require('jquery');

var MobileMenu = React.createClass({
	displayName: 'MobileMenu',

	btnClick: function (e) {
		var t = $(e.target);
		if (t.hasClass("home")) this.props.changePage("home");else if (t.hasClass("notes")) this.props.changePage("notes");else if (t.hasClass("tasks")) this.props.changePage("tasks");
	},
	render: function () {
		return React.createElement(
			'div',
			{ id: 'menu', className: 'menu visible-xs' },
			React.createElement(
				'div',
				{ className: 'container-fluid' },
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'div',
						{ className: 'col-xs-4 block' },
						React.createElement(
							'a',
							{ onClick: this.btnClick },
							React.createElement('span', { className: 'home glyphicon glyphicon-home' })
						)
					),
					React.createElement(
						'div',
						{ className: 'col-xs-4 block' },
						React.createElement(
							'a',
							{ onClick: this.btnClick },
							React.createElement('span', { className: 'notes glyphicon glyphicon-edit' })
						)
					),
					React.createElement(
						'div',
						{ className: 'col-xs-4 block' },
						React.createElement(
							'a',
							{ onClick: this.btnClick },
							React.createElement('span', { className: 'tasks glyphicon glyphicon-check' })
						)
					)
				)
			)
		);
	}
});

module.exports = MobileMenu;