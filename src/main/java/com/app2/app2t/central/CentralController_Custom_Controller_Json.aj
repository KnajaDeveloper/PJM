package com.app2.app2t.central;


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
}
