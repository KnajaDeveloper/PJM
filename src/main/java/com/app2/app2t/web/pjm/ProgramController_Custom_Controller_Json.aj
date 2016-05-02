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

    @RequestMapping(value = "/findPaggingData", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ProgramController.findPaggingData(
        @RequestParam(value = "id", required = false) Long id
        ,@RequestParam(value = "firstResult", required = false) Integer firstResult
        ,@RequestParam(value = "maxResult", required = false) Integer maxResult
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map<String,Object>> resultSearch = new ArrayList<>();
            List<Program> programes = Program.findProgramDataPagingData(id, firstResult, maxResult);
            for (Program program: programes) {
                Map<String,Object> buffer = new HashMap<>();
                buffer.put("id", program.getId());
                buffer.put("programCode", program.getProgramCode());
                buffer.put("programName", program.getProgramName());
                buffer.put("inUse", Task.findProgramByID(program.getId()));
                resultSearch.add(buffer);
            }
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findPaggingSize", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ProgramController.findPaggingSize(
        @RequestParam(value = "id", required = false) Long id
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Long size = Program.findProgramDataPagingSize(id);
            Map dataSendToFront = new HashMap();
            dataSendToFront.put("size",size);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(dataSendToFront), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/saveProgram",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.saveProgram(
            @RequestParam(value = "programCode", required = false) String programCode,
            @RequestParam(value = "programName", required = false) String programName,
            @RequestParam(value = "id", required = false) Long id
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ModuleProject> mp = ModuleProject.findModuleProjectByModuleProjectID(id);
            Program program = Program.saveProgram(programCode, programName, mp.get(0));
            return new ResponseEntity<String>(headers, HttpStatus.CREATED);

        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
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

    @RequestMapping(value = "/findEditProgram",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.findEditProgram(
        @RequestParam(value = "id", required = false) Long id
        ,@RequestParam(value = "programCode", required = false) String programCode
        ,@RequestParam(value = "programName", required = false) String programName
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Program> result = Program.findEditProgram(id, programCode, programName);
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/findDeleteProgram",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.findDeleteProgram(
        @RequestParam(value = "id", required = false) Long id
        ,@RequestParam(value = "programId", required = false) Long programId
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Program> result = Program.findDeleteProgram(id, programId);

            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findSizeProgramByProgramCode",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ProgramController.findSizeProgramByProgramCode(
        @RequestParam(value = "id", required = false) Long id
        ,@RequestParam(value = "programCode", required = false) String programCode
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Program> result = Program.findSizeProgramByProgramCode(id, programCode);
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
            return  new ResponseEntity<String>(result.size() + "", headers, HttpStatus.OK);
            //LOGGER.info(">>>>>>>>>>>>>>>>>>Modul"+project);           
} catch (Exception e){
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
          

}