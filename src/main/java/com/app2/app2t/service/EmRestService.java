package com.app2.app2t.service;

import com.app2.app2t.util.AuthorizeUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class EmRestService extends AbstractAPP2Service {
    @Autowired
    AuthorizeUtil authorizeUtil;
    private static Logger LOGGER = LoggerFactory.getLogger(EmRestService.class);

    public EmRestService() {
        this.APP2Server = connectProperties.getProperty("EM-APP2Server");///test/test
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

    //----------GetEmpNameByEmpCode------------------------------------------------------------------------

    public List<Map> getEmpNameByEmpCode(String Empcode) {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/employees/findEMNameByEMCode?empCode=" + Empcode);
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

    //----------GetEmpNameByUsername------------------------------------------------------------------------

    public List<Map> getEmpNameByUserName(String userName) {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/employees/findEMNameByUserName?userName=" + userName);
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

    public List<Map> getAppRoleByUserName(String userName) {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/employees/findAppRoleByUserName?userName=" + userName);
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

    public Map getEmployeeByUserName(String userName) {
        List<Map> listMap = new ArrayList<>();
        try {
            Map empData = authorizeUtil.getEmpData();
            if (empData.isEmpty()) {
                setWebServicesString("http://" + this.APP2Server + "/employees/findEmployeeByUserName?userName=" + userName);
                if (!getResultString().equals("[{}]")) {
                    JsonArray jArray = parser.parse(getResultString()).getAsJsonArray();
                    for (JsonElement obj : jArray) {
                        listMap.add(gson.fromJson(obj, Map.class));
                    }
                }
                if (listMap.size() > 0) {
                    authorizeUtil.setEmpDate(listMap);
                }
            } else {
                listMap.add(empData);
            }
            return listMap.get(0);
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            return null;
        }
    }

    public List<Map> findEmployeeByTextLov(String text) {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/employees/findEmployeeByTextLov?text=" + text);
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


    public List<Map> findEMNameByEMCodeArray(String empCode) {
        String requestString = "http://" + this.APP2Server + "/employees/findEMNameByEMCodeArray?empCode=" + empCode;
        setWebServicesString(requestString);
        List<Map> listMap = new ArrayList<>();
        if (!getResultString().equals("[{}]")) {
            JsonArray jArray = parser.parse(getResultString()).getAsJsonArray();
            for (JsonElement obj : jArray) {
                listMap.add(gson.fromJson(obj, Map.class));
            }
        }
        return listMap;
    }

    //----------findTeamAll------------------------------------------------------------------------

    public List<Map> findTeamAll() {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/employees/findTeamAll");
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

    //----------GetEmpByTeamID------------------------------------------------------------------------

    public List<Map> GetEmpByTeamID(String teamID) {
        List<Map> listMap = new ArrayList<>();
        try {

            setWebServicesString("http://" + this.APP2Server + "/employees/GetEmpByTeamID?teamID=" + teamID);
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

    public Map getEmployeeByEmpCode(String empCode) {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/employees/findEmployeeByEmpCode?empCode="+ empCode);
            if (!getResultString().equals("[{}]")) {
                JsonArray jArray = parser.parse(getResultString()).getAsJsonArray();
                for (JsonElement obj : jArray) {
                    listMap.add(gson.fromJson(obj, Map.class));
                }
            }
            return listMap.get(0);
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            return null;
        }
    }

    public List<Map> findAllEmployeeByEmpCodeArray() {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/employees/findAllEmployeeByEmpCode");
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

    public List<Map> findAllEmployeeByTeamId(String teamID) {
        List<Map> listMap = new ArrayList<>();
        try {

            setWebServicesString("http://" + this.APP2Server + "/employees/findAllEmployeeByTeamId?teamId=" + teamID);
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

    public List<Map> findProjectByTextLov(String text) {
        List<Map> listMap = new ArrayList<>();
        try {
            setWebServicesString("http://" + this.APP2Server + "/pjm/findProjectByTextLov?text=" + text);
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


