describe('User', function () {
    // Load your module.
    beforeEach(module('Bank'));

    // Setup the mock service in an anonymous module.
    beforeEach(module(function ($provide) {
        $provide.value('Account', {
            someVariable: 1
        });
    }));

        //Users store
        //[   {"name":"dan","phone":"123","id":0},
        //    {"name":"pen","phone":"123","id":1},
        //    {"name":"john","phone":"34223","id":2}
        //]

    it('can get an instance of my factory', inject(function(User) {
        expect(User).toBeDefined();
    }));

    it('saves and gets user from store', inject(function(User) {
        // mock local store
        User.setStorage = {};
        spyOn(User, 'findUserByName').and.callFake(function(userName) {
            return undefined;
        });

        User.saveOrUpdate({"name":"dan","phone":"123","id":0});

        expect(User.getUser(0).name).toBe("dan");
        expect(User.getUsers().length).toBe(1);
    }));
});