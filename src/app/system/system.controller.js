const SERVICE = new WeakMap();
const INIT = new WeakMap();

class SystemController {
  constructor ($state,parseSrv,$mdDialog) {
    'ngInject';
    console.log("SystemController");
    this.state = $state;
    this.parseSrv = parseSrv;
    SERVICE.set(this,parseSrv);
    this.currentUser  = JSON.parse(sessionStorage.user);
    this.mdDialog = $mdDialog;
    this.rate = 0;
    this.systemRules = {};
    INIT.set(this,() =>{
      SERVICE.get(this).getSystemRules().then(systemRules =>{
          this.systemRules  = systemRules[0].attributes;
      })
    });
    INIT.get(this)();

  }

  submitForm(){
    var vm = this;
    console.log('submitForm '+vm.rate);
    if (vm.rate <= vm.systemRules.firstLevelTop){
      console.log('submitForm '+vm.rate);
      vm.showRewardDialog(vm.systemRules.firstLevel);
    }else if (vm.rate > vm.systemRules.firstLevelTop && vm.rate <= vm.systemRules.secondLevelTop){
      console.log('submitForm '+vm.rate);
      vm.showRewardDialog(vm.systemRules.secondLevel);

    }else if (vm.rate > vm.systemRules.secondLevelTop && vm.rate <= vm.systemRules.thirdLevelTop){
      console.log('submitForm '+vm.rate);
      vm.showRewardDialog(vm.systemRules.thirdLevel);

    }

      SERVICE.get(vm).checkReadyQuestion().then(
        function success(results) {
          var question = {};
          if (results.length >0) {
            question = {
              "questionId": results[0].questionId,
              "subject": results[0].subject,
              "points": results[0].points,
              "badge": results[0].badge
            };
            //}
            if (vm.creentQuestion == undefined || vm.creentQuestion.id != question.id) {
              vm.creentQuestion = question;
              sessionStorage.currentQuestion = JSON.stringify(question);
              vm.stopInterval();
              vm.mdDialog.show({
                controller: 'DialogController',
                controllerAs: 'dialogCtrl',
                templateUrl: 'app/gamePanel/dialog1.tmpl.html',
                parent: angular.element(document.body),
              })
                .then(function (answer) {
                  vm.alert = 'You said the information was "' + answer + '".';
                }, function () {
                  vm.alert = 'You cancelled the dialog.';
                });
            }
          }

        },
        function error(err){
          console.log("err ->"+vm);
        })
  }

  showRewardDialog(value){
  var vm = this;
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = this.mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('You gor reward')
      .content('For your action you have being reward by: '+value + ' points')
      .ariaLabel('Lucky day')
      .ok('Thanks!')
    vm.mdDialog.show(confirm).then(function() {
      vm.updateUser(value);
    }, function() {
      //$scope.alert = 'You decided to keep your debt.';
    });
}

  updateUser(value){
  this.currentUser.points +=value;
  SERVICE.get(this).updateClallUserPoints(this.currentUser).then(
    function success(result){
      sessionStorage.user = JSON.stringify(result[0].attributes);
    }
  )
  }



}


export default SystemController;
