package com.app2.app2t.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class EmRestService extends AbstractAPP2Service {

    private static Logger LOGGER = LoggerFactory.getLogger(EmRestService.class);

    public EmRestService() {
        this.APP2Server  = connectProperties.getProperty("EM-APP2Server");///test/test
    }

    public List<Map> getEmtestService() {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/test/test");
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

    public List<Map> getEmpNameByEmpCode(String Empcode) {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/employees/findEMNameByEMCode?empCode="+ Empcode);
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
