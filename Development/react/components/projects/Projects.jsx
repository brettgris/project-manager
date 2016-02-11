var React = require('react');

var Reflux = require('reflux');
var Actions = require('../../models/Actions');
var AccountsStore = require('../../models/AccountsStore');

var Projects = React.createClass({
	mixins:[Reflux.listenTo(AccountsStore, 'changeAccount')],
	getInitialState: function(){
		return {
			account:{}
		}
	},
	changeAccount: function(e,data){
		if (data.newdata) {
			this.setState({
				account: data.current
			});

			console.log( "load folders" );
			console.log( "load projects" );
		}
	},
	editAccount: function(){
		Actions.showAccountDetails('UPDATE');
	},
	render: function(){
		var name = (this.state.account['doc']) ? this.state.account.doc.name : "";

		return (
			<div className="col-sm-10 section" id="projects">
				<div className="account-title">
					<h3> {name}
						<a onClick={this.editAccount} className="glyphicon glyphicon-cog"></a>
					</h3>
				</div>
			</div>
		)
	}
});

module.exports = Projects;