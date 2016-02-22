var React = require('react');
var $ = require('jquery');

var MobileMenu = React.createClass({
	btnClick: function(e){
		var t = $(e.target);
		if (t.hasClass("home")) this.props.changePage("home");
		else if (t.hasClass("notes")) this.props.changePage("notes");
		else if (t.hasClass("tasks")) this.props.changePage("tasks");
	},
	render: function(){
		return(
			<div id="menu" className="menu visible-xs">
				<div className="container-fluid">
					<div className="row">
						<div className="col-xs-4 block">
							<a onClick={this.btnClick}>
								<span className="home glyphicon glyphicon-home"></span>
							</a>
						</div>
						<div className="col-xs-4 block">
							<a onClick={this.btnClick}>
								<span className="notes glyphicon glyphicon-edit"></span>
							</a>
						</div>
						<div className="col-xs-4 block">
							<a onClick={this.btnClick}>
								<span className="tasks glyphicon glyphicon-check"></span>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = MobileMenu;