var Bank;
(function (Bank) {
    var Account;
    (function (Account) {
        var AccountCtrl = (function () {
            function AccountCtrl($state,Account) { // errors
                var _this = this;

                _this.onlyDigits = /^([0-9]*)$/;

                _this.product = Account.getProduct($state.params.accID);
                _this.balance = 0;

                _this.openAccount = function() {
                    _this.product.balance = parseInt(_this.balance);
                    Account.openAccount({id:$state.params.userID},_this.product);
                    $state.go('^',null, {reload: true});
                }
            }
            return AccountCtrl;
        })();
        Account.AccountCtrl = AccountCtrl;
        angular.module("Bank").controller("AccountCtrl",
            ['$state','Account', AccountCtrl]).config(function ($stateProvider) {
                $stateProvider.state({
                    name: "root.manager.users.account-management.create-account",
                    url: "/open/:accID",
                    controller: "AccountCtrl",
                    controllerAs: "accountCtrl",
                    templateUrl: "manager/add/account/account.html"
                });
            });
    })(Account = Bank.Account || (Bank.Account = {}));
})(Bank || (Bank = {}));