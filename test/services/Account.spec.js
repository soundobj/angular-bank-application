describe('Account', function () {
    // Load your module.
    beforeEach(module('Bank'));

    // Setup the mock service in an anonymous module.
    beforeEach(module(function ($provide) {
        $provide.value('User', {
            someVariable: 1
        });
    }));
        // Accounts store
        // _storage = {
        //    "0": {
        //        "1":{
        //            "id":1,
        //            "name":"Basic",
        //            "overdraft":"standard",
        //            "currency":"USD",
        //            "balance":167,
        //            "events":[{
        //                "type":"Open",
        //                "timestamp":1433598907916,
        //                "amount":23,
        //                "originalBalance":0,
        //                "finalBalance":23
        //            }]
        //        }
        //    }
        //}


    it('can get an instance of my factory', inject(function(Account) {
        expect(Account).toBeDefined();
    }));

    it('gets a list of products', inject(function(Account) {
        expect(Account.getProducts().length > 0).toBeTruthy();
    }));

    it('gets a product by id', inject(function(Account) {
        var product = Account.getProduct("2");
        expect(product.name).toBe("Extra");
    }));

    it('checks user has product', inject(function(Account) {
        spyOn(Account, 'getUserAccounts').and.callFake(function(userID) {
            return {"1":true,"2":true};
        });
        expect(Account.userHasProduct({id:"1"},0)).toBeTruthy();
        expect(Account.getUserAccounts).toHaveBeenCalled();
    }));

    it('opens an account', inject(function(Account) {
        // mock local store
        Account.setStorage = {};

        var newAccount = Account.getProduct("2");
        newAccount.balance = 500;
        Account.openAccount({id:0},newAccount);

        var storage = Account.getStorage();

        expect(storage["accounts"]["0"]["2"]["balance"]).toBe(500);
        expect(storage["accounts"]["0"]["2"]["events"].length).toBe(1);

    }));

    it('gets user accounts', inject(function(Account) {
        // mock local store
        Account.setStorage = {};
        Account.openAccount({id:0},Account.getProduct("1"));
        expect(Account.getUserAccounts("0")["1"].name).toBe('Basic');
        expect(Account.getUserAccounts("0")["2"]).toBe(undefined);
    }));

    it('adds account event', inject(function(Account) {
        // mock local store
        Account.setStorage = {};
        Account.openAccount({id:0},Account.getProduct("1"));
        Account.addAccountEvent("0","1",{"type" : "Deposit"});

        expect(Account.getUserAccounts("0")["1"].events.length).toBe(2);
        expect(Account.getUserAccounts("0")["1"].events[1].type).toBe("Deposit");
    }));

    it('resets account ', inject(function(Account) {
        // mock local store
        Account.setStorage = {};
        Account.openAccount({id:0},Account.getProduct("1"));
        Account.resetAccount("0","1");

        expect(Account.getUserAccounts("0")["1"]).toBe(undefined);
    }));
});