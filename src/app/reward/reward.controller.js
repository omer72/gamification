const SERVICE = new WeakMap();
const INIT = new WeakMap();


class RewardController {
  constructor ($scope,$mdDialog,parseSrv,$log) {
    this.mdDialog = $mdDialog;
    console.log('RewardController');
    SERVICE.set(this,parseSrv);
    this.clallUsers = [];
    this.selectedFriend;
    this.rewardsPoints = 0;
    this.simulateQuery = false;
    this.isDisabled    = false;
    this.log = $log;

    // list of `state` value/display objects
    this.querySearch   = this.querySearch;
    this.selectedItemChange = this.selectedItemChange;
    this.searchTextChange   = this.searchTextChange;

    INIT.set(this,() =>{
      
      SERVICE.get(this).getClallUser().then(ClallUser =>{
        this.clallUsers = ClallUser;
      })
    });
    INIT.get(this)();
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
         vm.mdDialog.hide(answer);
      },
      function error(err){
        console.log("err ->"+vm);
      })
   
  };

  querySearch (query) {
      var results = query ? this.clallUsers.filter( this.createFilterFor(query) ) : this.clallUsers,
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

export default RewardController;
