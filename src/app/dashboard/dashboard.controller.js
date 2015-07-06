const INIT = new WeakMap();
const SERVICE = new WeakMap();

class DashboardController {
  constructor ($state,parseSrv,$interval,$timeout, $q, $log) {
    'ngInject';

    SERVICE.set(this,parseSrv);
    this.parseSrv = parseSrv;
    this.getClallUser($interval);
    this.clallUsers = [];
    this.questionList = [];
    this.systemRules = {};
    this.stop;
    this.log = $log;

    this.simulateQuery = false;
    this.isDisabled    = false;

    // list of `state` value/display objects
    this.querySearch   = this.querySearch;
    this.selectedItemChange = this.selectedItemChange;
    this.searchTextChange   = this.searchTextChange;
    INIT.set(this,() =>{
      SERVICE.get(this).getQuestionList().then(questionList =>{
        this.questionList = questionList;
      })
      SERVICE.get(this).getClallUser().then(ClallUser =>{
        this.states = ClallUser;
      })
      SERVICE.get(this).getSystemRules().then(systemRules =>{
        this.systemRules  = systemRules[0];
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
          vm.clallUsers = results;
        },
        function error(err){
          console.log("err ->"+vm);
        })
    },2000)
  }

  getSystemRules(){
    var vm = this;
    console.log('getSystemRules');

      SERVICE.get(vm).getSystemRules().then(
        function success(results){
          console.log(results);
        },
        function error(err){
          console.log("err ->"+vm);
        })
  }

  updateSystemRule(){
  var vm = this;
  console.log('updateSystemRule');

  SERVICE.get(vm).updateSystemRules(vm.systemRules).then(
    function success(results){
      console.log(results);
    },
    function error(err){
      console.log("err ->"+vm);
    })
  }

 

  hide() {
    this.mdDialog.hide();
  };
  cancel() {
    this.mdDialog.cancel();
  };
  answer(answer) {
    var vm = this;
    this.selectedFriend.points +=this.rewardsPoints;
     SERVICE.get(vm).updateClallUserPoints(this.selectedFriend).then(
      function success(results){
         //vm.mdDialog.hide(answer);
      },
      function error(err){
        console.log("err ->"+vm);
      })
   
  };

   querySearch (query) {
      var results = query ? this.states.filter( this.createFilterFor(query) ) : this.states,
          deferred;
      if (this.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
  
  searchTextChange(text) {
      this.log.info('Text changed to ' + text);
    }

  selectedItemChange(item) {
      this.selectedFriend =item;
    }

    /**
     * Create filter function for a query string
     */
     createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.username.indexOf(lowercaseQuery) === 0);
      };

    }


}


export default DashboardController;
