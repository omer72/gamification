class LoginController {
  constructor ($state,parseSrv) {
    'ngInject';

    this.state = $state;
    this.userName = '';
    this.password = '';
    this.parseSrv = parseSrv;

  }

  navigateToNextPage(){
    this.state.go('home');
  }

  login() {
    console.log("login");
    var vm = this;
    this.parseSrv.login(this.userName,this.password).then(
      function success(res){
        vm.state.go('gamePanel');
      },
      function error(err){
        console.log("faild to login err ->");
        vm.parseSrv.addUser(vm.userName,vm.password).then(
          function success(res){
            vm.parseSrv.addClallUser(vm.userName,res.id);
            vm.state.go('home');
          },
          function error(err){
            console.log("err ->"+vm);
          }
        )
      }
    )
    //var user = new User();
    //user.save({username: this.userName,password : this.password}).then(function(object) {
    //  this.state.go("home");
    //});
  }

}


export default LoginController;
