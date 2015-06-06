var Bank;
(function (Bank) {
    var UserAccounts;
    (function (UserAccounts) {
        var UserAccountsCtrl = (function () {
            function UserAccountsCtrl($state,User,Account) { // errors
                var _this = this;

                _this.user = User.getUser($state.params.userID);
                _this.products = Account.getProducts();
                _this.userAccounts = Account.getUserAccounts(_this.user.id);

                _this.availableProducts = [];
                _this.prepareOptions = function () {
                    for( var i = 0; i < _this.products.length; i++) {
                        if(!Account.userHasProduct(_this.products[i],_this.user)){

                            _this.availableProducts.push(_this.products[i]);
                        }
                    }
                };

                _this.prepareOptions();

            }
            return UserAccountsCtrl;
        })();
        UserAccounts.UserAccountsCtrl = UserAccountsCtrl;
        angular.module("Bank").controller("UserAccountsCtrl",
            ['$state','User','Account',UserAccountsCtrl]).config(function ($stateProvider) {
                $stateProvider.state({
                    name: "root.manager.users.account-management",
                    url: "/:userID",
                    controller: "UserAccountsCtrl",
                    controllerAs: "accCtrl",
                    templateUrl: "manager/manage/userAccounts.html"
                });
        });
    })(UserAccounts = Bank.UserAccounts || (Bank.UserAccounts = {}));
})(Bank || (Bank = {}));