package com.app2.app2t.web.pjm;

import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.app2.app2t.domain.pjm.Program;

import org.springframework.web.bind.annotation.*;

import java.util.*;

privileged aspect ProgramController_Custom_Controller_Json {

    @RequestMapping(value = "/findProjectByProgram",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.findProjectByProgram(
        @RequestParam(value = "programCode", required = false) String programCode
        ,@RequestParam(value = "programName", required = false) String programName
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Program> result = Program.findProjectByProgram(programCode, programName);
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findPaggingData", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ProgramController.findPaggingData(
        @RequestParam(value = "programCode", required = false) String programCode
        ,@RequestParam(value = "programName", required = false) String programName
        ,@RequestParam(value = "maxResult", required = false) Integer maxResult
        ,@RequestParam(value = "firstResult", required = false) Integer firstResult
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Program> result = Program.findProjectByProgram(programCode, programName);
            List<Map<String,String>> list = new ArrayList<>();
            for(int i=firstResult;i<maxResult + firstResult && i < result.size();i++){
                Program ty = result.get(i);
                Map<String,String> map = new HashMap<>();
                map.put("code", ty.getProgramCode());
                map.put("name", ty.getProgramName());
                list.add(map);
            }
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(list), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findPaggingSize", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ProgramController.findPaggingSize(
        @RequestParam(value = "programCode", required = false) String programCode
        ,@RequestParam(value = "programName", required = false) String programName
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Program> result = Program.findProjectByProgram(programCode, programName);
            Map data = new HashMap();
            data.put("size", result.size());
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(data), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
