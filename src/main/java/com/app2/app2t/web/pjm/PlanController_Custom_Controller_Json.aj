// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.ModuleMember;
import com.app2.app2t.domain.pjm.ModuleProject;
import com.app2.app2t.domain.pjm.Plan;
import com.app2.app2t.domain.pjm.TypeTask;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.web.pjm.PlanController;

import java.util.ArrayList;
import java.util.List;

import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.UriComponentsBuilder;

privileged aspect PlanController_Custom_Controller_Json {

    @RequestMapping(value = "/findAllModule", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.findAllModule() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String userName = AuthorizeUtil.getUserName();
            List<ModuleMember> moduleMembers = ModuleMember.findModuleMemberByUserName(userName);

            List<ModuleProject> result = new ArrayList<>();

            for(ModuleMember moduleMember: moduleMembers) {
                result.add(ModuleProject.findModuleProject(moduleMember.getId()));
            }

            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findAllTaskType", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> PlanController.findAllTaskType() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<TypeTask> result = TypeTask.findAllTypeTasks();
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
