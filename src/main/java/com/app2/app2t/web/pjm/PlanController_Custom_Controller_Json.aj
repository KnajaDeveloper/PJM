// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.web.pjm.PlanController;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

import com.sun.corba.se.spi.ior.ObjectKey;
import com.sun.org.apache.xpath.internal.operations.Bool;
import flexjson.JSONSerializer;
import org.apache.commons.lang3.time.DateUtils;
import org.joda.time.Days;
import org.joda.time.Duration;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import sun.rmi.runtime.Log;

privileged aspect PlanController_Custom_Controller_Json {

    protected static Logger LOGGER = LoggerFactory.getLogger(PlanController_Custom_Controller_Json.class);

    @RequestMapping(value = "/findPlanByMonth", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.findPlanByMonth(
            @RequestParam(value = "month", required = false) Integer month
            , @RequestParam(value = "year", required = false) Integer year
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            String empCode = employee.get("empCode").toString();
            LOGGER.debug("==========> userName : {} empCode : {} ", userName, empCode);

            String dateBegin = "01/01/1111";
            String dateEnd = "01/01/1111";
            DecimalFormat fm = new DecimalFormat("00");
            SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");

            if (month == 1) {
                dateBegin = "12/15/" + (year - 1);
                dateEnd = "02/15/" + year;
            } else if (month == 12) {
                dateBegin = "11/15/" + year;
                dateEnd = "01/15/" + (year + 1);
            } else {
                dateBegin = fm.format(month - 1) + "/25/" + year;
                dateEnd = fm.format(month + 1) + "/15/" + year;
            }

            LOGGER.debug("=====================> Date begin {}",new Date(dateBegin));
            LOGGER.debug("=====================> Date end {}",new Date(dateEnd));

            List<Plan> result = Plan.findPlansByMonthYear(new Date(dateBegin), new Date(dateEnd), empCode);
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
            Long moduleId = jsonArray.getLong(0);
            JSONArray jsonArrayTypeTask = jsonArray.getJSONArray(1);
            boolean getMyTask = jsonArray.getBoolean(2);
            boolean getOtherTask = jsonArray.getBoolean(3);

            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            String empCode = employee.get("empCode").toString();
            LOGGER.debug("==========> userName : {} empCode : {} ", userName, empCode);

            List<Long> listModuleId = new ArrayList<>();
            if (moduleId == 0) {  // all module
                List<ModuleMember> moduleMembers = ModuleMember.findModuleMemberByEmpCode(empCode);
                for (ModuleMember moduleMember : moduleMembers) {
                    listModuleId.add(moduleMember.getModuleProject().getId());
                }
            } else {    // some module
                listModuleId.add(moduleId);
            }

            List<Long> listTypeTaskId = new ArrayList<>();
            for (int i = 0; i < jsonArrayTypeTask.length(); i++) {
                listTypeTaskId.add(jsonArrayTypeTask.getLong(i));
            }
            LOGGER.debug("=================> List module id {}", listModuleId);

            List<Task> result = null;
            if (listModuleId.size() > 0) {
                result = Task.findTaskByModuleAndTypeTask(listModuleId, listTypeTaskId, getMyTask, getOtherTask, empCode);
            }

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
            Map employee = emRestService.getEmployeeByUserName(userName);
            String empCode = employee.get("empCode").toString();
            LOGGER.debug("==========> userName : {} empCode : {} ", userName, empCode);

            List<ModuleMember> moduleMembers = ModuleMember.findModuleMemberByEmpCode(empCode);
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

    @RequestMapping(value = "/insertPlan", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String>  PlanController.insertPlan(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            JSONArray jsonArrayPlan = new JSONArray(json);
            Long taskId = jsonArrayPlan.getLong(0);
            boolean shiftPlan = jsonArrayPlan.getBoolean(1);

            // Edit task -> update empCode for task
            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            String empCode = employee.get("empCode").toString();
            LOGGER.debug("==========> userName : {} empCode : {} ", userName, empCode);

            Task task = Task.updateEmpCode(taskId, empCode);

            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            for (int i = 2; i < jsonArrayPlan.length(); i++) {
                JSONObject jsonPlan = jsonArrayPlan.getJSONObject(i);
                Date dateStart = new Date(jsonPlan.getLong("dateStart"));
                Date dateEnd = new Date(jsonPlan.getLong("dateEnd"));
                dateStart = formatter.parse(formatter.format(dateStart));
                dateEnd = formatter.parse(formatter.format(dateEnd));

                if (shiftPlan) {                                                        // ถ้าต้องเลื่อนแผนงาน
                    List<Plan> plansOverlap = Plan.findPlanOverlap(dateStart, dateEnd, null, empCode);
                    if(plansOverlap.size() > 0) {
                        List<Plan> plans = Plan.findPlanEndAfter(dateStart, null, empCode);            // หาแผนงานที่วันสิ้นสุด ชนกับ วันเริ่มของแผนงานใหม่
                        long diffInMillies = dateEnd.getTime() - plans.get(0).getDateStart().getTime();
                        int shiftDate = (int) TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS) + 1;

                        for (int j = 0; j < plans.size(); j++) {
                            Plan plan = plans.get(j);
                            plan.setDateStart(DateUtils.addDays(plan.getDateStart(), shiftDate));
                            plan.setDateEnd(DateUtils.addDays(plan.getDateEnd(), shiftDate));
                            plan.merge();
                        }
                    }
                }

                Plan.insertPlan(task, dateStart, dateEnd);
            }

            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(null), headers, HttpStatus.OK);

        } catch (Exception e) {
            LOGGER.debug("error " + e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/insertOtherPlan", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String>  PlanController.insertOtherPlan(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            JSONObject jsonPlan = new JSONObject(json);
            String taskName = jsonPlan.getString("taskName");
            int taskCost = jsonPlan.getInt("taskCost");
            Date dateStart = new Date(jsonPlan.getLong("dateStart"));
            Date dateEnd = new Date(jsonPlan.getLong("dateEnd"));

            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            dateStart = formatter.parse(formatter.format(dateStart));
            dateEnd = formatter.parse(formatter.format(dateEnd));

            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            String empCode = employee.get("empCode").toString();
            LOGGER.debug("==========> userName : {} empCode : {} ", userName, empCode);

            OtherTask otherTask = OtherTask.insertOtherTask(taskName, taskCost, empCode);
            Plan.insertOtherPlan(otherTask, dateStart, dateEnd);

            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(null), headers, HttpStatus.OK);

        } catch (Exception e) {
            LOGGER.debug("error " + e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/cancelTask", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.cancelTask(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            long taskId = Long.parseLong(json.toString());
            Task.updateEmpCode(taskId, null);
            return new ResponseEntity<String>(headers, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/updatePlan", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String>  PlanController.updatePlan(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            JSONArray jsonArrayPlan = new JSONArray(json);
            Long planId = jsonArrayPlan.getLong(0);
            boolean shiftPlan = jsonArrayPlan.getBoolean(1);
            int progress = jsonArrayPlan.getInt(2);

            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            String empCode = employee.get("empCode").toString();
            LOGGER.debug("==========> userName : {} empCode : {} ", userName, empCode);

            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            Task task = null;
            OtherTask otherTask = null;
            for (int i = 3; i < jsonArrayPlan.length(); i++) {
                JSONObject jsonPlan = jsonArrayPlan.getJSONObject(i);
                Date dateStart = new Date(jsonPlan.getLong("dateStart"));
                Date dateEnd = new Date(jsonPlan.getLong("dateEnd"));
                dateStart = formatter.parse(formatter.format(dateStart));
                dateEnd = formatter.parse(formatter.format(dateEnd));

                if (shiftPlan) {                                                    // ถ้าต้องเลื่อนแผนงาน
                    List<Plan> plansOverlap = Plan.findPlanOverlap(dateStart, dateEnd, planId, empCode);
                    if(plansOverlap.size() > 0) {
                        List<Plan> plans = Plan.findPlanEndAfter(dateStart, planId, empCode);            // หาแผนงานที่วันสิ้นสุด ชนกับ วันเริ่มของแผนงานใหม่
                        long diffInMillies = dateEnd.getTime() - plans.get(0).getDateStart().getTime();
                        int shiftDate = (int) TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS) + 1;
                        for (int j = 0; j < plans.size(); j++) {
                            Plan plan = plans.get(j);
                            plan.setDateStart(DateUtils.addDays(plan.getDateStart(), shiftDate));
                            plan.setDateEnd(DateUtils.addDays(plan.getDateEnd(), shiftDate));
                            plan.merge();
                        }
                    }
                }

                if (i == 3) {               // update
                    Plan tmpPlan = Plan.updatePlan(planId, dateStart, dateEnd);
                    task = tmpPlan.getTask();
                    otherTask = tmpPlan.getOtherTask();

                    if (task != null) {
                        task.setProgress(progress);
                        task.merge();
                    }
                    if (otherTask != null) {
                        otherTask.setProgress(progress);
                        otherTask.merge();
                    }
                } else {                    // insert more plan
                    if (task != null)
                        Plan.insertPlan(task, dateStart, dateEnd);
                    if (otherTask != null)
                        Plan.insertOtherPlan(otherTask, dateStart, dateEnd);
                }
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

    @RequestMapping(value = "/findDataByYearAndProjectAndModuleProjectAndTeam", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.findDataByYearAndProjectAndModuleProjectAndTeam(
            @RequestParam(value = "statProject", required = false) String statProject ,
            @RequestParam(value = "endProject", required = false) String endProject ,
            @RequestParam(value = "projectId", required = false) String projectId ,
            @RequestParam(value = "moduleProjectId", required = false) String moduleProjectId ,
            @RequestParam(value = "teamId", required = false) String teamId
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Map<String,Object> maps = new HashMap<>();
            List<Map<String,Object>> listPlan = new ArrayList<>();
            List<ModuleMember> listMember = Plan.findEmpCodeInModuleMemberByYearAndProjectAndModuleProjectAndTeam(statProject,endProject,projectId,moduleProjectId,teamId);
            List<ModuleManager> listManager = Plan.findEmpCodeInModuleManagerByYearAndProjectAndModuleProjectAndTeam(statProject,endProject,projectId,moduleProjectId,teamId);
            List<ProjectManager> listProjectManager = Plan.findEmpCodeInProjectManagerByYearAndProjectAndTeam(statProject,endProject,projectId,teamId);
            List<String> listEmpCode = new ArrayList<>();
            for(int i = 0 ; i < listMember.size() ; i++){
                if(listEmpCode.indexOf(listMember.get(i).getEmpCode())==-1) listEmpCode.add(listMember.get(i).getEmpCode());
            }
            for(int i = 0 ; i < listManager.size() ; i++){
                if(listEmpCode.indexOf(listManager.get(i).getEmpCode())==-1) listEmpCode.add(listManager.get(i).getEmpCode());
            }
            for(int i = 0 ; i < listProjectManager.size() ; i++){
                if(listEmpCode.indexOf(listProjectManager.get(i).getEmpCode())==-1) listEmpCode.add(listProjectManager.get(i).getEmpCode());
            }
            maps.put("Name",listEmpCode);
            for(int i = 0 ; i < listEmpCode.size() ; i++){
                Map<String,Object> plan = Plan.findPlansByEmpCode(listEmpCode.get(i),statProject);
                listPlan.add(plan);
            }
            maps.put("Plan",listPlan);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(maps),headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
