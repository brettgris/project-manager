var React = require('react');

var AccountButton = React.createClass({
	render: function(){
		return (
			<div className="add-wrapper">
				<div className="add">
					<button className="btn btn-default" type="submit" onClick={this.props.handleClick} >
						<span className="glyphicon glyphicon-plus"></span>
					</button>
				</div>
			</div>
		)
	}
});

module.exports = AccountButton;