// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.web.pjm.PlanController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import flexjson.JSONSerializer;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

privileged aspect PlanController_Custom_Controller_Json {

    @RequestMapping(value = "/findPlanByMonth", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.findPlanByMonth(
            @RequestParam(value = "month", required = false) Integer month
            , @RequestParam(value = "year", required = false) Integer year
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String userName = AuthorizeUtil.getUserName();
            List<Plan> result = Plan.findPlansByMonthYear(month, year, userName);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findTaskByModuleAndTypeTask", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String>  PlanController.findTaskByModuleAndTypeTask(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            JSONArray jsonArray = new JSONArray(json);
            Long moduleId = Long.parseLong(jsonArray.get(0).toString());
            JSONArray jsonArrayTypeTask = jsonArray.getJSONArray(1);
            boolean getMyTask = Boolean.parseBoolean(jsonArray.get(2).toString());
            boolean getOtherTask = Boolean.parseBoolean(jsonArray.get(3).toString());

            List<Long> listModuleId = new ArrayList<>();
            if (moduleId == 0) {
                List<ModuleMember> moduleMembers = ModuleMember.findModuleMemberByUserName(AuthorizeUtil.getUserName());
                for (ModuleMember moduleMember : moduleMembers) {
                    listModuleId.add(moduleMember.getModuleProject().getId());
                }
            } else {
                listModuleId.add(moduleId);
            }

            List<Long> listTypeTaskId = new ArrayList<>();
            for (int i = 0; i < jsonArrayTypeTask.length(); i++) {
                listTypeTaskId.add(Long.parseLong(jsonArrayTypeTask.get(i).toString()));
            }

            List<Task> result = Task.findTaskByModuleAndTypeTask(listModuleId, listTypeTaskId, getMyTask, getOtherTask, AuthorizeUtil.getUserName());

            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findAllModule", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.findAllModule() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String userName = AuthorizeUtil.getUserName();
            List<ModuleMember> moduleMembers = ModuleMember.findModuleMemberByUserName(userName);

            List<ModuleProject> result = new ArrayList<>();

            for (ModuleMember moduleMember : moduleMembers) {
                result.add(ModuleProject.findModuleProject(moduleMember.getModuleProject().getId()));
            }

            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findAllTaskType", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.findAllTaskType() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<TypeTask> result = TypeTask.findAllTypeTasks();
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/insertplan", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String>  PlanController.insertPlan(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            JSONArray jsonArrayPlan = new JSONArray(json);
            Long taskId = Long.parseLong(jsonArrayPlan.get(0).toString());

            // Edit task -> update empCode = userName
            String userName = AuthorizeUtil.getUserName();
            Task task = Task.updateEmpCode(taskId, userName);

            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

            for (int i = 1; i < jsonArrayPlan.length(); i++) {
                JSONObject jsonPlan = jsonArrayPlan.getJSONObject(i);
                Date dateStart = new Date(Long.valueOf(jsonPlan.get("dateStart").toString()));
                Date dateEnd = new Date(Long.valueOf(jsonPlan.get("dateEnd").toString()));
                dateStart = formatter.parse(formatter.format(dateStart));
                dateEnd = formatter.parse(formatter.format(dateEnd));

                Plan.insertPlan(task, dateStart, dateEnd);
            }

            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(null), headers, HttpStatus.OK);

        } catch (Exception e) {
            LOGGER.debug("error " + e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/deletePlan", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.deletePlan(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            long planId = Long.parseLong(json.toString());
            Plan.deleteById(planId);
            return new ResponseEntity<String>(headers, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
