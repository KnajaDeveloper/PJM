package com.app2.app2t.web.pjm;

import com.app2.app2t.service.SecurityRestService;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import com.app2.app2t.util.AuthorizeUtil;

privileged aspect PJMMenuController_Custom_Controller_Json {

    @RequestMapping(value = "/findAppMenu", method = RequestMethod.GET)
    public ResponseEntity<String> PJMMenuController.findAppMenu() {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String userName = AuthorizeUtil.getUserName();
            List<Map> list = emRestService.getAppRoleByUserName(userName);
            List<Map> listAppMenu = new ArrayList<>();

            if(list.size() > 0) {
                String appRoleCode = list.get(0).get("appRole").toString();
                listAppMenu = securityRestService.getAppMenuBySecurityService(appRoleCode);
            } else {
                LOGGER.error("findAppMenu() -> getAppRoleByUserName() -> {}", list.size());
            }

            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class" ).deepSerialize(listAppMenu), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findEmployeeDetail", method = RequestMethod.GET)
    public ResponseEntity<String> PJMMenuController.findEmployeeDetail() {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);

            Map map = new HashMap();
            map.put("email", employee.get("email"));
            map.put("empFirstName", employee.get("empFirstName"));
            map.put("empLastName", employee.get("empLastName"));
            map.put("empRole", employee.get("roleName"));

            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class" ).deepSerialize(map), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}