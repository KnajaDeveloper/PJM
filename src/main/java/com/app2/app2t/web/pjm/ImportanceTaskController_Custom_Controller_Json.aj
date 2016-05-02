package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.util.AuthorizeUtil;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import flexjson.JSONSerializer;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.lang.*;

privileged aspect ImportanceTaskController_Custom_Controller_Json {

    @RequestMapping(value = "/findAllTaskImportance",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ImportanceTaskController.findAllTaskImportance(
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ImportanceTask> resultSearch = ImportanceTask.findAllTaskImportance();
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findPaggingData",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ImportanceTaskController.findPaggingData(
        @RequestParam(value = "importanceCode", required = false) String importanceCode
        ,@RequestParam(value = "importanceName", required = false) String importanceName
        ,@RequestParam(value = "firstResult",required = false) Integer firstResult
        ,@RequestParam(value = "maxResult",required = false) Integer maxResult
    ){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try{
            List<Map<String,Object>> resultSearch = new ArrayList<>();
            List<ImportanceTask> importanceTasks = ImportanceTask.findImportanceDataPagingData(importanceCode, importanceName, firstResult, maxResult);
            for (ImportanceTask importanceTask: importanceTasks) {
                Map<String,Object> buffer = new HashMap<>();
                buffer.put("id", importanceTask.getId());
                buffer.put("importanceCode", importanceTask.getImportanceTaskCode());
                buffer.put("importanceName", importanceTask.getImportanceTaskName());
                buffer.put("inUse", Task.findImportanceByID(importanceTask.getId()));
                resultSearch.add(buffer);
            }
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findPaggingSize",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ImportanceTaskController.findPaggingSize(
        @RequestParam(value = "importanceCode", required = false) String importanceCode
        ,@RequestParam(value = "importanceName", required = false) String importanceName
    ){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try{
            Long size = ImportanceTask.findImportanceDataPagingSize(importanceCode, importanceName);
            Map dataSendToFront = new HashMap();
            dataSendToFront.put("size",size);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(dataSendToFront), headers, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findCheckimportanceCode",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ImportanceTaskController.findCheckimportanceCode(
        @RequestParam(value = "importanceCode", required = false) String importanceCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ImportanceTask> resultSearch = ImportanceTask.findCheckimportanceCode(importanceCode);
            return  new ResponseEntity<String>(resultSearch.size() + "", headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findeditImportance",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ImportanceTaskController.findeditImportance(
        @RequestParam(value = "importanceTaskCode", required = false) String importanceCode
        ,@RequestParam(value = "importanceTaskName", required = false) String importanceName
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ImportanceTask> resultSearch = ImportanceTask.findeditImportance(importanceCode, importanceName);
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findDeleteImportance",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ImportanceTaskController.findDeleteImportance(
        @RequestParam(value = "importanceID", required = false) Long importanceID
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            ImportanceTask.findDeleteImportance(importanceID);
            return  new ResponseEntity<String>(headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}