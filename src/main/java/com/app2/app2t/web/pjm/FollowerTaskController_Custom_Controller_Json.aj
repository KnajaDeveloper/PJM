package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.util.ApplicationConstant;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.web.pjm.FollowerTaskController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import flexjson.JSONSerializer;
import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

privileged aspect FollowerTaskController_Custom_Controller_Json {

    @RequestMapping(value = "/findFollowerTaskByTaskId", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> FollowerTaskController.findFollowerTaskByTaskId(
            @RequestParam(value = "id", required = false) Long taskId
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<FollowerTask> followerTasks = FollowerTask.findFollowerTaskByTaskId(taskId);
            String strEmpCode = "";

            if (followerTasks.size() > 0) {
                strEmpCode += followerTasks.get(0).getEmpCode();
                for (int i = 1; i < followerTasks.size(); i++) {
                    strEmpCode += ("==" + followerTasks.get(i).getEmpCode());
                }
            }

            List<Map> employees = emRestService.findEMNameByEMCodeArray(strEmpCode);
            Map mapEmployees = new HashMap();
            for (Map m : employees){
                mapEmployees.put(m.get("empCode"), m.get("empFirstName") + " " + m.get("empLastName"));
            }

            List<Map> result = new ArrayList<>();
            for (FollowerTask followerTask : followerTasks) {
                Map map = new HashMap();
                map.put("task", followerTask.getTask());
                map.put("empCodeFollower", followerTask.getEmpCode());
                map.put("nameFollower", mapEmployees.get(followerTask.getEmpCode()));

                result.add(map);
            }

            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findEmpCodeByTaskID", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> FollowerTaskController.findEmpCodeByTaskID(
            @RequestParam(value = "taskId", required = false) long taskId
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map<String,Object>> resultSearch = new ArrayList<>();
            List<FollowerTask> followerTaskes = FollowerTask.findEmpCodeByTaskID(taskId);
            for (FollowerTask followerTask: followerTaskes) {
                Map<String,Object> buffer = new HashMap<>();
                Map employee = emRestService.getEmployeeByEmpCode(followerTask.getEmpCode());
                buffer.put("empCode", followerTask.getEmpCode());
                buffer.put("empFirstName", employee.get("empFirstName"));
                buffer.put("empLastName", employee.get("empLastName"));
                buffer.put("empNickName", employee.get("empNickName"));
                buffer.put("empPositionName", employee.get("empPositionName"));
                resultSearch.add(buffer);
            }
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
