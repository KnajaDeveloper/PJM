package com.app2.app2t.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.*;

import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

public abstract class AbstractAPP2Service {
    protected static Logger LOGGER = LoggerFactory.getLogger(AbstractAPP2Service.class);
    protected String APP2Server = "172.16.250.68:8099/rest";
    protected static Properties connectProperties = null;

    protected String webServicesString = "";
    protected String resultString = "";
    protected Integer RESPONSE_TIME = 3000;

    protected RestTemplate restTemplate = new RestTemplate();
    protected JsonParser parser = new JsonParser();
    JsonSerializer<Date> ser = new JsonSerializer<Date>() {
        @Override
        public JsonElement serialize(Date src, Type typeOfSrc,
                                     JsonSerializationContext context) {
            return src == null ? null : new JsonPrimitive(src.getTime());
        }
    };

    JsonDeserializer<Date> deser = new JsonDeserializer<Date>() {
        @Override
        public Date deserialize(JsonElement json, Type typeOfT,
                                JsonDeserializationContext context) throws JsonParseException {
            return json == null ? null : new Date(json.getAsLong());
        }
    };

    protected Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm").create();

    static {
        Resource resource = new ClassPathResource("/app2.server.properties");
        try{
            connectProperties = PropertiesLoaderUtils.loadProperties(resource);

        } catch (IOException e){
            LOGGER.error("Error : {}", e);
        }
    }

    public AbstractAPP2Service(){
        this.APP2Server  = connectProperties.getProperty("APP2Server");
    }

    public String getAPP2Server() {
        return APP2Server;
    }
    public void setAPP2Server(String APP2Server) {
        this.APP2Server = APP2Server;
    }
    public String getWebServicesString() {
        return webServicesString;
    }
    public void setWebServicesString(String webServicesString) {
        this.webServicesString = webServicesString;
    }
    public String getResultString() {
        LOGGER.debug("request :{}",getWebServicesString());
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers=setHeaderUserMapDetails(headers,getWebServicesString());
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        ResponseEntity<String> reponseEntity = restTemplate.exchange(getWebServicesString(), HttpMethod.GET, entity, String.class);
        //resultString = restTemplate.getForObject(getWebServicesString(), String.class);
        return reponseEntity.getBody();
    }

    public String getResultString(String webServicesString) {
        LOGGER.debug("request :{}",webServicesString);
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers=setHeaderUserMapDetails(headers,webServicesString);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        ResponseEntity<String> reponseEntity = restTemplate.exchange(webServicesString, HttpMethod.GET, entity, String.class);
        //resultString = restTemplate.getForObject(webServicesString, String.class);
        return reponseEntity.getBody();
    }
    public HttpHeaders setHeaderUserMapDetails(HttpHeaders headers,String webServicesString){
        // if(!(webServicesString.contains("rest/security"))){
        //     List<String> listOuCode=new ArrayList<>();
        //     List<String> listUserName=new ArrayList<>();
        //     listOuCode.add(AuthorizeUtil.getOuCode());
        //     listUserName.add(AuthorizeUtil.getUserName());
        //     headers.put(ConstantKeyAuthorizeUtil.OU_CODE_KEY, listOuCode);
        //     headers.put(ConstantKeyAuthorizeUtil.USER_NAME_KEY, listUserName);
        // }
        return headers;
    }

    public String sentPostJsonString(String json) {
//        ((SimpleClientHttpRequestFactory)restTemplate.getRequestFactory()).setConnectTimeout(RESPONSE_TIME);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        HttpEntity<String> entity = new HttpEntity<String>(json, headers);
        LOGGER.debug("url : {}",getWebServicesString());
        ResponseEntity<String> reponseEntity = restTemplate.exchange(getWebServicesString(), HttpMethod.POST, entity, String.class);
        return reponseEntity.getBody();
    }


}
