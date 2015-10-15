import { RoboChat } from './robochat.service';

export class MainController {

  constructor ($scope) {

    'ngInject';

    this.robochat = new RoboChat(() => {
      $scope.$applyAsync(() => {})
    });

  }

  post() {
    this.robochat.post({
      text : this.message
    })
    this.message = '';
  }

}
