var React = require('react');

var NotesHeader = React.createClass({
	render: function(){
		var title = ( this.props.project!=undefined ) ? this.props.project["doc"]["name"] : "";
		var visible = (this.props.project!=undefined) ? "" : " hide";

		return(
			<div className={"header"+visible}>
				<h3 className="center">{title}</h3>
			</div>
		)
	}
});

module.exports = NotesHeader;