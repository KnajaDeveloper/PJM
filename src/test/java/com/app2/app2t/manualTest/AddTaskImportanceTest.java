package com.app2.app2t.manualtest;

import com.app2.app2t.domain.pjm.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.*;
import org.springframework.expression.spel.ast.Projection;
import org.springframework.test.annotation.DirtiesContext;
import javax.persistence.EntityManager;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.text.SimpleDateFormat;
import java.util.*;
import java.io.*;

import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.util.ConstantApplication;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@Transactional
@ContextConfiguration({"classpath:META-INF/spring/applicationContext*.xml", "file:src/main/webapp/WEB-INF/spring/webmvc-config.xml"})
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class AddTaskImportanceTest {

    private Logger LOGGER = LoggerFactory.getLogger(AddTaskImportanceTest.class);
    @Autowired
    protected WebApplicationContext wac;

    protected MockMvc mockMvc;

    @Before
    public void setup()throws Exception{
        AuthorizeUtil.setUserName("POTE");
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        Project project1 = insertDataTodateBaseProject("PRO1", "PRO1", 50.0000, "1457456400000", "1459357200000"); //date 09/03/2016 - 31/03/2016
        Project project2 = insertDataTodateBaseProject("PRO2", "PRO2", 50.0000, "1457456400000", "1458061200000"); //date 09/03/2016 - 16/03/2016
        Project project3 = insertDataTodateBaseProject("PRO3", "PRO4", 50.0000, "1457456400000", "1459357200000"); //date 09/03/2016 - 31/03/2016
        Project project4 = insertDataTodateBaseProject("PRO4", "PRO5", 50.0000, "1457456400000", "1458061200000"); //date 09/03/2016 - 16/03/2016

        ModuleProject moduleProject1 = insertDataTodateBaseModuleProject("MO1", "MO1", 30.0000, "1457456400000", "1459357200000", project1); //date 09/03/2016 - 31/03/2016
        ModuleProject moduleProject2 = insertDataTodateBaseModuleProject("MO2", "MO2", 40.0000, "1457456400000", "1458061200000", project2); //date 09/03/2016 - 16/03/2016
        ModuleProject moduleProject3 = insertDataTodateBaseModuleProject("MO3", "MO3", 30.0000, "1457456400000", "1459357200000", project3); //date 09/03/2016 - 31/03/2016
        ModuleProject moduleProject4 = insertDataTodateBaseModuleProject("MO4", "MO4", 40.0000, "1457456400000", "1458061200000", project4); //date 09/03/2016 - 16/03/2016

        insertDataTodateBaseModuleManager("EM001", moduleProject1);
        insertDataTodateBaseModuleManager("EM002", moduleProject2);
        insertDataTodateBaseModuleManager("EM003", moduleProject3);
        insertDataTodateBaseModuleManager("EM004", moduleProject4);
        insertDataTodateBaseModuleManager("EM005", moduleProject1);

        insertDataTodateBaseModuleMember("EM001", moduleProject1);
        insertDataTodateBaseModuleMember("EM002", moduleProject1);
        insertDataTodateBaseModuleMember("EM003", moduleProject1);
        insertDataTodateBaseModuleMember("EM004", moduleProject1);
        insertDataTodateBaseModuleMember("EM005", moduleProject1);
        insertDataTodateBaseModuleMember("EM006", moduleProject1);
        insertDataTodateBaseModuleMember("EM006", moduleProject2);
        insertDataTodateBaseModuleMember("EM007", moduleProject2);
        insertDataTodateBaseModuleMember("EM003", moduleProject2);
        insertDataTodateBaseModuleMember("EM004", moduleProject3);
        insertDataTodateBaseModuleMember("EM006", moduleProject4);
        insertDataTodateBaseModuleMember("EM004", moduleProject4);

        TypeTask typeTask1 = insertDataTodateBaseTypeTask("TT001", "DEV");
        TypeTask typeTask2 = insertDataTodateBaseTypeTask("TT002", "DESIGN");
        TypeTask typeTask3 = insertDataTodateBaseTypeTask("TT003", "Maintenance");

        ImportanceTask importanceTask1 = insertDataTodateBaseTaskImportance("IT001", "Level 1");
        ImportanceTask importanceTask2 = insertDataTodateBaseTaskImportance("IT002", "Level 2");
        ImportanceTask importanceTask3 = insertDataTodateBaseTaskImportance("IT003", "Level 3");
        ImportanceTask importanceTask4 = insertDataTodateBaseTaskImportance("IT004", "Level 4");
        ImportanceTask importanceTask5 = insertDataTodateBaseTaskImportance("IT005", "Level 5");
        ImportanceTask importanceTask6 = insertDataTodateBaseTaskImportance("IT006", "Level 6");

        Program program1 = insertDataTodateBaseProgram("PG001", "Plus", moduleProject1);
        Program program2 = insertDataTodateBaseProgram("PG002", "Multiply", moduleProject2);

        insertDataTodateBaseTask("T001", "Fix Bug for General", 3.0000, typeTask1, "EM001", "1457456400000", "1459357200000", "README1.txt", "detail1", 20, program1, importanceTask1); //date 09/03/2016 - 31/03/2016
        insertDataTodateBaseTask("T002", "Add image for EM001", 3.0000, typeTask1, "EM002", "1457456400000", "1458061200000", "README2.txt", "detail2", 50, program1, importanceTask1); //date 09/03/2016 - 16/03/2016
        insertDataTodateBaseTask("T003", "Edit Alert for EM002", 3.0000, typeTask2, "EM003", "1457456400000", "1459357200000", "README3.txt", "detail3", 80, program1, importanceTask1); //date 09/03/2016 - 31/03/2016
        insertDataTodateBaseTask("T004", "Edit Alert for EM003", 3.0000, typeTask2, "EM004", "1457456400000", "1458061200000", "README4.txt", "detail4", 100, program1, importanceTask1); //date 09/03/2016 - 16/03/2016
    }

    public Project insertDataTodateBaseProject (String projectCode, String projectName, Double projectCost, String dateStart, String dateEnd)throws Exception{
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date startDate = new Date(Long.parseLong(dateStart));
        startDate = formatter.parse(formatter.format(startDate));
        Date endDate = new Date(Long.parseLong(dateEnd));
        endDate = formatter.parse(formatter.format(endDate));
        Project project = new Project();
        project.setProjectCode(projectCode);
        project.setProjectName(projectName);
        project.setProjectCost(projectCost);
        project.setDateStart(startDate);
        project.setDateEnd(endDate);
        project.persist();
        return project;
    }

    public ModuleProject insertDataTodateBaseModuleProject (String moduleCode, String moduleName, Double moduleCost, String dateStart, String dateEnd, Project project)throws Exception{
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date startDate = new Date(Long.parseLong(dateStart));
        startDate = formatter.parse(formatter.format(startDate));
        Date endDate = new Date(Long.parseLong(dateEnd));
        endDate = formatter.parse(formatter.format(endDate));
        ModuleProject moduleProject = new ModuleProject();
        moduleProject.setModuleCode(moduleCode);
        moduleProject.setModuleName(moduleName);
        moduleProject.setModuleCost(moduleCost);
        moduleProject.setDateStart(startDate);
        moduleProject.setDateEnd(endDate);
        moduleProject.setProject(project);
        moduleProject.setModuleStatus("Not Success");
        moduleProject.persist();
        return moduleProject;
    }

    public void insertDataTodateBaseModuleManager (String empCode, ModuleProject moduleProject)throws Exception{
        ModuleManager moduleManager = new ModuleManager();
        moduleManager.setEmpCode(empCode);
        moduleManager.setModuleProject(moduleProject);
        moduleManager.persist();
    }

    public void insertDataTodateBaseModuleMember (String empCode, ModuleProject moduleProject)throws Exception{
        ModuleManager moduleManager = new ModuleManager();
        moduleManager.setEmpCode(empCode);
        moduleManager.setModuleProject(moduleProject);
        moduleManager.persist();
    }

    public TypeTask insertDataTodateBaseTypeTask (String typeTaskCode, String typeTaskName)throws Exception{
        TypeTask typeTask = new TypeTask();
        typeTask.setTypeTaskCode(typeTaskCode);
        typeTask.setTypeTaskName(typeTaskName);
        typeTask.persist();
        return typeTask;
    }

    public ImportanceTask insertDataTodateBaseTaskImportance (String importanceCode, String importanceName)throws Exception{
        ImportanceTask importanceTask = new ImportanceTask();
        importanceTask.setImportanceTaskCode(importanceCode);
        importanceTask.setImportanceTaskName(importanceName);
        importanceTask.persist();
        return importanceTask;
    }

    public Program insertDataTodateBaseProgram (String programCode, String programName, ModuleProject moduleProject)throws Exception{
        Program program = new Program();
        program.setProgramCode(programCode);
        program.setProgramName(programName);
        program.setModuleProject(moduleProject);
        program.persist();
        return program;
    }

    public void insertDataTodateBaseTask (String taskCode, String taskName, Double taskCost, TypeTask typeTask, String empCode, String dateStart, String dateEnd, String fileName, String detail, Integer progress, Program program, ImportanceTask importanceTask)throws Exception{
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date startDate = new Date(Long.parseLong(dateStart));
        startDate = formatter.parse(formatter.format(startDate));
        Date endDate = new Date(Long.parseLong(dateEnd));
        endDate = formatter.parse(formatter.format(endDate));
        Task task = new Task();
        task.setTaskCode(taskCode);
        task.setTaskName(taskName);
        task.setTaskCost(taskCost);
        task.setTypeTask(typeTask);
        task.setEmpCode(empCode);
        task.setDateStart(startDate);
        task.setDateEnd(endDate);
        task.setDetail(detail);
        task.setFileName(fileName);
        task.setProgress(progress);
        task.setProgram(program);
        task.setTaskStatus(ConstantApplication.getTaskStatusNew());
        task.setImportanceTask(importanceTask);
        task.persist();
    }

    public void editDataTodateBase (String importanceCode, String importanceName)throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/importancetasks/findeditImportance")
            .param("importanceTaskCode", importanceCode)
            .param("importanceTaskName", importanceName)
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andReturn();
    }

    public void deleteDataTodateBase (String importanceID)throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/importancetasks/findDeleteImportance")
            .param("importanceID", importanceID)
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andReturn();
    }

    public void dateTestFindPaggingData (String json, String dataJson, String importanceCode, String importanceName)throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/importancetasks/findPaggingData")
            .param("importanceCode", importanceCode)
            .param("importanceName", importanceName)
            .param("firstResult","0")
            .param("maxResult","15")
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andExpect(jsonPath(json, is(dataJson)))
            .andReturn();
    }

    public void dateTestFindPaggingSize (String json, int dataJson, String importanceCode, String importanceName)throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/importancetasks/findPaggingSize")
            .param("importanceCode", importanceCode)
            .param("importanceName", importanceName)
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andExpect(jsonPath(json, is(dataJson)))
            .andReturn();
    }

    public void dateTestIsEmpty (String json, String dataJson, String importanceCode, String importanceName)throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/importancetasks/findPaggingData")
            .param("importanceCode", importanceCode)
            .param("importanceName", importanceName)
            .param("firstResult","0")
            .param("maxResult","15")
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andReturn();

            assertEquals(mvcResult.getResponse().getContentAsString(), dataJson);
    }

    public void dateTestFindCheckImportanceCode (String importanceCode)throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/importancetasks/findCheckimportanceCode")
            .param("importanceCode", importanceCode)
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andReturn();
    }

    @Test
    public void select_Star_From_IMPORTANCE_TASK() throws Exception{
        dateTestFindPaggingData("$[0].importanceCode", "IT001", "", "");
        dateTestFindPaggingData("$[1].importanceName", "Level 2", "", "");
        dateTestFindPaggingSize("size", 6, "", "");
    }

    @Test
    public void select_Star_From_IMPORTANCE_TASK_Where_ImportanceCode_Equal () throws Exception{
        dateTestFindPaggingData("$[0].importanceCode", "IT001", "IT001", "");
        dateTestFindPaggingSize("size", 1, "IT001", "");
    }

    @Test
    public void select_Star_From_IMPORTANCE_TASK_Where_ImportanceName_Equal () throws Exception{
        dateTestFindPaggingData("$[0].importanceName", "Level 1", "", "Level 1");
        dateTestFindPaggingSize("size", 1, "", "Level 1");
    }

    @Test
    public void select_Star_From_IMPORTANCE_TASK_Where_ImportanceCode_Equal_And_ImportanceName_Equal () throws Exception{
        dateTestFindPaggingData("$[0].importanceCode" , "IT001", "IT001", "Level 1");
        dateTestFindPaggingData("$[0].importanceName" , "Level 1", "IT001", "Level 1");
        dateTestFindPaggingSize("size", 1, "IT001", "Level 1");
    }

    @Test
    public void update_From_IMPORTANCE_TASK_set_ImportanceName_Equal_Where_ImportanceCode_Equal () throws Exception{
        editDataTodateBase("IT001", "Level01");
        dateTestFindPaggingData("$[0].importanceName", "Level01", "IT001", "Level01");
    }

    @Test
    public void delete_From_IMPORTANCE_TASK_Where_importanceCode_Equal () throws Exception{
        deleteDataTodateBase("6");
        dateTestIsEmpty("$[5].importanceCode", "[]", "IT006", "Level 6");
    }

    @Test
    public void select_Count_ImportanceCode_EIMPORTANCE_TASK_Where_ImportanceCode_Equal () throws Exception{
        dateTestFindCheckImportanceCode("IT001");
    }

    public void dateTestFindAllTaskImportance ()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/importancetasks/findAllTaskImportance")
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andExpect(jsonPath("$[0].importanceCode" , is("IT001")))
            .andExpect(jsonPath("$[0].importanceName" , is("Level 1")))
            .andExpect(jsonPath("$[1].importanceCode" , is("IT002")))
            .andExpect(jsonPath("$[1].importanceName" , is("Level 2")))
            .andExpect(jsonPath("$[2].importanceCode" , is("IT003")))
            .andExpect(jsonPath("$[2].importanceName" , is("Level 3")))
            .andExpect(jsonPath("$[3].importanceCode" , is("IT004")))
            .andExpect(jsonPath("$[3].importanceName" , is("Level 4")))
            .andExpect(jsonPath("$[4].importanceCode" , is("IT005")))
            .andExpect(jsonPath("$[4].importanceName" , is("Level 5")))
            .andExpect(jsonPath("$[5].importanceCode" , is("IT006")))
            .andExpect(jsonPath("$[5].importanceName" , is("Level 6")))
            .andReturn();
    }
}