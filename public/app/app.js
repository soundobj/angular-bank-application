var RootCtrl = (function () {
    function RootCtrl() {
        this.brand = "Angular";
        this.navStates = [
            { state: "root.manager", title: "Manage Bank Customers" },
        ];
    }
    return RootCtrl;
})();

angular.module("Bank", ["ui.router","ngStorage"]).controller("RootCtrl", RootCtrl)
    .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "root",
        url: "/",
        controller: "RootCtrl",
        controllerAs: "rootCtrl",
        templateUrl: "root.html"
    });
    $urlRouterProvider.otherwise("/");
}).run(function ($state, $rootScope) {
    $rootScope.$state = $state;
});