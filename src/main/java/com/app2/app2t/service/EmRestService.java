package com.app2.app2t.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmRestService extends AbstractHRMSService {

    private static Logger LOGGER = LoggerFactory.getLogger(EmRestService.class);

    public EmRestService() {
        this.HRMSServer  = connectProperties.getProperty("EM-HRMSServer");///test/test
    }

    public List<Map> getDepartmentById(String id) {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.HRMSServer + "/test/test");
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
