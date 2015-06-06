var Bank;
(function (Bank) {
    var UserAccount;
    (function (UserAccount) {
        var UserAccountCtrl = (function () {
            function UserAccountCtrl($state,User,Account) { // errors
                var _this = this;

                _this.onlyDigits = /^([0-9]*)$/;
                _this.userID = $state.params.userID;

                _this.accounts = Account.getUserAccounts($state.params.userID);
                _this.account = _this.accounts[$state.params.accID];
                _this.insufficientFunds = false;

                _this.addFunds = function () {
                    var event = {
                        "type" : "Deposit",
                        "amount" : _this.funds,
                        "originalBalance" : _this.account.balance
                    };

                    _this.account.balance += parseInt(_this.funds);
                    event.finalBalance = _this.account.balance;
                    Account.addAccountEvent(_this.userID,_this.account.id,event);
                    _this.funds = undefined;
                    $state.go("^",{},{reload:true});
                };

                _this.doPayment = function () {

                    if(_this.account.balance < _this.paymentAmount) {
                        _this.insufficientFunds = true;

                    } else {

                        _this.insufficientFunds = false;

                        var event = {
                            "type" : "Transaction",
                            "amount" : _this.paymentAmount,
                            "recipient" : _this.recipient,
                            "originalBalance" : _this.account.balance
                        }

                        _this.account.balance -= parseInt(_this.paymentAmount);
                        event.finalBalance = _this.account.balance;
                        Account.addAccountEvent(_this.userID,_this.account.id,event);
                        $state.go("^",{},{reload:true});
                    }
                }

                _this.resetAccount = function() {
                    Account.resetAccount(_this.userID,_this.account.id);
                    $state.go("root.accounts", {"userID":_this.userID},{"reload":true});
                }

                _this.currentPage = 1;
                _this.itemsPerPage = 5;
                _this.totalItems = _this.account.events.length;
            }

            return UserAccountCtrl;
        })();
        UserAccount.UserAccountCtrl = UserAccountCtrl;
        angular.module("Bank").controller("UserAccountCtrl",
            ['$state','User','Account',UserAccountCtrl]).config(function ($stateProvider) {
                $stateProvider.state({
                    name: "root.accounts.manage",
                    url: "/manage/:accID",
                    controller: "UserAccountCtrl",
                    controllerAs: "mgAccCtrl",
                    templateUrl: "user/manage/userAccount.html"
                })
                .state({
                    name:"root.accounts.manage.add",
                    templateUrl: "user/manage/add.html"
                })
                .state({
                    name:"root.accounts.manage.payment",
                    templateUrl: "user/manage/payment.html"
                })
                .state({
                    name:"root.accounts.manage.statement",
                    templateUrl: "user/manage/statement.html"
                })
                .state({
                    name:"root.accounts.manage.reset",
                    templateUrl: "user/manage/reset.html"
                });
            });
    })(UserAccount = Bank.UserAccount || (Bank.UserAccount = {}));
})(Bank || (Bank = {}));