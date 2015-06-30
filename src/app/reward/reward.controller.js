const SERVICE = new WeakMap();

class RewardController {
  constructor ($scope,$mdDialog,parseSrv) {
    this.mdDialog = $mdDialog;
    console.log('RewardController');
    SERVICE.set(this,parseSrv);
    this.clallUsers = [];
    this.getClallUser();
    this.selectedFriend;
  }

  getClallUser(){
    var vm = this;
    console.log('getClallUser');
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
  }

  hide() {
    this.mdDialog.hide();
  };
  cancel() {
    this.mdDialog.cancel();
  };
  answer(answer) {
    this.mdDialog.hide(answer);
  };
}

export default RewardController;
