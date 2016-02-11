var React = require('react');

var AccountItem = React.createClass({
	handleClick: function(){
		this.props.handleClick(this.props.data.id);
	},
	render: function(){
		var style = {}
		if (this.props.data.doc["image"]) {
			style["backgroundImage"] = "url("+this.props.data.doc["image"]+")"
		}
		var accountclass = (this.props.current==this.props.data.id) ? "account selected" : "account";
		return (
			<div className={accountclass}>
				<div>
					<a style={style} onClick={this.handleClick}></a>
				</div>
			</div>
		)
	}
});

module.exports = AccountItem;