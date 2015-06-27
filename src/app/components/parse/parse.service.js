class ParseService {
  constructor ($q) {
    'ngInject';
    this.q = $q;

  }

  login(username,password) {
    var defer = this.q.defer();
    console.log("ParseService login");
    Parse.User.logIn(username, password,{
      success: function (user){
        defer.resolve(true);
      },
      error : function (err){
        defer.reject(err);
      }
    });
    return defer.promise;
  }

  addUser(username,password) {
    var defer = this.q.defer();
    console.log("ParseService addUser");
    Parse.User.signUp(username, password,{
      success: function (user){
        defer.resolve(true);
      },
      error : function (err){
        defer.reject(err);
      }
    });
    return defer.promise;
  }
}

export default ParseService;
