var Bank;
(function (Bank) {
    var ManageUser;
    (function (ManageUser) {
        var ManageUserCtrl = (function () {
            function ManageUserCtrl($state,User,Account) { // errors
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
            return ManageUserCtrl;
        })();
        ManageUser.ManageUserCtrl = ManageUserCtrl;
        angular.module("Bank").controller("ManageUserCtrl",
            ['$state','User','Account',ManageUserCtrl]).config(function ($stateProvider) {
                $stateProvider.state({
                    name: "root.manager.view-users.account-management",
                    url: "/manage-accounts/user/:userID",
                    controller: "ManageUserCtrl",
                    controllerAs: "accCtrl",
                    templateUrl: "manager/manage/manageUser.html"
                });
        });
    })(ManageUser = Bank.ManageUser || (Bank.ManageUser = {}));
})(Bank || (Bank = {}));