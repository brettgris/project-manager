var React = require('react');
var ReactDOM = require('react-dom');
global.jQuery = require('jquery');
var bootstrap = require('bootstrap');

var Accounts = require('./components/accounts/Accounts');
var AccountDetails = require('./components/details/AccountDetails');
var Projects = require('./components/projects/Projects');
var Tasks = require('./components/tasks/Tasks');
var Notes = require('./components/notes/Notes');

var App = React.createClass({
	getInitialState: function(){
		return{
			page: "home"
		}
	},
	changePage: function(page){
		this.setState({
			page: page
		});
	},
	render: function(){
		var accountmobilevisible = (this.state.page=="home") ? "" : " hidden-xs";

		return(
			<div className="wrapper">
				<div className="container-fluid fill">
					<div className="row fill">
						<div className={"col-sm-3 section col-xs-12"+accountmobilevisible}>
							<div className="row section">
								<Accounts changePage={this.changePage} />
								<Projects changePage={this.changePage} />
							</div>
						</div>
						<Notes page={this.state.page} changePage={this.changePage} />
						<Tasks page={this.state.page} changePage={this.changePage} />
					</div>
				</div>
				<AccountDetails page={this.state.page} changePage={this.changePage} />
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));