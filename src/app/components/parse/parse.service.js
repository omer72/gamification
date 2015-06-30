class ParseService {
  constructor ($q) {
    'ngInject';
    this.q = $q;
    this.currentUser = {};

  }

  login(username,password) {
    var defer = this.q.defer();
    var vm = this;
    console.log("ParseService login");
    Parse.User.logIn(username, password,{
      success: function (user){
        vm.getCurrentClallUser(user.id).then(function(){
          defer.resolve(true);
        });

      },
      error : function (err){
        defer.reject(err);
      }
    });
    return defer.promise;
  }

  //logout(){
  //  Parse.User.logOut();
  //}

  getCurrentClallUser(userId){
      var defer = this.q.defer();
      var vm = this;
      console.log("ParseService getClallUser");
      var ClallUser = Parse.Object.extend("ClallUser");
      var query = new Parse.Query(ClallUser);
      query.equalTo("userId", userId);
      query.find({
        success: function(results) {
          vm.currentUser = results[0].attributes;
          sessionStorage.user = JSON.stringify(vm.currentUser);
          defer.resolve(results);
        },
        error: function(error) {
          defer.reject(error);
        }
      });

      return defer.promise;
  }

  addClallUser(username,userId) {
    var defer = this.q.defer();
    console.log("ParseService addClallUser");
    var ClallUser = Parse.Object.extend("ClallUser");
    var clallUser = new ClallUser();
    clallUser.set('username',username);
    clallUser.set('userId',userId);
    clallUser.set('points',1000);
    clallUser.set('badges','none');
    clallUser.save(null,{
        success: function(clallUser){
          vm.currentUser = clallUser;
          sessionStorage.user = JSON.stringify(vm.currentUser);
          defer.resolve(clallUser);
        },
        error: function(clallUser,error){
          defer.reject(error);
        }
      }
    );
    return defer.promise;

  }

  addUser(username,password) {
    var defer = this.q.defer();
    console.log("ParseService addUser");
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.signUp(null,{
      success: function (user){
        defer.resolve(user);
      },
      error : function (err){
        defer.reject(err);
      }
    });
    return defer.promise;
  }

  getClallUser(){
    var defer = this.q.defer();
    var vm = this;
    console.log("ParseService getClallUser");
    var ClallUser = Parse.Object.extend("ClallUser");
    var query = new Parse.Query(ClallUser);
    query.descending('points');
    query.find({
      success: function(results) {

        defer.resolve(results);
      },
      error: function(error) {
        defer.reject(error);
      }
    });

    return defer.promise;
  }

  updateClallUserPoints(user){
    var defer = this.q.defer();
    var vm = this;
    console.log("ParseService getClallUser");
    var ClallUser = Parse.Object.extend("ClallUser");
    var query = new Parse.Query(ClallUser);
    query.equalTo("userId", user.userId);
    query.find({
      success: function(results) {
        results[0].set('points',user.points);
        results[0].save();
        defer.resolve(results);
      },
      error: function(error) {
        defer.reject(error);
      }
    });

    return defer.promise;
  }

  getQuestionList(){
    var defer = this.q.defer();
    var QuestionListObject = Parse.Object.extend("questionList");
    var query = new Parse.Query(QuestionListObject);
    query.find({
      success: function(results){
        var questions = [];
        for (var j = 0; j < results.length; j++) {
          questions.push({"id": results[j].id,
            "questionId": results[j].attributes.questionId,
            "subject":results[j].attributes.subject,
            "points":results[j].attributes.points,
            "badge":results[j].attributes.badge});
        }
        defer.resolve(questions);

      },
      error : function(err){
        console.error("Error: " + error.code + " " + error.message);
        defer.reject(err);
      }
    });

    return defer.promise;
  }

  checkReadyQuestion(){
    var defer = this.q.defer();
    var QuestionListObject = Parse.Object.extend("questionList");
    var query = new Parse.Query(QuestionListObject);
    query.equalTo("ready", true);

    query.find({
      success: function(results){
        var questions = [];
        for (var j = 0; j < results.length; j++) {
          questions.push({"id": results[j].id,
            "questionId": results[j].attributes.questionId,
            "subject":results[j].attributes.subject,
            "points":results[j].attributes.points,
            "badge":results[j].attributes.badge});
        }
        defer.resolve(questions);

      },
      error : function(err){
        console.error("Error: " + error.code + " " + error.message);
        defer.reject(err);
      }
    });

    return defer.promise;
  }

  getReadyQuestion(id){
    var defer = this.q.defer();
    var QuestionsObject = Parse.Object.extend("questions");
    var query = new Parse.Query(QuestionsObject);
    query.get(id, {
      success: function(results){
        var question = results.attributes;
        var questions = [];
        for(var i=0;i<question.numOfQuestions;i++){
          questions[i] = results.attributes["question_"+(i+1)];
        }
        question.questions = questions;
        defer.resolve(question);
      },
      error : function(err){
        console.error("Error: " + error.code + " " + error.message);
        defer.reject(err);
      }
    });

    return defer.promise;
  }

  getSystemRules(){
    var defer = this.q.defer();
    var vm = this;
    console.log("ParseService getSystemRules");
    var SystemRules = Parse.Object.extend("systemRules");
    var query = new Parse.Query(SystemRules);
    query.find({
      success: function(results) {

        defer.resolve(results);
      },
      error: function(error) {
        defer.reject(error);
      }
    });

    return defer.promise;
  }

  updateSystemRules(systemRule){
    var defer = this.q.defer();
    var vm = this;
    console.log("ParseService updateSystemRules");
    var SystemRules = Parse.Object.extend("systemRules");
    var query = new Parse.Query(SystemRules);
    //query.equalTo("userId", user.userId);
    query.get(systemRule.id,{
      success: function(results) {
        results.set('firstLevel',systemRule.attributes.firstLevel);
        results.set('secondLevel',systemRule.attributes.secondLevel);
        results.set('thirdLevel',systemRule.attributes.thirdLevel);
        results.save();
        defer.resolve(results);
      },
      error: function(error) {
        defer.reject(error);
      }
    });

    return defer.promise;
  }


}

export default ParseService;
