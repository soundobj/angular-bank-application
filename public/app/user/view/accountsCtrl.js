var Bank;
(function (Bank) {
    var Accounts;
    (function (Accounts) {
        var AccountsCtrl = (function () {
            function AccountsCtrl($state,User,Account) { // errors
                var _this = this;
                _this.accounts = Account.getUserAccounts($state.params.userID);
                _this.user = User.getUser($state.params.userID);

                _this.hasAccounts = false;

                if(_this.accounts && Object.keys(_this.accounts).length) {
                    _this.hasAccounts = true;
                }
            }
            return AccountsCtrl;
        })();
        Accounts.AccountsCtrl = AccountsCtrl;
        angular.module("Bank").controller("AccountsCtrl",
            ['$state','User','Account',AccountsCtrl]).config(function ($stateProvider) {
                $stateProvider.state({
                    name: "root.accounts",
                    url: "user/:userID/accounts",
                    controller: "AccountsCtrl",
                    controllerAs: "accountsCtrl",
                    templateUrl: "user/view/accounts.html"
                });
            });
    })(Accounts = Bank.Accounts || (Bank.Accounts = {}));
})(Bank || (Bank = {}));