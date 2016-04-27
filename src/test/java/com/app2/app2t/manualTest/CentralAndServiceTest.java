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
public class CentralAndServiceTest {

    private Logger LOGGER = LoggerFactory.getLogger(CentralAndServiceTest.class);

    @Autowired
    protected WebApplicationContext wac;
    protected MockMvc mockMvc;

    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        AuthorizeUtil.setUserName("admin");

        // POTE DEV >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

        Task task1 = insertDataTodateBaseTask("T001", "Fix Bug for General", 3.0000, typeTask1, "EM001", "1457456400000", "1459357200000", "README1.txt", "detail1", 20, program1, importanceTask1); //date 09/03/2016 - 31/03/2016
        Task task2 = insertDataTodateBaseTask("T002", "Add image for EM001", 3.0000, typeTask1, "EM002", "1457456400000", "1458061200000", "README2.txt", "detail2", 50, program1, importanceTask1); //date 09/03/2016 - 16/03/2016
        Task task3 = insertDataTodateBaseTask("T003", "Edit Alert for EM002", 3.0000, typeTask2, "EM003", "1457456400000", "1459357200000", "README3.txt", "detail3", 80, program1, importanceTask1); //date 09/03/2016 - 31/03/2016
        Task task4 = insertDataTodateBaseTask("T004", "Edit Alert for EM003", 3.0000, typeTask2, "EM004", "1457456400000", "1458061200000", "README4.txt", "detail4", 100, program1, importanceTask1); //date 09/03/2016 - 16/03/2016

        insertDataTodateBaseTaskFollower("EM001", task1);
        insertDataTodateBaseTaskFollower("EM002", task1);
        insertDataTodateBaseTaskFollower("EM003", task2);
        insertDataTodateBaseTaskFollower("EM004", task2);
        insertDataTodateBaseTaskFollower("EM005", task3);
        insertDataTodateBaseTaskFollower("EM006", task3);
        insertDataTodateBaseTaskFollower("EM007", task4);

        // POTE DEV <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    }

    // POTE DEV >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
        ModuleMember moduleMember = new ModuleMember();
        moduleMember.setEmpCode(empCode);
        moduleMember.setModuleProject(moduleProject);
        moduleMember.persist();
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

    public Task insertDataTodateBaseTask (String taskCode, String taskName, Double taskCost, TypeTask typeTask, String empCode, String dateStart, String dateEnd, String fileName, String detail, Integer progress, Program program, ImportanceTask importanceTask)throws Exception{
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
        return task;
    }

    public void insertDataTodateBaseTaskFollower (String empCode, Task task)throws Exception{
        FollowerTask followerTask = new FollowerTask();
        followerTask.setEmpCode(empCode);
        followerTask.setTask(task);
        followerTask.persist();
    }

    // POTE DEV <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    @Test
    public void findAllEmployeeByEmpCodeArray() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/central/findAllEmployeeByEmpCodeArray")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].empCode", is("EM001")))
                .andExpect(jsonPath("$[2].empCode", is("EM003")))
                .andReturn();
    }

    @Test
    public void findEmployeeByEmpCodeArray() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/central/findEmployeeByEmpCodeArray")
                .param("empCode", "EM001==EM002")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].empCode", is("EM001")))
                .andExpect(jsonPath("$[1].empCode", is("EM002")))
                .andReturn();
    }

    @Test
    public void findTeamAll() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/central/findTeamAll")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].teamCode", is("T001")))
                .andExpect(jsonPath("$[1].teamCode", is("T002")))
                .andReturn();
    }

    // POTE DEV >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    @Test
    public void dateTestFindEmpCodeByModuleProjectId ()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/central/findEmpCodeByModuleProjectId")
            .param("moduleProjectId", "1")
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andExpect(jsonPath("$[0].empCode", is("EM001")))
            .andExpect(jsonPath("$[1].empCode", is("EM002")))
            .andExpect(jsonPath("$[2].empCode", is("EM003")))
            .andExpect(jsonPath("$[3].empCode", is("EM004")))
            .andExpect(jsonPath("$[4].empCode", is("EM005")))
            .andExpect(jsonPath("$[5].empCode", is("EM006")))
            .andReturn();
    }

    @Test
    public void dateTestFindEmpNameAndEmpPositionNameByEmpCode ()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(post("/moduleprojects/findEmpNameAndEmpPositionNameByEmpCode")
            .content("['EM001', 'EM005']")
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andExpect(jsonPath("$[0].empFirstName", is("กิตติศักดิ์")))
            .andExpect(jsonPath("$[0].empLastName", is("บำรุงเขต")))
            .andExpect(jsonPath("$[0].empPositionName", is("Administrator")))
            .andExpect(jsonPath("$[1].empFirstName", is("ณัฐดนัย")))
            .andExpect(jsonPath("$[1].empLastName", is("ศรีดาวงษ์")))
            .andExpect(jsonPath("$[1].empPositionName", is("Software Developer")))
            .andReturn();
    }

    @Test
    public void dateTestFindEmpCodeByTaskID ()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/followertasks/findEmpCodeByTaskID")
            .param("taskId", "1")
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andExpect(jsonPath("$[0].empCode", is("EM001")))
            .andExpect(jsonPath("$[1].empCode", is("EM002")))
            .andReturn();
    }

    // POTE DEV <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
}

