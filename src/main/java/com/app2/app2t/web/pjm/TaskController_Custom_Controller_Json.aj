package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.util.ApplicationConstant;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.util.ConstantApplication;
import flexjson.JSONSerializer;

import org.json.JSONArray;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.apache.commons.io.IOUtils;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.net.*;
import java.io.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

privileged aspect TaskController_Custom_Controller_Json {

    protected static Logger LOGGER = LoggerFactory.getLogger(TaskController_Custom_Controller_Json.class);

    @RequestMapping(value = "/findProjectByTask", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.findProjectByTask(
            @RequestParam(value = "typeTask", required = false) long typeTask
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Task> result = Task.findProjectByTask(typeTask);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            /*Logger.error(e.getMessage(), e);*/
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findPaggingData", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TaskController.findPaggingData(
            @RequestParam(value = "id", required = false) Long id
            ,@RequestParam(value = "firstResult", required = false) Integer firstResult
            ,@RequestParam(value = "maxResult", required = false) Integer maxResult
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map<String,Object>> resultSearch = new ArrayList<>();
            List<Task> taskes = Task.findTaskDataPagingData(id, firstResult, maxResult);
            for (Task task: taskes) {
                Map<String,Object> buffer = new HashMap<>();
                buffer.put("id", task.getId());
                buffer.put("taskCode", task.getTaskCode());
                buffer.put("taskName", task.getTaskName());
                buffer.put("taskCost", task.getTaskCost());
                buffer.put("typeTaskCode", task.getTypeTask().getTypeTaskCode());
                buffer.put("typeTaskName", task.getTypeTask().getTypeTaskName());
                buffer.put("TaskImportanceCode", task.getImportanceTask().getImportanceTaskCode());
                buffer.put("TaskImportanceName", task.getImportanceTask().getImportanceTaskName());
                buffer.put("empCode", task.getEmpCode());
                buffer.put("dateStart", task.getDateStart());
                buffer.put("dateEnd", task.getDateEnd());
                buffer.put("progress", task.getProgress());
                buffer.put("fileName", task.getFileName());
                buffer.put("detail", task.getDetail());
                buffer.put("inUse", Plan.findPlanByID(task.getId()));
                buffer.put("version", task.getVersion());
                resultSearch.add(buffer);
            }
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findPaggingSize", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TaskController.findPaggingSize(
            @RequestParam(value = "id", required = false) Long id
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Long size = Task.findTaskDataPagingSize(id);
            Map dataSendToFront = new HashMap();
            dataSendToFront.put("size",size);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(dataSendToFront), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/saveTask/{taskCode}/{taskName}/{taskCost}/{typeTask}/{taskImportance}/{empCodeFollowerTask}/{empCode}/{dateStart}/{dateEnd}/{fileName}/{detail}/{progress}/{id}",
                    method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.saveTask(
            @PathVariable("taskCode") String taskCode,
            @PathVariable("taskName") String taskName,
            @PathVariable("taskCost") Double taskCost,
            @PathVariable("typeTask") String typeTask,
            @PathVariable("taskImportance") String taskImportance,
            @PathVariable("empCodeFollowerTask") String empCodeFollowerTask,
            @PathVariable("empCode") String empCode,
            @PathVariable("dateStart") String dateStart,
            @PathVariable("dateEnd") String dateEnd,
            @PathVariable("fileName") String fileName,
            @PathVariable("detail") String detail,
            @PathVariable("progress") Integer progress,
            @PathVariable("id") Long id,
            MultipartHttpServletRequest multipartHttpServletRequest
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            if(!fileName.equals("null")){
                Task.uploadFileAndInsertDataFile(id, taskCode, multipartHttpServletRequest);
            }

            List<TypeTask> typeTaskes = TypeTask.findTypeTaskByTypeTaskCode(typeTask);
            List<ImportanceTask> importanceTaskes = ImportanceTask.findTaskImportanceByImportanceTaskCode(taskImportance);
            List<Program> programes = Program.findProgramByID(id);
            Task task = Task.saveTask(taskCode, taskName, taskCost, typeTaskes.get(0), empCode,
                dateStart, dateEnd, fileName, detail.replaceAll("~", "/").replaceAll("`", "?"), progress, programes.get(0), importanceTaskes.get(0));

            JSONArray jsonArray = new JSONArray(empCodeFollowerTask);
            for(int i = 0; i < jsonArray.length(); i++){
                if(!jsonArray.getString(i).equals("null")){
                    FollowerTask.saveTaskFollower(task, jsonArray.getString(i));
                }
            }

            return new ResponseEntity<String>(headers, HttpStatus.CREATED);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findEditTask/{id}/{taskCode}/{taskName}/{taskCost}/{typeTask}/{taskImportance}/{empCodeFollowerTask}/{empCode}/{dateStart}/{dateEnd}/{fileName}/{detail}/{progress}/{programID}/{version}",
                    method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.findEditTask(
            @PathVariable("id") Long id,
            @PathVariable("taskCode") String taskCode,
            @PathVariable("taskName") String taskName,
            @PathVariable("taskCost") Double taskCost,
            @PathVariable("typeTask") String typeTask,
            @PathVariable("taskImportance") String taskImportance,
            @PathVariable("empCodeFollowerTask") String empCodeFollowerTask,
            @PathVariable("empCode") String empCode,
            @PathVariable("dateStart") String dateStart,
            @PathVariable("dateEnd") String dateEnd,
            @PathVariable("fileName") String fileName,
            @PathVariable("detail") String detail,
            @PathVariable("progress") Integer progress,
            @PathVariable("programID") Long programID,
            @PathVariable("version") Integer version,
            MultipartHttpServletRequest multipartHttpServletRequest
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Long val = Task.findCherckVersionByIdAndVersion(id, version);
            Boolean bl = false;

            if(val == 1) {
                bl = true;
                if(!fileName.equals("null")){
                    Task.uploadFileAndInsertDataFile(programID, taskCode, multipartHttpServletRequest);
                }

                List<TypeTask> typeTaskes = TypeTask.findTypeTaskByTypeTaskCode(typeTask);
                List<ImportanceTask> importanceTaskes = ImportanceTask.findTaskImportanceByImportanceTaskCode(taskImportance);
                Task task = Task.findEditTask(id, taskCode, taskName, taskCost, typeTaskes.get(0), importanceTaskes.get(0),
                        empCode, dateStart, dateEnd, fileName, detail.replaceAll("~", "/").replaceAll("`", "?"), progress);
                
                FollowerTask.findDeleteFollowerTask(id);

                JSONArray jsonArray = new JSONArray(empCodeFollowerTask);
                for(int i = 0; i < jsonArray.length(); i++){
                    if(!jsonArray.getString(i).equals("null")){
                        FollowerTask.saveTaskFollower(task, jsonArray.getString(i));
                    }
                }
            }

            return  new ResponseEntity<String>(bl + "", headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findDeleteTask",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.findDeleteTask(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "taskID", required = false) Long taskID,
            @RequestParam(value = "taskCode", required = false) String taskCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            FollowerTask.findDeleteFollowerTask(taskID);
            Task.findDeleteTask(id, taskID, taskCode);
            return  new ResponseEntity<String>(headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findSizeTaskByTaskCode",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.findSizeTaskByTaskCode(
            @RequestParam(value = "id", required = false) long id,
            @RequestParam(value = "taskCode", required = false) String taskCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Task> result = Task.findSizeTaskByTaskCode(id, taskCode);
            return  new ResponseEntity<String>(result.size() + "", headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findCheckProgramCode",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.findCheckProgramCode(
            @RequestParam(value = "program", required = false) String program
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Program> pg = Program.findProgramByProgramCode(program);
            List<Task> result = Task.findCheckProgramCode(pg.get(0));
            return  new ResponseEntity<String>(result.size() + "", headers, HttpStatus.OK);

        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findTaskCostforSum", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TaskController.findTaskCostforSum(
            @RequestParam(value = "id", required = false) Long id
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List resultSearch = Task.findTaskCostforSum(id);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findTaskProgestByProgram",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.findTaskProgestByProgram(
            @RequestParam(value = "program", required = false) String program
    ){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Program> mo = Program.findProgramByProgramCode(program);
            List<Task> result = Task.findTaskProgestByProgram(mo.get(0));
            //LOGGER.info(">>>>>>>>>>>>>>>>>>Modul"+project);           
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/findTaskProgressforAVG", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TaskController.findTaskProgressforAVG(
            @RequestParam(value = "id", required = false) Long id
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List resultSearch = Task.findTaskProgressforAVG(id);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findEmptyTask", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TaskController.findEmptyTask() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Map<String,Object> result = new HashMap<>();
            List<Task> tasks = Task.findEmptyTask();
            List<OtherTask> otherTasks = OtherTask.findEmptyOtherTask();
            result.put("Task",tasks);
            result.put("OtherTask",otherTasks);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/downloadFile/{programID}/{taskCode}/{fileName}", method = RequestMethod.GET)
    public ResponseEntity<String> TaskController.downloadFile(
            @PathVariable("programID") String programID,
            @PathVariable("taskCode") String taskCode,
            @PathVariable("fileName") String fileName,
            HttpServletResponse response
    ) throws ServletException, IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        InputStream in = null;
        try {
            String mimeType = new MimetypesFileTypeMap().getContentType(fileName);
            String fileName1 = URLEncoder.encode(fileName, "UTF-8");
            String fileName2 = URLDecoder.decode(fileName1, "ISO8859_1");
            response.setContentType(mimeType);
            response.addHeader("Content-Disposition", "attachment; filename=\""+fileName2+"\"");
            String pathFile = ApplicationConstant.PATH_PJM_FILE + programID + "/" + taskCode + "/";
            in = new FileInputStream(pathFile + fileName);
            IOUtils.copy(in, response.getOutputStream());
            return new ResponseEntity<String>(headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }finally{
            IOUtils.closeQuietly(in);
        }
    }

    @RequestMapping(value = "/selectTaskFollowTofirstPage",method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.selectTaskFollowTofirstPage(
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
                    List<FollowerTask> result = FollowerTask.selectTaskFollowTofirstPage(employee.get("empCode").toString(),maxResult,firstResult);
                    for(FollowerTask followerTask : result) {
                        Map<String, Object> map = new HashMap<>();

                        map.put("taskCode", followerTask.getTask().getTaskCode());
                        map.put("id", followerTask.getTask().getId());
                        map.put("taskName", followerTask.getTask().getTaskName());
                        map.put("managerEmpCode", followerTask.getTask().getEmpCode());
                        map.put("followEmpCode", followerTask.getEmpCode());
                        map.put("progress", followerTask.getTask().getProgress());
                        map.put("status", followerTask.getTask().getTaskStatus());
                        map.put("program", followerTask.getTask().getProgram().getProgramName());
                        map.put("module", followerTask.getTask().getProgram().getModuleProject().getModuleName());
                        map.put("project", followerTask.getTask().getProgram().getModuleProject().getProject().getProjectName());
                        map.put("version",followerTask.getTask().getVersion());
                        resultSearch.add(map);

                    }
                    return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
                } catch (Exception e) {
                    LOGGER.error(e.getMessage(), e);
                    return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

    @RequestMapping(value = "/taskPaggingSizeTaskFollow", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TaskController.taskPaggingSizeTaskFollow(
    )
            {
                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Type", "application/json;charset=UTF-8");
                try
                {
                    String userName = AuthorizeUtil.getUserName();
                    Map employee = emRestService.getEmployeeByUserName(userName);
                    Long result = FollowerTask.taskFollowPaggingSizeTask(employee.get("empCode").toString());
                    Map dataSendToFront = new HashMap();
                    dataSendToFront.put("size",result);
                    return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(dataSendToFront), headers, HttpStatus.OK);
                } catch (Exception e) {
                    LOGGER.error("findEvaPeriodTime :{}", e);
                    return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

//    @RequestMapping(value = "/editTaskStatus",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
//    public ResponseEntity<String> TaskController.editTaskStatus(
//            @RequestParam(value = "taskId", required = false) Long taskId
//            ,@RequestParam(value = "status", required = false) String status
//            ,@RequestParam(value = "version", required = false) Integer version
//    ) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/json;charset=UTF-8");
//        try {
//            Task.updateStatusTask(taskId, status,version);
//
//                return  new ResponseEntity<String>(headers, HttpStatus.OK);
//
//
//        } catch (Exception e) {
//            LOGGER.error(e.getMessage(), e);
//            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @RequestMapping(value = "/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus",method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.selectTaskFollower(
            @RequestParam(value = "maxResult", required = false) Integer maxResult,
            @RequestParam(value = "firstResult", required = false) Integer firstResult,
            @RequestParam(value = "option", required = false) String option,
            @RequestParam(value = "projectId", required = false) String projectId,
            @RequestParam(value = "moduleId", required = false) String moduleId,
            @RequestParam(value = "typeTaskId", required = false) String typeTaskId,
            @RequestParam(value = "statusTask", required = false) String statusTask,
            @RequestParam(value = "empCode", required = false) String empCode

    )
        {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json;charset=UTF-8");

            try{
                List<Map<String,Object>> resultSearch = new ArrayList<>();
                if(empCode.equals("")) {
                    List<Task> taskList = Task.findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus(
                            maxResult,firstResult,projectId,moduleId,typeTaskId,statusTask,option);
                    if(!option.toLowerCase().equals("size")) {
                        for(Task task : taskList) {
                            Map<String, Object> map = new HashMap<>();
                            map.put("taskCode", task.getTaskCode());
                            map.put("id", task.getId());
                            map.put("taskName", task.getTaskName());
                            map.put("progress", task.getProgress());
                            map.put("program", task.getProgram().getProgramName());
                            map.put("module", task.getProgram().getModuleProject().getModuleName());
                            List<ModuleManager> listMM = ModuleManager.findModuleManagerByModuleProject(ModuleProject.findModuleProject(task.getProgram().getModuleProject().getId()));
                            map.put("moduleManager" ,listMM);
                            map.put("project", task.getProgram().getModuleProject().getProject().getProjectName());
                            map.put("follower",task.getEmpCode());
                            map.put("taskStatus",task.getTaskStatus());
                            List<ProjectManager> listPM = ProjectManager.findManagerByProject(task.getProgram().getModuleProject().getProject());
                            map.put("projectManager",listPM);
                            map.put("version",task.getVersion());
                            resultSearch.add(map);
                        }
                        return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
                    }
                    else {
                        Map dataSendToFront = new HashMap();
                        dataSendToFront.put("size",taskList.size());
                        return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(dataSendToFront), headers, HttpStatus.OK);
                    }
                }
                else{
                    List<FollowerTask> taskList = FollowerTask.findFollowerTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus(
                            maxResult,firstResult,projectId,moduleId,typeTaskId,statusTask,option,empCode);
                    if(!option.toLowerCase().equals("size")) {
                        for(FollowerTask task : taskList) {
                            Map<String, Object> map = new HashMap<>();
                            map.put("taskCode", task.getTask().getTaskCode());
                            map.put("id", task.getTask().getId());
                            map.put("taskName", task.getTask().getTaskName());
                            map.put("progress", task.getTask().getProgress());
                            map.put("program", task.getTask().getProgram().getProgramName());
                            map.put("module", task.getTask().getProgram().getModuleProject().getModuleName());
                            List<ModuleManager> listMM = ModuleManager.findModuleManagerByModuleProject(ModuleProject.findModuleProject(task.getTask().getProgram().getModuleProject().getId()));
                            map.put("moduleManager" ,listMM);
                            map.put("project", task.getTask().getProgram().getModuleProject().getProject().getProjectName());
                            map.put("follower",task.getEmpCode());
                            map.put("taskStatus",task.getTask().getTaskStatus());
                            List<ProjectManager> listPM = ProjectManager.findManagerByProject(task.getTask().getProgram().getModuleProject().getProject());
                            map.put("projectManager",listPM);
                            map.put("version",task.getTask().getVersion());
                            resultSearch.add(map);
                        }
                        return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
                    }
                    else {
                        Map dataSendToFront = new HashMap();
                        dataSendToFront.put("size",taskList.size());
                        return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(dataSendToFront), headers, HttpStatus.OK);
                    }
                }
            } catch (Exception e) {
                LOGGER.error(e.getMessage(), e);
                return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    @RequestMapping(value = "/updateTaskStatusAndProgress",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.updateTaskStatusAndProgress(
            @RequestParam(value = "notePlan", required = false) String note,
            @RequestParam(value = "taskId", required = false) Long taskId,
            @RequestParam(value = "progress", required = false) Integer progress,
            @RequestParam(value = "taskType", required = false) Integer taskType,
            @RequestParam(value = "versionPlan", required = false) Integer versionPlan,
            @RequestParam(value = "versionTask", required = false) Integer versionTask
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            if(taskType == 1){
                boolean status = Task.updateTaskStatusAndProgress(taskId, progress,note,versionPlan,versionTask);
                if(status){
                    return new ResponseEntity<String>(headers, HttpStatus.OK);
                }
                else {
                    return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
                }
            }
            else
            {
                boolean status = OtherTask.updateOtherTaskProgress(taskId, progress,note,versionPlan,versionTask);
                if(status){
                    return new ResponseEntity<String>(headers, HttpStatus.OK);
                }
                else {
                    return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
                }
            }

        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/editTaskStatusCheckWhoCanEdit",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.editTaskStatusCheckWhoCanEdit(
            @RequestParam(value = "taskId", required = false) Long taskId
            ,@RequestParam(value = "status", required = false) String status
            ,@RequestParam(value = "version", required = false) Integer version
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {

            ArrayList<String> empCodeCanEdit = new ArrayList<>();
            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            Task task = Task.findTask(taskId);
            List<ModuleManager> listMM = ModuleManager.findModuleManagerByModuleProject(ModuleProject.findModuleProject(task.getProgram().getModuleProject().getId()));
            List<ProjectManager> listPM = ProjectManager.findManagerByProject(task.getProgram().getModuleProject().getProject());
            for (ModuleManager mm : listMM) {
                empCodeCanEdit.add(mm.getEmpCode());
            }
            for (ProjectManager mm : listPM) {
                empCodeCanEdit.add(mm.getEmpCode());
            }
            empCodeCanEdit.add(task.getEmpCode());
            LOGGER.debug("------"+empCodeCanEdit);
            LOGGER.debug("------"+empCodeCanEdit.indexOf(employee.get("empCode").toString()));
            if (empCodeCanEdit.contains(employee.get("empCode").toString())) {

                if (task.getVersion().equals(version)) {
                    if (task.getTaskStatus().equals(ConstantApplication.getTaskStatusReady())) {
                         Task.updateStatusTask(taskId, status, version);
                        return new ResponseEntity<String>(headers, HttpStatus.OK);
                    }
                    else if(task.getTaskStatus().equals(ConstantApplication.getTaskStatusComplete())) {
                        Task.updateStatusTask(taskId, status, version);
                        return new ResponseEntity<String>(headers, HttpStatus.OK);
                    }
                    else
                    {
                    LOGGER.debug("---1---");
                        return new ResponseEntity<String>(headers, HttpStatus.INTERNAL_SERVER_ERROR);
                        

                    }
                }
                else {
                    return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
                }
            } else {
                LOGGER.debug("---2---");
                return new ResponseEntity<String>(headers, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
