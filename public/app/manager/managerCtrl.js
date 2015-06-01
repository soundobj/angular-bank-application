var Bank;
(function (Bank) {
    var Manager;
    (function (Manager) {
        var ManagerCtrl = (function () {
            function ManagerCtrl() {
                var _this = this;
            }
            return ManagerCtrl;
        })();
        Manager.ManagerCtrl = ManagerCtrl;
        angular.module("Bank").controller("ManagerCtrl", ManagerCtrl).config(function ($stateProvider) {
            $stateProvider.state({
                name: "root.manager",
                url: "manager",
                controller: "ManagerCtrl",
                controllerAs: "managerCtrl",
                templateUrl: "manager/manager.html"
            });
        });
    })(Manager = Bank.Manager || (Bank.Manager = {}));
})(Bank || (Bank = {}));