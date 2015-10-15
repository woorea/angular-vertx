package com.woorea.robochat;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.ServerWebSocket;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Hello world!
 *
 */
public class RoboChat {

  private static final Pattern SET_NAME = Pattern.compile("^\\/name (\\w+)$");

    private static final String DEFAULT_MESSAGE = new JsonObject()
        .put("username", "robochat")
        .put("ts", System.currentTimeMillis())
        .put("text", "I can't understand you")
        .toString();

    public static void main( String[] args ) {

      Set<String> sockets = new HashSet<>();

      Map<String, String> members = new HashMap<>();

      Vertx vertx = Vertx.vertx();

      HttpServer server = vertx.createHttpServer();

      Router router = Router.router(vertx);

      //onopen
      router.route("/realtime").handler(routingContext -> {

        ServerWebSocket ws = routingContext.request().upgrade();

        //onmessage
        ws.frameHandler(frame -> {

          JsonObject input = new JsonObject(frame.textData());

          switch(input.getString("type", "unknown")) {
            case "message":

              input.put("member", members.get(ws.textHandlerID()));
              input.put("ts", System.currentTimeMillis());

              Matcher matcher = SET_NAME.matcher(input.getString("text"));

              if(matcher.matches()) {

                members.put(ws.textHandlerID(), matcher.group(1));
                input.put("member", members.get(ws.textHandlerID()));
                input.put("text", "name changed!");

              }

              sockets.forEach(socket -> {
                vertx.eventBus().send(socket, input.toString());
              });

              break;
            default:
              ws.writeFinalTextFrame(DEFAULT_MESSAGE);
          }

        });

        //onclose
        ws.closeHandler(v -> {

          sockets.removeIf(it -> ws.textHandlerID().equals(it));
          members.remove(ws.textHandlerID());

        });

        sockets.add(ws.textHandlerID());
        members.put(ws.textHandlerID(), ws.textHandlerID());

      });

      server.requestHandler(router::accept).listen(8080);

    }

}
