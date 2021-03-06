/* global malarkey:false, toastr:false, moment:false */
import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import MainController from './main/main.controller';
import LoginController from './login/login.controller';
import GamePanelController from './gamePanel/gamePanel.controller';
import DialogController from './gamePanel/dialog.controller';
import RewardController from './reward/reward.controller';
import DashboardController from './dashboard/dashboard.controller';
import SystemController from './system/system.controller';
import GithubContributorService from '../app/components/githubContributor/githubContributor.service';
import WebDevTecService from '../app/components/webDevTec/webDevTec.service';
import ParseService from '../app/components/parse/parse.service';
import NavbarDirective from '../app/components/navbar/navbar.directive';
import MalarkeyDirective from '../app/components/malarkey/malarkey.directive';

angular.module('app', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial','ngMessages'])
  .constant('malarkey', malarkey)
  .constant('toastr', toastr)
  .constant('moment', moment)
  .config(config)

  .config(routerConfig)

  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('parseSrv', ParseService)
  .controller('MainController', MainController)
  .controller('LoginController', LoginController)
  .controller('DialogController', DialogController)
  .controller('RewardController', RewardController)
  .controller('GamePanelController', GamePanelController)
  .controller('DashboardController', DashboardController)
  .controller('SystemController', SystemController)
  .directive('acmeNavbar', () => new NavbarDirective())
  .directive('acmeMalarkey', () => new MalarkeyDirective(malarkey));


