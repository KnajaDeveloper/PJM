package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.AppParameter;
import com.app2.app2t.domain.ParameterDetail;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

privileged aspect ParameterDetailController_Custom_Controller_Json {

    @RequestMapping(value = "/getStatusTask",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ParameterDetailController.getStatusTask() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<AppParameter> idCode = AppParameter.getIdByCode("taskStatus");
            List<ParameterDetail> result = ParameterDetail.getStatusTask(idCode.get(0).getId());
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").exclude("appParameter").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
