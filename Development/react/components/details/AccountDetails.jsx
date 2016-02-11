var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../models/Actions');
var AccountsStore = require('../../models/AccountsStore');
var Dropzone = require('dropzone');

var AccountDetails = React.createClass({
	mixins:[Reflux.listenTo(AccountsStore, 'onChange')],
	getInitialState: function(){
		return {
			show: "",
			name: "",
			nameerror: false,
			imageerror: false,
			updated: false,
			image: null,
			icon: true,
			loader: false
		}
	},
	componentDidMount: function(){
		var myDropzone = new Dropzone("div#accounticon", { 
			paramName: "file",
			url: "data/img.php",
			maxFiles: 1,
			thumbnailWidth: 200,
			thumbnailHeight: 200
		});

		var self = this;
		var removeicon = function(){
			self.setState({
				icon: false,
				loader: true,
				image: null
			})
		}

		var setimage = function(url){
			self.setState({
				image: url,
				loader: false
			})
		}

		myDropzone.on("drop",function(event){
			removeicon()
		});

		myDropzone.on("complete", function(file){
			setimage(file.xhr.response)
		});

	},
	onChange: function(e,data) {
		var n = (data.details=="UPDATE") ? data.current.doc.name : "";
		var icon,image;
		if (data.details=="UPDATE") {
			image = data.current.doc.image,
			icon = (image==""||image==null)
		} else{
			image = ""
			icon = true
		}

		this.setState({
			name: n,
			show: data.details,
			account: data.current,
			image: image,
			icon: icon,
			loader: false
		});
	},
	validate: function(){
		valid = true;
		if (this.state.name.length<1) {
			valid = false;
			this.setState({
				nameerror: true
			});
		}

		if (valid) this.addAccount();
	},
	addAccount: function(){
		var data = {
			name: this.state.name,
			active: true,
			image: this.state.image
		}

		if (this.state.show=="UPDATE") {
			data["_id"] = this.state.account.id;
			data["_rev"] = this.state.account.doc._rev;
			
			Actions.updateAccount(data);
		} else {
			Actions.updateAccount(data);
		}
	},
	nameChange: function(e){
		this.setState({
			nameerror: false,
			name: e.target.value
		});
	},
	imageChange: function(e){
		this.setState({
			image: e.target.files[0]
		})
	},
	deleteAccount: function(){
		Actions.deleteAccount(this.state.account.id,this.state.account.doc._rev);
	},
	cancel: function(){
		Actions.showAccountDetails('');
	},
	render: function(){
		var detailsclass = (this.state.show=="") ? "module hidden" : "module";
		var nameclass = (this.state.nameerror) ? "form-group has-error" : "form-group";
		var imageclass = (this.state.imageerror) ? "form-group has-error" : "form-group";
		var namehelp = (this.state.nameerror) ? "help-block" : "hide";
		var buttonCopy = (this.state.show!="UPDATE") ? "SUBMIT" : "UPDATE";
		var iconvisible = (this.state.icon) ? "glyphicon glyphicon-file" : "glyphicon glyphicon-file hide";
		var loadervisible = (this.state.loader) ? "loader" : "loader hide";

		var style={};
		var previewvisible = "previewimage hide";
		if (this.state.image){
			style["backgroundImage"]= "url("+this.state.image+")";
			previewvisible = "previewimage";
		}

		var deleteBtn = function(self){
			if (self.state.show=="UPDATE") {
				return (
					<button className="btn btn-danger" type="button" onClick={self.deleteAccount}>DELETE</button>
				);
			} 
		}

		return(
			<div id="details" className={detailsclass}>
				<h3>{this.state.show} ACCOUNT</h3>
				<form>
					<div className={nameclass}>
						<label htmlFor="accountname">Account Name</label>
						<input id="accountname" className="form-control" type="text" onChange={this.nameChange} value={this.state.name}></input>
						<p className={namehelp}>Please enter a name</p>
					</div>
					<div className={imageclass}>
						<label htmlFor="accounticon">Account Icon</label>
						<div id="accounticon" style={style}>
							<div className={loadervisible}></div>
							<span className={iconvisible}></span>
						</div>
						<p className="help-block">Recommend size 500x500.</p>
					</div>
					<button className="btn btn-primary" type="button" onClick={this.validate}>{buttonCopy}</button>
					{deleteBtn(this)}
					<a className="cancel" role="button" onClick={this.cancel}>Cancel</a>
				</form>
			</div>
		);
	}
});

module.exports = AccountDetails;

