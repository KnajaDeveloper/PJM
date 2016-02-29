package com.app2.app2t.web.pjm;


import com.app2.app2t.domain.pjm.*;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.app2.app2t.domain.pjm.Program;

import org.springframework.web.bind.annotation.*;

import java.util.*;

privileged aspect ProgramController_Custom_Controller_Json {

    @RequestMapping(value = "/saveProgram",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.saveProgram(
            @RequestParam(value = "programCode", required = false) String programCode,
            @RequestParam(value = "programName", required = false) String programName,
            @RequestParam(value = "moduleProject", required = false) String moduleProject
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ModuleProject> mp = ModuleProject.findModuleByModuleCode(moduleProject);
            Program program = Program.saveProgram(programCode, programName, mp.get(0));
            return new ResponseEntity<String>(headers, HttpStatus.CREATED);

        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findPaggingDataProgram", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ProgramController.findPaggingDataProgram(
        @RequestParam(value = "moduleProject", required = false) String moduleProject
        ,@RequestParam(value = "maxResult", required = false) Integer maxResult
        ,@RequestParam(value = "firstResult", required = false) Integer firstResult
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ModuleProject> mp = ModuleProject.findModuleByModuleCode(moduleProject);
            List<Program> result = Program.findProjectByProgram(mp.get(0));
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

    @RequestMapping(value = "/findPaggingSizeProgram", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ProgramController.findPaggingSizeProgram(
        @RequestParam(value = "moduleProject", required = false) String moduleProject
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ModuleProject> mp = ModuleProject.findModuleByModuleCode(moduleProject);
            List<Program> result = Program.findProjectByProgram(mp.get(0));
            Map data = new HashMap();
            data.put("size", result.size());
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(data), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findProgramByProgramCode",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.findProgramByProgramCode(
            @RequestParam(value = "programCode", required = false) String programCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Program> result = Program.findProgramByProgramCode(programCode);
            return  new ResponseEntity<String>(result.size() + "", headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findEditProgram",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.findEditProgram(
        @RequestParam(value = "moduleProject", required = false) String moduleProject
        ,@RequestParam(value = "programCode", required = false) String programCode
        ,@RequestParam(value = "programName", required = false) String programName
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ModuleProject> mp = ModuleProject.findModuleByModuleCode(moduleProject);
            List<Program> result = Program.findEditProgram(mp.get(0), programCode, programName);
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/findDeleteProgram",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.findDeleteProgram(
        @RequestParam(value = "moduleProject", required = false) String moduleProject
        ,@RequestParam(value = "programCode", required = false) String programCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ModuleProject> mp = ModuleProject.findModuleByModuleCode(moduleProject);
            List<Program> result = Program.findDeleteProgram(mp.get(0), programCode);

            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findSizeProgramByProgramCode",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.findSizeProgramByProgramCode(
        @RequestParam(value = "moduleProject", required = false) String moduleProject
        ,@RequestParam(value = "programCode", required = false) String programCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ModuleProject> mp = ModuleProject.findModuleByModuleCode(moduleProject);
            List<Program> result = Program.findSizeProgramByProgramCode(mp.get(0), programCode);
            return  new ResponseEntity<String>(result.size() + "", headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

       @RequestMapping(value = "/findProgramByModuleProject",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.findProgramByModuleProject(
            @RequestParam(value = "moduleProject", required = false) String moduleProject
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {    
            List<ModuleProject> mo = ModuleProject.findModuleByModuleCode(moduleProject);
            List<Program> result = Program.findProgramByModuleProject(mo.get(0));
            //LOGGER.info(">>>>>>>>>>>>>>>>>>Modul"+project);           
} catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }

}