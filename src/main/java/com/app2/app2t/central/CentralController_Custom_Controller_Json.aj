package com.app2.app2t.central;

import com.app2.app2t.domain.pjm.*;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

public aspect CentralController_Custom_Controller_Json {
    @RequestMapping(value = "/findEmployeeByText", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> CentralController.findEmployeeByText(
            @RequestParam(value = "text", required = false) String text
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map> employee = emRestService.findEmployeeByTextLov(text);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(employee), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @RequestMapping(value = "/findEmployeeByEmpCodeArray", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> CentralController.findEmployeeByEmpCodeArray(
            @RequestParam(value = "empCode", required = false) String empCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map> employee = emRestService.findEMNameByEMCodeArray(empCode);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(employee), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findTeamAll", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> CentralController.findTeamAll() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map> employee = emRestService.findTeamAll();
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(employee), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/GetEmpByTeamID", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> CentralController.GetEmpByTeamID(
            @RequestParam(value = "teamID", required = false) String teamID
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map> employee = emRestService.GetEmpByTeamID(teamID);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(employee), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findAllEmployeeByEmpCodeArray", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> CentralController.findAllEmployeeByEmpCodeArray() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map> employee = emRestService.findAllEmployeeByEmpCodeArray();
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(employee), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findEmpCodeByModuleProjectId", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> CentralController.findEmpCodeByModuleProjectId(
        @RequestParam(value = "moduleProjectId", required = false) Long moduleProjectId
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map<String,Object>> resultSearch = new ArrayList<>();
            List<ModuleMember> moduleMemberes = ModuleMember.findEmpCodeByModuleProjectId(moduleProjectId);
            for (ModuleMember moduleMember: moduleMemberes) {
                Map<String,Object> buffer = new HashMap<>();
                Map employee = emRestService.getEmployeeByEmpCode(moduleMember.getEmpCode());
                buffer.put("empCode", moduleMember.getEmpCode());
                buffer.put("empFirstName", employee.get("empFirstName"));
                buffer.put("empLastName", employee.get("empLastName"));
                buffer.put("empNickName", employee.get("empNickName"));
                resultSearch.add(buffer);
            }
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findProjectByText", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> CentralController.findProjectByText(
            @RequestParam(value = "text", required = false) String text
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map> project = emRestService.findProjectByTextLov(text);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(project), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
