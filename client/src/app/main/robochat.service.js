export class RoboChat {

  constructor (listener) {

    let ws = new WebSocket("ws://localhost:8080/realtime")

    ws.onopen = (event) => {
      console.log(event);
    }

    ws.onclose = (event) => {
      console.log(event);
    }

    ws.onmessage = (event) => {
      console.log(event);
      let json = JSON.parse(event.data);
      if(json.type === 'message') {
          this.messages.push(json)
      }
      listener();
    }

    ws.onerror = (event) => {
      console.log(event);
    }

    this.ws = ws;

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
    message.type = "message";
    this.ws.send(JSON.stringify(message));
  }

}
