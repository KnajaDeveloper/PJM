// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.Task;
import com.app2.app2t.domain.pjm.TypeTask;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

privileged aspect TypeTaskController_Custom_Controller_Json {

    @RequestMapping(value = "/findAllProject",method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> TypeTaskController.findAllProject(
            //value รับค่าจาก js เก็บ string ตรงกับใน function
            @RequestParam(value = "findTypeCode", required= false) String findtypecode,
            @RequestParam(value = "findTypeName", required= false) String findtypename) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        try {
            //ส่งค่า ไป Active
            List<TypeTask> result = TypeTask.findAllProject(findtypecode,findtypename);
            for(int i = 0 ; i < result.size() ; i++) {
                TypeTask ty = result.get(i);
                //LOGGER.info("Code : "+ty.getTypeTaskCode()+"\nName : "+ty.getTypeTaskName()+"\n==================");
            }
            //return กลับไป js
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //----------Check Data--------------------------------------------------------------------------


    @RequestMapping(value = "/checkAllProject",method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> TypeTaskController.checkAllProject(
            @RequestParam(value = "checkTypeCode", required= false) String checktypecode){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        try {
            List<TypeTask> result = TypeTask.checkAllProject(checktypecode);


            // return result.size() ไป js
            // +"" เปลี่ยน result.size() เป็น string
            return  new ResponseEntity<String>(result.size()+"", headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //------Edit Data------------------------------------------------------------------------------

    @RequestMapping(value = "/editAllProject",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TypeTaskController.editAllProject(
            @RequestParam(value = "editTypeCode", required = false) String edittypecode
            ,@RequestParam(value = "editTypeName", required = false) String edittypename
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<TypeTask> result = TypeTask.editAllProject(edittypecode, edittypename);
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //---------Delete Data---------------------------------------------------------------------------

    @RequestMapping(value = "/deleteAllProject",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TypeTaskController.deleteAllProject(
            @RequestParam(value = "typetaskID", required = false) Long typetaskID
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            TypeTask result = TypeTask.deleteAllProject(typetaskID);
            return  new ResponseEntity<String>(headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //------------------------------------------------------------------------------------

    @RequestMapping(value = "/testPaggingData", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TypeTaskController.testPaggingData(
            @RequestParam(value = "maxResult", required = false) Integer maxResult,
            @RequestParam(value = "firstResult", required = false) Integer firstResult,
            @RequestParam(value = "findTypeCode", required= false) String findtypecode,
            @RequestParam(value = "findTypeName", required= false) String findtypename)
     {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map<String,Object>> list = new ArrayList<>();
            List<TypeTask> result = TypeTask.findTypeTaskOfDataPagingData(maxResult,firstResult,findtypecode,findtypename);
            for(TypeTask results : result ){
                Map<String,Object> map = new HashMap<>();
                map.put("id", results.getId());
                map.put("typeTaskCode",results.getTypeTaskCode());
                map.put("typeTaskName",results.getTypeTaskName());
                map.put("inUse", Task.findAllTypeTaskByID(results.getId()));
                list.add(map);
            }
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(list), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/testPaggingSize", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TypeTaskController.testPaggingSize(
            @RequestParam(value = "findTypeCode", required= false) String findtypecode,
            @RequestParam(value = "findTypeName", required= false) String findtypename)
            {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Long result = TypeTask.findTypeTaskOfDataPagingSize(findtypecode,findtypename);
            Map data = new HashMap();
            data.put("size", result);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(data), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //------------------------------------------------------------------------------------

    @RequestMapping(value = "/findAllTypeTask",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TypeTaskController.findAllTypeTask() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<TypeTask> result = TypeTask.findAllTypeTask();
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //------------------------------------------------------------------------------------

    @RequestMapping(value = "/findTypeTaskByTypeTaskCode",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> TypeTaskController.findTypeTaskByTypeTaskCode(
            @RequestParam(value = "typeTaskCode", required = false) String typeTaskCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<TypeTask> result = TypeTask.findTypeTaskByTypeTaskCode(typeTaskCode);
            return  new ResponseEntity<String>(result.size() + "", headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
