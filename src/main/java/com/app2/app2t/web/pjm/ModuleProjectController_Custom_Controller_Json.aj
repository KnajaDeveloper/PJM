// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.*;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import flexjson.JSONSerializer;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;
import java.lang.*;


privileged aspect ModuleProjectController_Custom_Controller_Json {

    @RequestMapping(value = "/saveModuleProject",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.saveModuleProject(
            @RequestParam(value = "moduleCode", required = false) String moduleCode,
            @RequestParam(value = "moduleName", required = false) String moduleName,
            @RequestParam(value = "moduleCost", required = false) Double moduleCost,
            @RequestParam(value = "dateStart", required = false) Date dateStart,
            @RequestParam(value = "dateEnd", required = false) Date dateEnd,
            @RequestParam(value = "projectId", required = false) long projectId,
            @RequestParam(value = "arr_moduleManager", required = false) String moduleManager,
            @RequestParam(value = "arr_moduleMember", required = false) String moduleMember
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Project> project = Project.findProjectByIdProject(projectId);
            ModuleProject moduleProject = ModuleProject.saveModuleProject(moduleCode, moduleName, moduleCost, dateStart,
                    dateEnd, project.get(0));
            String[] arrManager = moduleManager.split("==");
            ModuleManager.saveModuleManagerByModuleProject(moduleProject,arrManager);
            String[] arrMember = moduleMember.split("==");
            ModuleMember.saveModuleMemberByModuleProject(moduleProject,arrMember);
            List<ModuleManager> listManager = ModuleManager.findModuleManagerByModuleProject(moduleProject);
            List<ModuleMember> listMember = ModuleMember.findModuleMemberByModuleProject(moduleProject);
            Map<String,Object> maps = new HashMap<>();
            maps.put("ModuleProject",moduleProject);
            maps.put("ModuleManager",listManager);
            maps.put("ModuleMember",listMember);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(maps),headers, HttpStatus.CREATED);

        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @RequestMapping(value = "/findModuleByModuleCodeAndProjectId",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.findModuleByModuleCode(
            @RequestParam(value = "moduleCode", required = false) String moduleCode,
            @RequestParam(value = "projectId", required = false) long projectId,
            @RequestParam(value = "option", required = false) String option
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Project project = Project.findProject(projectId);
            List<ModuleProject> result = ModuleProject.findModuleByModuleCodeAndProjectId(moduleCode,project);
            option = option.toLowerCase();
            if(option.equals("size")) return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result.size()), headers, HttpStatus.OK);
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findModuleByProjectId",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.findAllNameModuleByProjectCode(
            @RequestParam(value = "projectId", required = false) long projectId
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Project> project = Project.findProjectByIdProject(projectId);
            List<ModuleProject> result = ModuleProject.findAllNameModuleByProjectCode(project.get(0));
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @RequestMapping(value = "/editModuleProjectByModuleProjectCodeAndProjectId",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.editModuleProjectByModuleProjectCodeAndProjectId(
            @RequestParam(value = "moduleNeedEdit", required = false) String moduleNeedEdit,
            @RequestParam(value = "moduleCode", required = false) String moduleCode,
            @RequestParam(value = "moduleName", required = false) String moduleName,
            @RequestParam(value = "moduleCost", required = false) Double moduleCost,
            @RequestParam(value = "dateStart", required = false) Date dateStart,
            @RequestParam(value = "dateEnd", required = false) Date dateEnd,
            @RequestParam(value = "arr_moduleManager", required = false) String arr_moduleManager,
            @RequestParam(value = "arr_moduleMember", required = false) String arr_moduleMember,
            @RequestParam(value = "projectId", required = false) long projectId
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Project project = Project.findProject(projectId);
            ModuleProject moduleProject = ModuleProject.editModuleProjectByModuleProjectCodeAndProjectId(moduleNeedEdit,moduleCode,
                    moduleName,moduleCost,dateStart,dateEnd,project);
            // Edit
            ModuleManager.deleteModuleManagerByModuleProject(moduleProject);
            ModuleManager.saveModuleManagerByModuleProject(moduleProject, arr_moduleManager.split("=="));

            ModuleMember.deleteModuleMemberByModuleProject(moduleProject);
            ModuleMember.saveModuleMemberByModuleProject(moduleProject, arr_moduleMember.split("=="));

            // return value
            List<ModuleProject> listModuleProject = ModuleProject.findAllModuleByProjectId(project);
            List<List<ModuleManager>> dataModuleManager = new ArrayList<>();
            List<List<ModuleMember>> dataModuleMember = new ArrayList<>();
            for(int i = 0 ; i < listModuleProject.size() ; i++){
                List<ModuleManager> getData = ModuleManager.findModuleManagerByModuleProject(listModuleProject.get(i));
                dataModuleManager.add(getData);
            }
            for(int i = 0 ; i < listModuleProject.size() ; i++){
                List<ModuleMember> getData = ModuleMember.findModuleMemberByModuleProject(listModuleProject.get(i));
                dataModuleMember.add(getData);
            }
            Map<String,Object> maps = new HashMap<>();
            maps.put("ModuleProject",moduleProject);
            maps.put("ModuleManager",dataModuleManager);
            maps.put("ModuleMember",dataModuleMember);

            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(maps), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/increseCostByModuleNameAndProjectId",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.increseCostByModuleNameAndCodeProject(
            @RequestParam(value = "projectId", required = false) long projectId,
            @RequestParam(value = "codeModuleProject", required = false) String codeModuleProject,
            @RequestParam(value = "costIncrese", required = false) Double costIncrese
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            String costProjectandModuleProject = "";
            List<Project> projectList = Project.findProjectByIdProject(projectId);
            double totalCostModule = ModuleProject.findAllModuleCostByProject(projectList.get(0));
            Project project = Project.increseCostByModuleNameAndProjectId(projectId, costIncrese, totalCostModule);
            double moduleCost = ModuleProject.increseCostByModuleNameAndProjectId(project, codeModuleProject, costIncrese);
            costProjectandModuleProject += project.getProjectCost();
            costProjectandModuleProject += "," +moduleCost ;
            return  new ResponseEntity<String>(costProjectandModuleProject,headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findProjectBymoduleProjectAll",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.findProjectBymoduleProjectAll(
        ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ModuleProject> result = ModuleProject.findProjectBymoduleProjectAll();
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @RequestMapping(value = "/findModuleByProjectCode2",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
//    public ResponseEntity<String> ModuleProjectController.findAllNameModuleByProjectCode2(
//        @RequestParam(value = "projectCode", required = false) Long projectCode
//        ,@RequestParam(value = "maxResult", required = false) Integer maxResult
//        ,@RequestParam(value = "firstResult", required = false) Integer firstResult
//    ) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/json;charset=UTF-8");
//        try {
//            //LOGGER.info(">>>>>>>>>>>>>>"+projectCode);
//            List<Project> project = Project.findProjectByIdProject(projectCode);
//           // LOGGER.info(">>>>>>>>>"+project.size());
//            List<ModuleProject> result = ModuleProject.findAllNameModuleByProjectCode2(project.get(0));
//            //LOGGER.info(">>>>>>Modul"+project);
//            List<Map<String, Object>> list = new ArrayList<>();
//            for(int i=firstResult;i<maxResult + firstResult && i < result.size();i++){
//                ModuleProject ta = result.get(i);
//                Map<String, Object> map = new HashMap<>();
//                map.put("id", ta.getId());
//                map.put("moduleName", ta.getModuleName());
//                map.put("dateStart", ta.getDateStart() + "");
//                map.put("dateEnd", ta.getDateEnd() + "");
//                map.put("progress", Task.findTaskProgressforAVG(ta.getId()));
//                list.add(map);
//            }
//            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(list), headers, HttpStatus.OK);
//        } catch (Exception e) {
//            LOGGER.error(e.getMessage(), e);
//            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @RequestMapping(value = "/findPaggingSizeModuleProject", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
//    @ResponseBody
//    public ResponseEntity<String> ModuleProjectController.findAllNameModuleByProjectCode2(
//       @RequestParam(value = "projectCode", required = false) Long projectCode
//    ) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/json;charset=UTF-8");
//        try {
//            List<Project> project = Project.findProjectByIdProject(projectCode);
//            List<ModuleProject> result = ModuleProject.findAllNameModuleByProjectCode2(project.get(0));
//            Map data = new HashMap();
//            data.put("size", result.size());
//            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(data), headers, HttpStatus.OK);
//        } catch (Exception e) {
//            LOGGER.error("findEvaPeriodTime :{}", e);
//            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @RequestMapping(value = "/findModuleProjectByModuleProjectID",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.findModuleProjectByModuleProjectID(
            @RequestParam(value = "id", required = false) Long id
        ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<ModuleProject> moduleProjectes = ModuleProject.findModuleProjectByModuleProjectID(id);
            List<ModuleManager> resultSearch = ModuleManager.findModuleManagerByModuleProjectID(moduleProjectes.get(0));
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/deleteModuleByModuleCodeAndProjectId",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.deleteModuleByModuleCodeAndProjectId(
            @RequestParam(value = "moduleCode", required = false) String moduleCode,
            @RequestParam(value = "projectId", required = false) long projectId
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            boolean canDeleteModule = true;
            Project project = Project.findProject(projectId);
            List<ModuleProject> moduleProject = ModuleProject.findModuleByModuleCodeAndProjectId(moduleCode,project);
            for(ModuleProject mp:moduleProject){
                List<Plan> listPlan = Plan.findPlanByModule(mp);
                if(listPlan.size()!=0) canDeleteModule = false;
            }
            if(canDeleteModule) {
                ModuleManager.deleteModuleManagerByModuleProject(moduleProject.get(0));
                ModuleMember.deleteModuleMemberByModuleProject(moduleProject.get(0));
                ModuleProject.deleteModuleByModuleCodeAndProjectId(moduleCode, project);
                return  new ResponseEntity<String>(headers, HttpStatus.OK);
            }
            return new ResponseEntity<String>(headers, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/findModuleProjectCostforSum", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ModuleProjectController.findModuleProjectCostforSum(
            @RequestParam(value = "id", required = false) Long id
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List resultSearch = ModuleProject.findModuleProjectCostforSum(id);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/findPaggingData", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ModuleProjectController.findPaggingData(
            @RequestParam(value = "id", required = false) Long id
            ,@RequestParam(value = "firstResult", required = false) Integer firstResult
            ,@RequestParam(value = "maxResult", required = false) Integer maxResult

    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            List<Map<String,Object>> resultSearch = new ArrayList<>();
            List<ModuleProject> moduleProjects = ModuleProject.findModuleprojectDataPagingData(id, firstResult, maxResult);
            for (ModuleProject moduleProject: moduleProjects) {
                Map<String,Object> buffer = new HashMap<>();
                buffer.put("id", moduleProject.getId());
                buffer.put("moduleName", moduleProject.getModuleName());
                buffer.put("dateStart", moduleProject.getDateStart() + "");
                buffer.put("dateEnd", moduleProject.getDateEnd() + "");
                buffer.put("progress", Task.findTaskProgressforAVG(moduleProject.getId()));
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
    public ResponseEntity<String> ModuleProjectController.findPaggingSize(
            @RequestParam(value = "id", required = false) Long id
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Long size = ModuleProject.findModuleProjectDataPagingSize(id);
            Map dataSendToFront = new HashMap();
            dataSendToFront.put("size",size);
            return new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(dataSendToFront), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("findEvaPeriodTime :{}", e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findEmpNameAndEmpPositionNameByEmpCode",method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> ModuleProjectController.findEmpNameAndEmpPositionNameByEmpCode(@RequestBody String empCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            JSONArray jsonArray = new JSONArray(empCode);
            List<Map<String,Object>> resultSearch = new ArrayList<>();
            for(int i = 0; i < jsonArray.length(); i++){
                Map buffer = new HashMap();
                if(!jsonArray.getString(i).isEmpty()){
                    Map employee = emRestService.getEmployeeByEmpCode(jsonArray.getString(i));
                    buffer.put("empFirstName", employee.get("empFirstName"));
                    buffer.put("empLastName", employee.get("empLastName"));
                    buffer.put("empPositionName", employee.get("empPositionName"));
                }
                else{
                    buffer.put("empFirstName", "");
                    buffer.put("empLastName", "");
                    buffer.put("empPositionName", "");
                }
                resultSearch.add(buffer);
            }
            
            return  new ResponseEntity<String>(new JSONSerializer().exclude("*.class").deepSerialize(resultSearch), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
