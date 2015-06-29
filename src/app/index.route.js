function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    //.state('home', {
    //  url: '/',
    //  templateUrl: 'app/main/main.html',
    //  controller: 'MainController',
    //  controllerAs: 'main'
    //})
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboardCtrl'
    })

    .state('gamePanel', {
      url: '/gamePanel',
      templateUrl: 'app/gamePanel/gamePanel.html',
      controller: 'GamePanelController',
      controllerAs: 'gamePanelCtrl'
    })
  ;

  $urlRouterProvider.otherwise('/login');
}

export default routerConfig;
