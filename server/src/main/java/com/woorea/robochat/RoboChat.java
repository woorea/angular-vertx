package com.woorea.robochat;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServerResponse;

/**
 * Hello world!
 *
 */
public class RoboChat
{
    public static void main( String[] args ) {

      Vertx vertx = Vertx.vertx();

      vertx.setTimer(1000, tid -> {
        System.out.println("async");
      });

      vertx.setPeriodic(2000, pid -> {
        System.out.println("periodic");
      });

      vertx.createHttpServer().requestHandler(req -> {

        HttpServerResponse response = req.response();
        response.end("Hello World");

      }).listen(9999, "localhost", ready -> {

        vertx.createHttpClient().get(9999, "localhost", "/").handler(res -> {
          res.bodyHandler(buffer -> {
            System.out.println(buffer.toString());
          });
        }).end();

      });
      
      System.out.println("end");

    }

}
