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
	render: function(){
		return(
			<div className="wrapper">
				<div className="container-fluid fill">
					<div className="row fill">
						<div className="col-sm-3 section">
							<div className="row section">
								<Accounts />
								<Projects />
							</div>
						</div>
						<Tasks />
						<Notes />
					</div>
				</div>
				<AccountDetails />
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));