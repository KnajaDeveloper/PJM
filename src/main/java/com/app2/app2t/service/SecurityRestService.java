package com.app2.app2t.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.app2.app2t.util.AuthorizeUtil;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class SecurityRestService extends AbstractAPP2Service {
    @Autowired
    AuthorizeUtil authorizeUtil;
    private static Logger LOGGER = LoggerFactory.getLogger(SecurityRestService.class);

    public SecurityRestService() {
        this.APP2Server  = connectProperties.getProperty("EM-APP2Server");
    }

    public List<Map> getAppMenuBySecurityService(String appRoleCode) {
        List<Map> listMenu = new ArrayList<>();
        try {
            listMenu = authorizeUtil.getMenuList();
            if(listMenu.size() == 0){
                LOGGER.debug("========================> Shooting");
                setWebServicesString("http://" + this.APP2Server + "/security/findAppMenuByAppRoleCode?appRoleCode=" + appRoleCode);
                if (!getResultString().equals("[{}]")) {
                    JsonArray jArray = parser.parse(getResultString()).getAsJsonArray();
                    for (JsonElement obj : jArray) {
                        listMenu.add(gson.fromJson(obj, Map.class));
                    }
                }
            }
            return listMenu;
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            return listMenu;
        }
    }

}
