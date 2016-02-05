angular = require 'angular'
$ = require 'jquery'
uibootstrap = require 'angular-ui-bootstrap'

SERVER = "http://localhost:6069/"

do ->
	app = angular.module "ProjectManger", [ 'ui.bootstrap' ]
	app.controller "PMController", ['$scope','$http', ($scope,$http)->
		$http.get(SERVER).then (res) ->
			$.extend $scope, res.data
			setVars()

		setVars = =>
			$scope.current = {
				account: 0
			};
			$scope.detailsData = {};

		$scope.addaccount = =>
			valid = true;
			if ($scope.detailsData.name==undefined)
				valid = false
				$scope.detailsData.nameerror = true

			if (valid)
				data =
					id: if ($scope.accounts[$scope.accounts.length-1]) then $scope.accounts[$scope.accounts.length-1].id++ else 0
					name: $scope.detailsData.name
				
				$http.post(SERVER+"accounts", data).success =>
					$scope.detailsData = {}
					$scope.details = false
					$scope.accounts.push data

		$scope.canceladdaccount = =>
			$scope.details = false
			$scope.detailsData = {}

		$scope
	]