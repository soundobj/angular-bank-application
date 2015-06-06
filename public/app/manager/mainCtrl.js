angular.module("Bank").controller("mainCtrl", function(){}).config(function ($stateProvider) {
    $stateProvider.state({
        name: "root.manager",
        url: "manager",
        templateUrl: "manager/main.html"
    });
});