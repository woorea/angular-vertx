package com.woorea.robochat.model;

import com.fasterxml.jackson.databind.util.JSONPObject;
import io.vertx.core.json.JsonObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lempere on 11/4/2015.
 */
public class Message {

    public String message;
    public int fav_count;
    public String creator;
    public List<String> users;
    public long time;

    public Message(String message) {
        this.message = message;
        fav_count = 0;
        users = new ArrayList<>();
    }

    public Message(JsonObject input) {
        this.message = input.getString("text");
        this.creator = input.getString("member");
        fav_count = 0;
        time = input.getLong("ts");
        users = new ArrayList<>();
    }

    public boolean addFav(final String user_ask){
        for(String user : users ){
            if( user.equals(user_ask) ){
                return false;
            }
        }
        users.add(user_ask);
        fav_count++;
        return true;
    }
    public boolean deleteFav(final String user_ask){
        for(String user : users ){
            if( user.equals(user_ask) ){
                users.remove(user);
                fav_count--;
                if(fav_count<0) fav_count=0;
                return true;
            }
        }
        return false;

    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getFav_count() {
        return fav_count;
    }

    public void setFav_count(int fav_count) {
        this.fav_count = fav_count;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public String toFavString() {
        return "{\"text\":\""+getMessage()+"\",\"type\":\"fav\",\"fav_count\":"+getFav_count()+
                " ,\"member\":\""+getCreator()+"\",\"ts\":"+getTime()+"}";
    }
}
