package com.app2.app2t.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class SecurityRestService extends AbstractAPP2Service {

    private static Logger LOGGER = LoggerFactory.getLogger(SecurityRestService.class);

    public SecurityRestService() {
        this.APP2Server  = connectProperties.getProperty("EM-APP2Server");
    }

    public List<Map> getAppMenuBySecurityService(String appRoleCode) {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/security/findAppMenuByAppRoleCode?appRoleCode=" + appRoleCode);
            if (!getResultString().equals("[{}]")) {
                JsonArray jArray = parser.parse(getResultString()).getAsJsonArray();
                for (JsonElement obj : jArray) {
                    listMap.add(gson.fromJson(obj, Map.class));
                }
            }
            return listMap;
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            return listMap;
        }
    }





}
