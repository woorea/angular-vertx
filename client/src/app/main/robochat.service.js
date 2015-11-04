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
      if(json.type === "fav"){
          this.messages.forEach(function(msg){
              if( msg.ts == json.ts  ){
                  msg.fav_count = json.fav_count;
                 
              }
          });
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
    message.fav_count=0;
    //message.fav=false;
    this.ws.send(JSON.stringify(message));
  }
  postFav(message){
    message.type = "fav";
 
    //this.ws.send(JSON.stringify({ text: message.text, fav_count: message.fav_count, member: message.member }));
       this.ws.send(JSON.stringify(message));
  }
 postRmFav(message){
    message.type = "del_fav";   
    //this.ws.send(JSON.stringify({ text: message.text, fav_count: message.fav_count, member: message.member }));
    this.ws.send(JSON.stringify(message));
  }
}
