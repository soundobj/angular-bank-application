angular.module("Bank").factory("Account",
    ['$http','$filter','User','$localStorage', function($http,$filter,User,$localStorage) {

    var _storage = $localStorage;

    _storage.$default({
        accounts: {}
    });

    var _products =  [
            {
                "id": 1,
                "name": "Basic",
                "overdraft" : "standard",
                "currency" : "USD"
            },
            {
                "id": 2,
                "name": "Extra",
                "overdraft" : "standard",
                "currency" : "GPB"
            },
            {
                "id": 3,
                "name": "Travel",
                "overdraft" : "advanced",
                "currency" : "USD"
            },
            {
                "id": 4,
                "name": "Savings",
                "overdraft" : null,
                "currency" : "GPB"
            },
            {
                "id": 5,
                "name": "ISA",
                "overdraft" : null,
                "currency" : "GPB"
            }
        ];

    return {

        getProducts : function () {
            return _products;
        },

        getProduct : function (id) {
            return this.filterByPropertyValue(_products,"id",id);
        },

        filterByPropertyValue : function(list,property,value) {
            var value = list.filter(function(el){
                if(el[this.property] === parseInt(this.value)) {

                    return true;
                }
            },{ "property":property, "value":value });

            return value[0];
        },

        openAccount : function(user,account) {
            if(!_storage.accounts[user.id]){

                _storage.accounts[user.id] = {};
                _storage.accounts[user.id][account.id] = account;
            } else {

                _storage.accounts[user.id][account.id] = account;
            }
        },

        getUserAccounts : function(userID) {
            if(_storage.accounts[userID]){

                return _storage.accounts[userID];
            } else {

                return undefined;
            }
        },

        userHasProduct : function(product, user) {
            var accounts = this.getUserAccounts(user.id);
            if(!accounts) {

                return false;
            } else {
                if(accounts[product.id]){

                    return true;
                }
            }
        },
    }
}]);
