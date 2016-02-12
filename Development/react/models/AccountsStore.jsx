var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var AccountActions = require('./AccountActions');
var _ = require('underscore');

var obj = {
	a: "togelytorytheryieleelyin",
	b: "ee2d20a3da52c00f45e5ff9049e0f96821437e9c"
}

var AccountsStore = Reflux.createStore({
	listenables: [AccountActions],
	data: {},
	getAccounts: function(){
		this.data.new = true;
		this.loadAccounts();
		this.data.details = '';
		this.data.newdata = true;
	},
	loadAccounts: function(){
		HTTP.get('accounts', obj, true).then(function(data){
			this.data.accounts = data.rows;
			if (this.data.new) {
				this.data.current = this.data.accounts[0];
				this.data.new = false;
			}
			if (this.data.update){
				var val = this.data.update;
				var account = _.find( this.data.accounts, function(item){
					return item.id==val
				});
				this.data.current = account;
				this.data.details ='';
				this.data.update = null;
				this.data.newdata = true;
			}
			this.triggerUpdate();
			this.data.newdata = false;	
		}.bind(this));
	},
	showAccountDetails: function(type) {
		this.data.details = type;
		this.triggerUpdate();
	},
	switchAccount: function(id){
		if (id!=this.data.current.id) {
			var account = _.find( this.data.accounts, function(item){
				return item.id==id
			});
			this.data.newdata = true;
			this.data.current = account;
			this.triggerUpdate();
			this.data.newdata = false;
		}
	},
	updateAccount: function(data){
		if (this.data.details=='ADD'){
			HTTP.post('accounts', data).then(function(res){
				this.loadAccounts();
				this.data.details ='';
			}.bind(this));
		} else if (this.data.details=='UPDATE'){
			HTTP.put('accounts', data).then(function(res){
				this.data.update = data["_id"];
				this.loadAccounts();
			}.bind(this));
		}
	},
	deleteAccount:function(data){
		data.active = false
		HTTP.put('accounts',data).then(function(res){
			this.getAccounts();
			this.data.current = this.data.accounts[0];
			this.data.details ='';
		}.bind(this));
	},
	triggerUpdate: function(){
		this.trigger('change', this.data);
	}
});

module.exports = AccountsStore;