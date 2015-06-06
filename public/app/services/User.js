angular.module("Bank").factory("User", ['$localStorage','Account', function($localStorage,Account) {

    var _storage = $localStorage;

    _storage.$default({
        users: []
    });

    return {

        setStorage : function (storage) {
            _storage = storage;
        },

        getStorage : function() {
            return _storage;
        },

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
            return Account.filterByPropertyValue(_storage.users,"name",userName);
        },

        getUsers : function () {
          return _storage.users;
        },

        getUser : function(id) {
          return _storage.users[id];
        }
    }
}]);