const INIT = new WeakMap();
const SERVICE = new WeakMap();

class DashboardController {
  constructor ($state,parseSrv,$interval) {
    'ngInject';

    SERVICE.set(this,parseSrv);
    this.parseSrv = parseSrv;
    this.getClallUser($interval);
    this.clallUsers = [];
    this.questionList = [];
    this.stop;
    INIT.set(this,() =>{
      SERVICE.get(this).getQuestionList().then(questionList =>{
      this.questionList = questionList;
    })
    });
    INIT.get(this)();
  }


  getClallUser($interval){
    var vm = this;
    console.log('getClallUser');

    this.stop = $interval(function(){
      SERVICE.get(vm).getClallUser().then(
        function success(results){
          var users = [];
          for (var j = 0; j < results.length; j++) {
            users.push({"username": results[j].attributes.username, "points": results[j].attributes.points,"badge":results[j].attributes.badge});
          }
          vm.clallUsers = users;
        },
        function error(err){
          console.log("err ->"+vm);
        })
    },5000)
  }



}


export default DashboardController;
