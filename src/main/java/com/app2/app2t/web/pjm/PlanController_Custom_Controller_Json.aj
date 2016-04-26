// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.util.ConstantApplication;
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
import org.springframework.web.servlet.view.AbstractTemplateView;
import org.springframework.web.util.UriComponentsBuilder;
import sun.rmi.runtime.Log;

privileged aspect PlanController_Custom_Controller_Json {

    protected static Logger LOGGER = LoggerFactory.getLogger(PlanController_Custom_Controller_Json.class);

    @RequestMapping(value = "/getTotalPlanPoint", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.getTotalPlanPoint(
            @RequestParam(value = "month", required = false) Integer month
            , @RequestParam(value = "year", required = false) Integer year
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            String empCode = employee.get("empCode").toString();

            DecimalFormat fm = new DecimalFormat("00");
            String dateYearBegin = "01/01/" + year;
            String dateYearEnd = "12/31/" + year;
            String dateMonthBegin = fm.format(month) + "/01/" + year;

            int nextMonth = month + 1, tmpYear = year;
            if(nextMonth == 13){
                nextMonth = 12;
                tmpYear += 1;
            }

            String dateNextMonthBegin = fm.format(nextMonth) + "/01/" + tmpYear;

            Date dtYearBegin = new Date(dateYearBegin);
            Date dtYearEnd = new Date(dateYearEnd);
            Date dtMonthBegin = new Date(dateMonthBegin);
            Date dtNextMonthBegin = new Date(dateNextMonthBegin);
            Date dtMonthEnd = DateUtils.addDays(dtNextMonthBegin, -1);

            List<Task> monthPlanTaskComplete = Plan.getPointPlanTaskComplete(dtMonthBegin, dtMonthEnd, empCode);
            List<Task> yearPlanTaskComplete = Plan.getPointPlanTaskComplete(dtYearBegin, dtYearEnd, empCode);
            List<OtherTask> monthPlanOtherTaskComplete = Plan.getPointPlanOtherTaskComplete(dtMonthBegin, dtMonthEnd, empCode);
            List<OtherTask> yearPlanOtherTaskComplete = Plan.getPointPlanOtherTaskComplete(dtYearBegin, dtYearEnd, empCode);

            Map<String, Double> mapTotalPoint = new HashMap<>();
            mapTotalPoint.put("pointCompleteTaskMonth", 0.0);
            mapTotalPoint.put("pointCompleteTaskYear", 0.0);
            mapTotalPoint.put("pointCompleteOtherTaskMonth", 0.0);
            mapTotalPoint.put("pointCompleteOtherTaskYear", 0.0);

            for(Task task : monthPlanTaskComplete){
                double p = mapTotalPoint.get("pointCompleteTaskMonth") + task.getTaskCost();
                mapTotalPoint.put("pointCompleteTaskMonth", p);
            }
            for(Task task : yearPlanTaskComplete){
                double p = mapTotalPoint.get("pointCompleteTaskYear") + task.getTaskCost();
                mapTotalPoint.put("pointCompleteTaskYear", p);
            }
            for(OtherTask otherTask : monthPlanOtherTaskComplete){
                double p = mapTotalPoint.get("pointCompleteOtherTaskMonth") + otherTask.getTaskCost();
                mapTotalPoint.put("pointCompleteOtherTaskMonth", p);
            }
            for(OtherTask otherTask : yearPlanOtherTaskComplete){
                double p = mapTotalPoint.get("pointCompleteOtherTaskYear") + otherTask.getTaskCost();
                mapTotalPoint.put("pointCompleteOtherTaskYear", p);
            }

            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(mapTotalPoint), headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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

            Long projectId = jsonArray.getLong(0);
            Long moduleId = jsonArray.getLong(1);
            JSONArray jsonArrayTypeTask = jsonArray.getJSONArray(2);
            boolean getMyTask = jsonArray.getBoolean(3);
            boolean getOtherTask = jsonArray.getBoolean(4);

            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            String empCode = employee.get("empCode").toString();

            // Manage list of module -----------------------------------------------------------------------------------
            List<Long> listModuleId = new ArrayList<>();
            if (moduleId == 0) {                            // select all module
                List<ModuleProject> moduleProjects = ModuleProject.findUnFinishModuleByEmpCode(empCode);
                for (ModuleProject module : moduleProjects) {
                    listModuleId.add(module.getId());
                }
            } else {                                        // some module
                listModuleId.add(moduleId);
            }

            // Manage list of task type --------------------------------------------------------------------------------
            List<Long> listTypeTaskId = new ArrayList<>();
            for (int i = 0; i < jsonArrayTypeTask.length(); i++) {
                listTypeTaskId.add(jsonArrayTypeTask.getLong(i));
            }

            List<Task> result = new ArrayList<>();
            if (listModuleId.size() > 0) {
                result = Task.findTaskByModuleAndTypeTask(listModuleId, listTypeTaskId, getMyTask, getOtherTask, empCode);
            }

            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findModuleByProject", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.findModuleByProject(
            @RequestParam(value = "id", required = false) Long projectId
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            String empCode = employee.get("empCode").toString();

            List<ModuleProject> moduleProjects = ModuleProject.findModuleByProjectAndEmpCode(projectId, empCode);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(moduleProjects), headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findAllProject", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.findAllProject() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            String empCode = employee.get("empCode").toString();

            List<Project> projects = Project.findProjectByEmpCode(empCode);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(projects), headers, HttpStatus.OK);
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
            Double taskCost = jsonPlan.getDouble("taskCost");
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
                        if(progress == 100) {
                            task.setTaskStatus(ConstantApplication.getTaskStatusReady());
                        }else if(progress < 100) {
                            task.setTaskStatus(ConstantApplication.getTaskStatusNew());
                        }
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
            Long planId = Long.parseLong(json.toString());
            OtherTask otherTask = Plan.deleteById(planId);
            if(otherTask != null) {
                List<Plan> planByOtherTask = Plan.findPlanByOtherTask(otherTask);
                if(planByOtherTask.size() == 0) {
                    OtherTask.deleteOtherTask(otherTask);
                }
            }

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
            List<Map> team = new ArrayList<>();
            if(!teamId.equals("")) team = emRestService.findAllEmployeeByTeamId(teamId);
            ArrayList<String> listEmpByTeam = new ArrayList<>() ;
            for(int i = 0  ; i < team.size() ; i++){
                listEmpByTeam.add(team.get(i).get("empCode").toString());
            }
            Map<String,Object> maps = new HashMap<>();
            List<Map<String,Object>> listPlan = new ArrayList<>();
            List<ModuleMember> listMember = Plan.findEmpCodeInModuleMemberByYearAndProjectAndModuleProjectAndTeam(statProject,endProject,projectId,moduleProjectId,listEmpByTeam);
            List<ModuleManager> listManager = Plan.findEmpCodeInModuleManagerByYearAndProjectAndModuleProjectAndTeam(statProject,endProject,projectId,moduleProjectId,listEmpByTeam);
            List<ProjectManager> listProjectManager = Plan.findEmpCodeInProjectManagerByYearAndProjectAndTeam(statProject,endProject,projectId,listEmpByTeam);
            List<String> listEmpCode = new ArrayList<>();
            for (int i = 0; i < listMember.size(); i++) {
                if (listEmpCode.indexOf(listMember.get(i).getEmpCode()) == -1) {
                    listEmpCode.add(listMember.get(i).getEmpCode());
                }
            }
            for (int i = 0; i < listManager.size(); i++) {
                if (listEmpCode.indexOf(listManager.get(i).getEmpCode()) == -1)
                    listEmpCode.add(listManager.get(i).getEmpCode());
            }
            for (int i = 0; i < listProjectManager.size(); i++) {
                if (listEmpCode.indexOf(listProjectManager.get(i).getEmpCode()) == -1)
                    listEmpCode.add(listProjectManager.get(i).getEmpCode());
            }
            maps.put("Name", listEmpCode);
            for (int i = 0; i < listEmpCode.size(); i++) {
                Map<String, Object> plan = Plan.findPlansByEmpCode(listEmpCode.get(i), statProject,endProject);
                listPlan.add(plan);
            }
            maps.put("Plan", listPlan);

//            else{
//                Map planTotal = Plan.findPlansByDateStartAndDateEnd(statProject,endProject);
//                List<Task> listTask = (List<Task>) planTotal.get("Task");
//                for(Task task:listTask){
//                    if (listEmpCode.indexOf(task.getEmpCode()) == -1)
//                        listEmpCode.add(task.getEmpCode());
//                }
//                List<OtherTask> listOtherTask = (List<OtherTask>) planTotal.get("OtherTask");
//                for(OtherTask task:listOtherTask){
//                    if (listEmpCode.indexOf(task.getEmpCode()) == -1)
//                        listEmpCode.add(task.getEmpCode());
//                }
//                maps.put("Name", listEmpCode);
//                for (int i = 0; i < listEmpCode.size(); i++) {
//                    Map<String, Object> plan = Plan.findPlansByEmpCode(listEmpCode.get(i), statProject);
//                    listPlan.add(plan);
//                }
//                maps.put("Plan", listPlan);
//            }
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(maps),headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/selectPlanTofirstPage",method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.selectPlanTofirstPage(
            @RequestParam(value = "maxResult", required = false) Integer maxResult,
            @RequestParam(value = "firstResult", required = false) Integer firstResult
    )
            {
                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Type", "application/json;charset=UTF-8");

                try
                {
                    List<Map<String,Object>> resultSearch = new ArrayList<>();
                    String userName = AuthorizeUtil.getUserName();
                    Map employee = emRestService.getEmployeeByUserName(userName);
                    List<Plan> result = Plan.findtaskTodayPagingData(employee.get("empCode").toString(),maxResult,firstResult);
                    for(Plan plan : result) {
                        Map<String, Object> map = new HashMap<>();
                        map.put("stDate", plan.getDateStart());
                        map.put("enDate", plan.getDateEnd());
                        map.put("note", plan.getNote());
                        map.put("id", plan.getId());
                        if(plan.getTask() != null){
                            map.put("taskId", plan.getTask().getId());
                            map.put("taskCode", plan.getTask().getTaskCode());
                            map.put("taskName", plan.getTask().getTaskName());
                            map.put("taskProgress", plan.getTask().getProgress());
                        }
                        if(plan.getOtherTask() != null){
                            map.put("otherTaskId", plan.getOtherTask().getId());
                            map.put("otherTaskName", plan.getOtherTask().getTaskName());
                            map.put("otherTaskProgress", plan.getOtherTask().getProgress());
                        }

                        resultSearch.add(map);

                    }
                    return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
                } catch (Exception e) {
                    LOGGER.error(e.getMessage(), e);
                    return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

    @RequestMapping(value = "/planPaggingSize", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> PlanController.projectPaggingSize(
    )
            {
                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Type", "application/json;charset=UTF-8");
                try
                {
                    String userName = AuthorizeUtil.getUserName();
                    Map employee = emRestService.getEmployeeByUserName(userName);
                    Long result = Plan.findtaskTodayPagingSize(employee.get("empCode").toString());
                    Map dataSendToFront = new HashMap();
                    dataSendToFront.put("size",result);
                    return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(dataSendToFront), headers, HttpStatus.OK);
                } catch (Exception e) {
                    LOGGER.error("findEvaPeriodTime :{}", e);
                    return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

    @RequestMapping(value = "/selectPlanBaclLogTofirstPage",method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.selectPlanBaclLogTofirstPage(
            @RequestParam(value = "maxResult", required = false) Integer maxResult,
            @RequestParam(value = "firstResult", required = false) Integer firstResult
    )
            {
                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Type", "application/json;charset=UTF-8");

                try
                {
                    List<Map<String,Object>> resultSearch = new ArrayList<>();
                    String userName = AuthorizeUtil.getUserName();
                    Map employee = emRestService.getEmployeeByUserName(userName);
                    List<Plan> result = Plan.findtaskBackLogPagingData(employee.get("empCode").toString(),maxResult,firstResult);
                    for(Plan plan : result) {
                        Map<String, Object> map = new HashMap<>();
                        map.put("stDate", plan.getDateStart());
                        map.put("enDate", plan.getDateEnd());
                        map.put("note", plan.getNote());
                        map.put("id", plan.getId());
                        if(plan.getTask() != null){
                            map.put("taskId", plan.getTask().getId());
                            map.put("taskCode", plan.getTask().getTaskCode());
                            map.put("taskName", plan.getTask().getTaskName());
                            map.put("taskProgress", plan.getTask().getProgress());
                        }
                        if(plan.getOtherTask() != null){
                            map.put("otherTaskId", plan.getOtherTask().getId());
                            map.put("otherTaskName", plan.getOtherTask().getTaskName());
                            map.put("otherTaskProgress", plan.getOtherTask().getProgress());
                        }
                        resultSearch.add(map);

                    }
                    return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
                } catch (Exception e) {
                    LOGGER.error(e.getMessage(), e);
                    return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

    @RequestMapping(value = "/planPaggingSizeTaskBackLog", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> PlanController.planPaggingSizeTaskBackLog(
    )
            {
                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Type", "application/json;charset=UTF-8");
                try
                {
                    String userName = AuthorizeUtil.getUserName();
                    Map employee = emRestService.getEmployeeByUserName(userName);
                    Long result = Plan.findtaskBackLogPagingSize(employee.get("empCode").toString());
                    Map dataSendToFront = new HashMap();
                    dataSendToFront.put("size",result);
                    return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(dataSendToFront), headers, HttpStatus.OK);
                } catch (Exception e) {
                    LOGGER.error("findEvaPeriodTime :{}", e);
                    return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }


}

