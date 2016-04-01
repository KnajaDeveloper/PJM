// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.domain.pjm.ProjectManager;
import com.app2.app2t.domain.pjm.ModuleManager;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.service.SecurityRestService;

import java.util.*;
privileged aspect ProjectManagerController_Custom_Controller_Json {
   @RequestMapping(value = "/findManagerByProject",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProjectManagerController.findManagerByProject(
            @RequestParam(value = "project", required = false) Long project
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Project> projectzz = Project.findProjectByIdProject(project);
            List<ProjectManager> result = ProjectManager.findManagerByProject(projectzz.get(0));
   			//LOGGER.info(">>>>>>>>>>>>>>>>>>Modul"+project);           
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }

    @RequestMapping(value = "/checkRoleProjects", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String>ProjectManagerController.checkRoleProjects(
            @RequestParam(value = "projectId", required = false) Long projectId,
            @RequestParam(value = "moduleProjectId", required = false) Long moduleProjectId

    ){
        HttpHeaders headers=new HttpHeaders();
        headers.add("Content-Type","application/json;charset=UTF-8");
        try{
            Boolean result ;
            String userName = AuthorizeUtil.getUserName();
            Map employee = emRestService.getEmployeeByUserName(userName);
            Boolean rolePm = ProjectManager.checkRoleProjects(projectId,employee.get("empCode").toString());
            Boolean roleMd ;
            if(moduleProjectId != null)
            {
                roleMd = ModuleManager.checkRoleModule(moduleProjectId,employee.get("empCode").toString());
                if(rolePm || roleMd)
                {
                    result = true ;
                }
                else
                {
                    result = false ;
                }
            }
            else
            {
                result = rolePm ;
            }



            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result),headers,HttpStatus.OK);
        }catch(Exception e){
            LOGGER.error(e.getMessage(),e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}",headers,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
