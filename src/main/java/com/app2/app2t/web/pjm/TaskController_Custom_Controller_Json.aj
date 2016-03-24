// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.util.AuthorizeUtil;
import flexjson.JSONSerializer;

import org.json.JSONArray;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.*;

privileged aspect TaskController_Custom_Controller_Json {

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
            List<Task> resultSearch = Task.findTaskDataPagingData(id, firstResult, maxResult);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class")
                                                        .exclude("program")
                                                        .deepSerialize(resultSearch), headers, HttpStatus.OK);
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

    @RequestMapping(value = "/saveTask",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.saveTask(
            @RequestParam(value = "taskCode", required = false) String taskCode,
            @RequestParam(value = "taskName", required = false) String taskName,
            @RequestParam(value = "taskCost", required = false) Integer taskCost,
            @RequestParam(value = "typeTask", required = false) String typeTask,
            @RequestParam(value = "empCode", required = false) String empCode,
            @RequestParam(value = "dateStart", required = false) @DateTimeFormat (pattern = "dd/MM/yyyy") Date dateStart,
            @RequestParam(value = "dateEnd", required = false) @DateTimeFormat (pattern = "dd/MM/yyyy") Date dateEnd,
            @RequestParam(value = "fileName", required = false) String fileName,
            @RequestParam(value = "detail", required = false) String detail,
            @RequestParam(value = "progress", required = false) Integer progress,
            @RequestParam(value = "id", required = false) long id
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<TypeTask> tt = TypeTask.findTypeTaskByTypeTaskCode(typeTask);
            List<Program> pg = Program.findProgramByID(id);
            Task task = Task.saveTask(taskCode, taskName, taskCost, tt.get(0), empCode,
                dateStart, dateEnd, fileName, detail, progress, pg.get(0));
            return new ResponseEntity<String>(headers, HttpStatus.CREATED);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findEditTask",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.findEditTask(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "taskCode", required = false) String taskCode,
            @RequestParam(value = "taskName", required = false) String taskName,
            @RequestParam(value = "taskCost", required = false) Integer taskCost,
            @RequestParam(value = "typeTask", required = false) String typeTask,
            @RequestParam(value = "empCode", required = false) String empCode,
            @RequestParam(value = "dateStart", required = false) @DateTimeFormat (pattern = "dd/MM/yyyy") Date dateStart,
            @RequestParam(value = "dateEnd", required = false) @DateTimeFormat (pattern = "dd/MM/yyyy") Date dateEnd,
            @RequestParam(value = "fileName", required = false) String fileName,
            @RequestParam(value = "detail", required = false) String detail,
            @RequestParam(value = "progress", required = false) Integer progress
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<TypeTask> tt = TypeTask.findTypeTaskByTypeTaskCode(typeTask);
            List<Task> result = Task.findEditTask(id, taskCode, taskName, taskCost, tt.get(0), empCode,
                dateStart, dateEnd, fileName, detail, progress);
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findDeleteTask",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.findDeleteTask(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "taskID", required = false) Long taskID
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Task> result = Task.findDeleteTask(id, taskID);
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
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
}
