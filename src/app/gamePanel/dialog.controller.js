const SERVICE = new WeakMap();

class DialogController {
  constructor ($scope,$mdDialog,parseSrv) {
    this.mdDialog = $mdDialog;
    console.log('DialogController');
    this.currentQuestion = JSON.parse(sessionStorage.currentQuestion);
    SERVICE.set(this,parseSrv);
    this.getReadyQuestion(this.currentQuestion.questionId);
    this.question = {};
  }

  getReadyQuestion(id){
    var vm = this;
    console.log('getReadyQuestion');

      SERVICE.get(vm).getReadyQuestion(id).then(
        function success(results) {
          vm.question = results;
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

export default DialogController;
