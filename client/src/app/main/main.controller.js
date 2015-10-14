import { RoboChat } from './robochat.service';

export class MainController {

  constructor () {

    'ngInject';

    this.robochat = new RoboChat();

  }

  post() {
    this.robochat.post({
      text : this.message
    })
    this.message = '';
  }

}
