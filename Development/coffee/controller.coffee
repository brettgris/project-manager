angular = require 'angular'
$ = require 'jquery'
# uibootstrap = require 'angular-ui-bootstrap'
pouchdb = require 'angular-pouchdb'

do ->
	app = angular.module "ProjectManger", [ 'pouchdb' ]
	
	app.controller "PMController", ['$scope','AccountDatabase','AccountsFactory', ($scope,AccountDatabase,AccountsFactory)->
		AccountDatabase.allDocs(
  			include_docs: true
  		).then (result) ->
  			$scope.accounts = result.rows
  			setVars()

		setVars = =>
			$scope.current = {
				account: $scope.accounts[0]
			};
			$scope.Account = AccountsFactory
			# $scope.detailsData = {};

		# $scope.updateaccount = (type) =>
		# 	if (type=='UPDATE')
		# 		$scope.detailsData = $scope.current.account
		# 	$scope.detailsData.type = type
		# 	$scope.details = true

		# $scope.addaccount = =>
		# 	valid = true;
		# 	if ($scope.detailsData.name==undefined)
		# 		valid = false
		# 		$scope.detailsData.nameerror = true

		# 	if (valid)
		# 		data = 
		# 			# id: if ($scope.accounts[$scope.accounts.length-1]) then $scope.accounts[$scope.accounts.length-1].id++ else 0
		# 			name: $scope.detailsData.name
				
		# 		# $http.post(SERVER+"accounts", data).success =>
		# 		# 	$scope.detailsData = {}
		# 		# 	$scope.details = ''
		# 		# 	$scope.accounts.push data


		# $scope.canceladdaccount = =>
		# 	$scope.details = false
		# 	$scope.detailsData = {}

		$scope
	]

	app.factory 'AccountDatabase', [ 'pouchDB', (pouchDB) ->
		AccountDatabase = pouchDB('accounts')
		remote = 'https://togelytorytheryieleelyin:ee2d20a3da52c00f45e5ff9049e0f96821437e9c/*@brettgris.cloudant.com/accounts'
		AccountDatabase.replicate.to remote, {}
		AccountDatabase.replicate.from remote, {}
		AccountDatabase
	]

	app.factory 'AccountsFactory', [ ->
		obj = 
			updateaccount: (newitem) ->
				console.log "update", newitem, $scope

		obj
	]

