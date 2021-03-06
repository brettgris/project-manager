var React = require('react');

var Reflux = require('reflux');
var AccountActions = require('../../models/AccountActions');
var AccountsStore = require('../../models/AccountsStore');

var AccountButton = require('./children/AccountButton');
var AccountItem = require('./children/AccountItem');

var Accounts = React.createClass({
	mixins:[Reflux.listenTo(AccountsStore, 'onChange')],
	getInitialState: function(){
		return {
			accounts:[],
			current:{}
		}
	},
	onChange: function(e,data){
		this.setState({
			accounts: data.accounts,
			current: data.current
		})
	},
	componentWillMount: function(){
		AccountActions.getAccounts();
	},
	switchAccount: function(id){
		AccountActions.switchAccount(id);
	},
	handleNewAccount: function(){
		AccountActions.showAccountDetails('ADD');
	},
	render: function(){
		var accountItems = this.state.accounts.map( function(item,key) {
			return (
            	<AccountItem data={item} current={this.state.current.id} key={item.id} handleClick={this.switchAccount} />
            );
        }, this);

		return (
			<div className="col-sm-2 section col-xs-2" id="accounts">
				{accountItems}
				<AccountButton handleClick={this.handleNewAccount} />
			</div>
		)
	}
});

module.exports = Accounts;