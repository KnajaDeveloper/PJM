// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.ModuleManager;
import com.app2.app2t.domain.pjm.ModuleMember;
import com.app2.app2t.domain.pjm.ModuleProject;
import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.web.pjm.ModuleProjectController;
import com.sun.xml.internal.ws.api.server.Module;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

privileged aspect ModuleProjectController_Custom_Controller_Json {

    @RequestMapping(value = "/saveModuleProject",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.saveModuleProject(
            @RequestParam(value = "moduleCode", required = false) String moduleCode,
            @RequestParam(value = "moduleName", required = false) String moduleName,
            @RequestParam(value = "moduleCost", required = false) Integer moduleCost,
            @RequestParam(value = "dateStart", required = false) Date dateStart,
            @RequestParam(value = "dateEnd", required = false) Date dateEnd,
            @RequestParam(value = "projectCode", required = false) String projectCode,
            @RequestParam(value = "arr_moduleManager", required = false) String moduleManager,
            @RequestParam(value = "arr_moduleMember", required = false) String moduleMember
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Project> project = Project.findProjectByProjectCode(projectCode);
            ModuleProject moduleProject = ModuleProject.saveModuleProject(moduleCode, moduleName, moduleCost, dateStart,
                    dateEnd, project.get(0));
            String[] arrManager = moduleManager.split("==");
            ModuleManager.saveModuleManagerByModuleProject(moduleProject,arrManager);
            String[] arrMember = moduleMember.split("==");
            ModuleMember.saveModuleMemberByModuleProject(moduleProject,arrMember);
            return new ResponseEntity<String>(headers, HttpStatus.CREATED);

        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @RequestMapping(value = "/findModuleByModuleCode",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.findModuleByModuleCode(
            @RequestParam(value = "moduleCode", required = false) String moduleCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ModuleProject> result = ModuleProject.findModuleByModuleCode(moduleCode);
            return  new ResponseEntity<String>(result.size() + "", headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
