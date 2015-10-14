export class RoboChat {

  constructor () {

    this.developers = [
      {
        name : 'luis',
        status : 'online'
      },
      {
        name : 'beatriz',
        status : 'out'
      },
      {
        name : 'iker',
        status : 'out'
      },
      {
        name : 'hugo',
        status : 'offline'
      }
    ]

    this.me = this.developers[0];

    this.messages = []

  }

  post(message) {
    message.member = this.me.name;
    message.ts = new Date().getTime();
    this.messages.push(message)
  }

}
