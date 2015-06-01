angular.module("Bank").factory("User", ['$localStorage','$filter', function($localStorage,$filter) {

    var _storage = $localStorage;

    _storage.$default({
        users: []
    });

    return {

        saveOrUpdate : function (user) {
            var storedUser = this.findUserByName(user.name);
            if(storedUser){

                user.id = storedUser.id;
                _storage.users[user.id] = user;
            } else {

                user.id = _storage.users.length || 0;
                _storage.users.push(user);
            }
        },

        findUserByName : function(userName) {
            var user = _storage.users.filter(function(el){
                if(el.name === this.userName) {

                    return true;
                }
            },{userName: userName});
            return user[0];
        },

        getUsers : function () {
          return _storage.users;
        },

        getUser : function(id) {
          return _storage.users[id];
        },

        getUserAccounts : function(user) {

        },

        addUserAccount : function (user,account) {

        },

        sendPayment : function(user,account) {

        },

        viewAccountHistory : function(user,account) {

        },

        deleteUser : function(user) {

        },

        transferFunds: function(account,account) {

        }
    }
}]);