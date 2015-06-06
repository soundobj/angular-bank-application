var Bank;
(function (Bank) {
    var Login;
    (function (Login) {
        var LoginCtrl = (function () {
            function LoginCtrl($state,User,Account) { // errors
                var _this = this;

                _this.logUser = function() {
                    _this.user = User.getUser(_this.userID);
                    if(_this.user){

                        $state.go('root.accounts',
                            { userID:_this.userID }
                        );
                    } else {

                        _this.userNotFound = true;
                    }
                };
            }
            return LoginCtrl;
        })();
        Login.LoginCtrl = LoginCtrl;
        angular.module("Bank").controller("LoginCtrl",
            ['$state','User','Account',LoginCtrl]).config(function ($stateProvider) {
                $stateProvider.state({
                    name: "root.login",
                    url: "login",
                    controller: "LoginCtrl",
                    controllerAs: "loginCtrl",
                    templateUrl: "user/login/login.html"
                });
            });
    })(Login = Bank.Login || (Bank.Login = {}));
})(Bank || (Bank = {}));