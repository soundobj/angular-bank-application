var Bank;
(function (Bank) {
    var Users;
    (function (Users) {
        var UsersCtrl = (function () {
            function UsersCtrl(User) {
                var _this = this;
                _this.users = User.getUsers();
            }
            return UsersCtrl;
        })();
        Users.UsersCtrl = UsersCtrl;
        angular.module("Bank").controller("UsersCtrl", UsersCtrl).config(function ($stateProvider) {
            $stateProvider.state({
                name: "root.manager.users",
                url: "/users",
                controller: "UsersCtrl",
                controllerAs: "usersCtrl",
                templateUrl: "manager/view/users.html"
            });
        });
    })(Users = Bank.Users || (Bank.Users = {}));
})(Bank || (Bank = {}));