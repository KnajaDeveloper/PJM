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
                String json = getResultString();
                JSONArray jsonArray = new JSONArray(json);
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject obj = jsonArray.getJSONObject(i);
                    Map map = new HashMap();
                    map.put("id", Integer.parseInt(obj.get("id").toString()));
                    map.put("sequent", Integer.parseInt(obj.get("sequent").toString()));
                    map.put("link", obj.get("link"));
                    map.put("parent", obj.get("parent"));
                    map.put("menuLevel", obj.get("menuLevel"));
                    map.put("controller", obj.get("controller"));
                    map.put("menu_t_name", obj.get("menu_t_name"));
                    map.put("menu_e_name", obj.get("menu_e_name"));
                    listMap.add(map);
                }
            }

            return listMap;
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            return listMap;
        }
    }





}
