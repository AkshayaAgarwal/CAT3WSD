(function () {
    'use strict';

    angular.module('myApp', ["ngRoute"])

        .controller('MyController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })
        })

        .controller('createController', function ($scope) {
            $scope.createEntry = function () {
                var newData = "{\"empid\":\"" + $scope.empid + "\", \"empname\":\"" + $scope.empname + "\", \"empdes\":\"" + $scope.empdes + "\", \"empdepart\":\"" + $scope.empdepart + "\", \"empsal\":\"" + $scope.empsal + "\", \"emploc\":\"" + $scope.emploc + "\"}";

                fetch('http://localhost:3000/new', {
                    method: "POST",
                    body: newData,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.empid=""
                $scope.empname=""
                $scope.empdes=""
                $scope.empdepart=""
                $scope.empsal=""
                $scope.emploc=""
            };
        })

        .controller('updateController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })

            $scope.getId = function () {
                var selectedId = $scope.empid
                console.log(empId)
                $scope.empname = selectedId['empname']
                $scope.empdes = selectedId['empdes']
                $scope.empdepart = selectedId['empdepart']
                $scope.empsal = selectedId['empsal']
                $scope.emploc = selectedId['emploc']
            }

            $scope.updateEntry = function () {
                var newData = "{\"empid\":\"" + $scope.empid['empid'] + "\", \"empname\":\"" + $scope.empname + "\", \"empdes\":\"" + $scope.empdes + "\", \"empdepart\":\"" + $scope.empdepart + "\", \"empsal\":\"" + $scope.empsal + "\", \"emploc\":\"" + $scope.emploc + "\"}";

                fetch('http://localhost:3000/update', {
                    method: "POST",
                    body: newData,
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.empid=""
                $scope.empname=""
                $scope.empdes=""
                $scope.empdepart=""
                $scope.empsal=""
                $scope.emploc=""
            };
        })

        .controller('searchController', function ($scope, $rootScope) {
            $scope.getData = function () {
                var searchJson = { empdepart: $scope.empdepart }
                var jsonObj = JSON.stringify(searchJson)
                fetch('http://localhost:3000/search', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    $scope.datas = json
                })
                .catch(err => console.log(err))
            }
        })

        .controller('deleteController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })
            $scope.deleteEntry = function () {
                var delJson = { delID: $scope.del.empid }
                var jsonObj = JSON.stringify(delJson)

                fetch('http://localhost:3000/delete', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.del = ""
            }
        })

        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "see.html"
                })
                .when("/create", {
                    templateUrl: "new.html",
                    controller: "createController"
                })
                .when("/update", {
                    templateUrl: "change.html",
                    controller: "updateController"
                })
                .when("/search", {
                    templateUrl: "find.html",
                    controller: "searchController"
                })
                .when("/delete", {
                    templateUrl: "remove.html",
                    controller: "deleteController"
                });
        })
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('');
        }])
})();