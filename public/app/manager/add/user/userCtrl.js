var Bank;
(function (Bank) {
    var User;
    (function (User) {
        var UserCtrl = (function () {
            function UserCtrl($state,User) { // errors
                var _this = this;

                _this.onlyWords = /^[a-zA-Z ]*$/;
                _this.onlyDigits = /^([0-9]*)$/;
                _this.user = {};
                _this.addUser = function() {
                    User.saveOrUpdate(_this.user);
                    $state.go("^");
                };
            }
            return UserCtrl;
        })();
        User.UserCtrl = UserCtrl;
        angular.module("Bank").controller("UserCtrl",['$state','User', UserCtrl]).config(function ($stateProvider) {
            $stateProvider.state({
                    name: "root.manager.add",
                    url: "/add",
                    controller: "UserCtrl",
                    controllerAs: "userCtrl",
                    templateUrl: "manager/add/user/user.html"
            });
        });
    })(User = Bank.User || (Bank.User = {}));
})(Bank || (Bank = {}));