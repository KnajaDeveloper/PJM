// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.domain.pjm.ProjectManager;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

privileged aspect ProjectController_Custom_Controller_Json {

    @RequestMapping(value = "/saveOrUpdateProject",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProjectController.saveOrUpdateProject(
        @RequestParam(value = "projectCode", required = false) String projectCode,
        @RequestParam(value = "projectName", required = false) String projectName,
        @RequestParam(value = "projectCost", required = false) Integer projectCost,
        @RequestParam(value = "dateStart", required = false) Date dateStart,
        @RequestParam(value = "dateEnd", required = false) Date dateEnd,
        @RequestParam(value = "arr_ProjectManager", required = false) String arr_ProjectManager
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String[] arrPJM = arr_ProjectManager.split("==");
            Project project = Project.saveOrUpdateProject(projectCode, projectName, projectCost, dateStart, dateEnd);
            ProjectManager.saveProjectManagerByProJect(project, arrPJM);
            return new ResponseEntity<String>(headers, HttpStatus.CREATED);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findProjectByProjectCode",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProjectController.findProjectByProjectCode(
        @RequestParam(value = "projectCode", required = false) String projectCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Project> result = Project.findProjectByProjectCode(projectCode);
            return  new ResponseEntity<String>(result.size() + "", headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findProjectSearchData",method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> ProjectController.findProjectSearchData(
            @RequestParam(value="StDateBegin",required=false)Date StDateBegin,
            @RequestParam(value="StDateEnd",required=false)Date StDateEnd,
            @RequestParam(value = "maxResult", required = false) Integer maxResult
            ,@RequestParam(value = "firstResult", required = false) Integer firstResult
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
//        System.out.println(searchCode + "+++"+searchName);
        try
        {

            List<Project> result = Project.findProjectSearchData( StDateBegin,StDateEnd );
//            List<Map<String,String>> list = new ArrayList<>();
//            for(int i=firstResult;i<maxResult + firstResult && i < result.size() ;i++){
//                Project ty = result.get(i);
//                Map<String,String> map = new HashMap<>();
//                map.put("teamCode",ty.getProjectCode());
//                map.put("teamName",ty.getProjectName());
//
//                list.add(map);
//
//            }
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/projectPaggingSize", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ProjectController.projectPaggingSize(
            @RequestParam(value="StDateBegin",required=false)Date StDateBegin,
            @RequestParam(value="StDateEnd",required=false)Date StDateEnd) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Project> result = Project.findProjectSearchData( StDateBegin,StDateEnd );
            Map data = new HashMap();
            data.put("size", result.size());
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(data), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
