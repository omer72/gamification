const SERVICE = new WeakMap();

class GamePanelController {
  constructor ($state,parseSrv,$interval,$mdDialog) {
    'ngInject';
    console.log("GamePanelController");
    this.state = $state;
    this.parseSrv = parseSrv;
    this.interval = $interval;
    SERVICE.set(this,parseSrv);
    this.currentUser  = JSON.parse(sessionStorage.user);
    this.checkReadyQuestion($interval);
    this.creentQuestion = undefined;
    this.mdDialog = $mdDialog;
    this.stop = undefined;

  }

  checkReadyQuestion($interval){
    var vm = this;
    console.log('checkReadyQuestion');

    var stop = $interval(function(){
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
    },5000);
    vm.stop = stop;
  }

  stopInterval() {
    if (angular.isDefined(this.stop)) {
      this.interval.cancel(this.stop);
      this.stop = undefined;
    }
  }

  reward(){
    this.mdDialog.show({
      controller: 'RewardController',
      controllerAs: 'rewardCtrl',
      templateUrl: 'app/reward/reward.tmpl.html',
      parent: angular.element(document.body),
    })
  }

}


export default GamePanelController;
