package com.app2.app2t.manualtest;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.domain.pjm.Plan;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.util.ConstantApplication;
import org.hamcrest.Matchers;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.omg.stub.java.rmi._Remote_Stub;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import javax.persistence.EntityManager;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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
public class PlanCalendarTest {

    private Logger LOGGER = LoggerFactory.getLogger(PlanCalendarTest.class);

    @Autowired
    protected WebApplicationContext wac;
    protected MockMvc mockMvc;

    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        AuthorizeUtil.setUserName("admin");

        Project pj01 = insertProject("HRMS", "Human Resource Management System", 1000.0, "02/04/2016", "30/05/2016");
        Project pj02 = insertProject("PPMS", "Plan and Project Management System", 200.0, "02/04/2016", "30/05/2016");

        ModuleProject md01 = insertModuleProject("ESS", "Employee Sale Service", 250.0, "02/04/2016", "30/05/2016", pj01, "Not Success");
        ModuleProject md02 = insertModuleProject("TD", "Training Development", 150.0, "02/04/2016", "30/05/2016", pj01, "Not Success");
        ModuleProject md03 = insertModuleProject("EM", "Employee Management", 150.0, "02/04/2016", "30/05/2016", pj02, "Not Success");

        insertModuleMember("EM002", md01);
        insertModuleMember("EM003", md01);
        insertModuleMember("EM004", md01);
        insertModuleMember("EM002", md02);
        insertModuleMember("EM004", md02);
        insertModuleMember("EM005", md02);
        insertModuleMember("EM005", md03);
        insertModuleMember("EM006", md03);

        Program pg01 = insertProgram("PG01", "Program 1", md01);
        Program pg02 = insertProgram("PG02", "Program 2", md01);
        Program pg03 = insertProgram("PG01", "Program 1", md02);
        Program pg04 = insertProgram("PG01", "Program 1", md03);

        TypeTask tt01 = insertTypeTask("TT01", "Design");
        TypeTask tt02 = insertTypeTask("TT02", "Dev");

        ImportanceTask it01 = insertImportantTask("IT001", "High");
        ImportanceTask it02 = insertImportantTask("IT002", "Medium");
        ImportanceTask it03 = insertImportantTask("IT003", "Low");

        String taskStatus = ConstantApplication.getTaskStatusNew();
        Task t01 = insertTask("T01", "Task 1", 10.0, tt01, "EM002", "02/04/2016", "10/04/2016", "file 1", "detail 1", 0, pg01, it01, taskStatus);
        Task t02 = insertTask("T02", "Task 2", 10.0, tt01, "EM003", "02/04/2016", "10/04/2016", "file 2", "detail 2", 0, pg01, it01, taskStatus);
        Task t03 = insertTask("T03", "Task 3", 10.0, tt01, "EM004", "02/04/2016", "10/04/2016", "file 3", "detail 3", 0, pg01, it01, taskStatus);
        Task t04 = insertTask("T04", "Task 4", 10.0, tt02, "EM004", "11/04/2016", "12/04/2016", "file 4", "detail 4", 0, pg01, it02, taskStatus);
        Task t05 = insertTask("T05", "Task 5", 10.0, tt02, "EM004", null, null, "file 5", "detail 5", 0, pg01, it02, taskStatus);
        Task t06 = insertTask("T06", "Task 6", 10.0, tt02, "EM002", "12/04/2016", "15/04/2016", "file 6", "detail 6", 0, pg02, it02, taskStatus);
        Task t07 = insertTask("T07", "Task 7", 10.0, tt02, "EM003", "12/04/2016", "15/04/2016", "file 7", "detail 7", 0, pg02, it03, taskStatus);
        Task t08 = insertTask("T08", "Task 8", 10.0, tt02, null, "12/04/2016", "15/04/2016", "file 8", "detail 8", 0, pg02, it03, taskStatus);
        Task t09 = insertTask("T09", "Task 9", 10.0, tt02, null, null, null, "file 9", "detail 9", 0, pg02, it03, taskStatus);
        Task t10 = insertTask("T10", "Task 10", 10.0, tt01, "EM002", "02/04/2016", "10/04/2016", "file 10", "detail 10", 0, pg03, it01, taskStatus);
        Task t11 = insertTask("T11", "Task 11", 10.0, tt01, "EM004", "02/04/2016", "10/04/2016", "file 11", "detail 11", 0, pg03, it03, taskStatus);
        Task t12 = insertTask("T12", "Task 12", 10.0, tt01, "EM004", "11/04/2016", "15/04/2016", "file 12", "detail 12", 0, pg03, it03, taskStatus);
        Task t13 = insertTask("T13", "Task 13", 10.0, tt02, "EM005", "11/04/2016", "15/04/2016", "file 13", "detail 13", 0, pg03, it01, taskStatus);
        Task t14 = insertTask("T14", "Task 14", 10.0, tt02, "EM005", null, null, "file 14", "detail 14", 0, pg03, it02, taskStatus);
        Task t15 = insertTask("T15", "Task 15", 10.0, tt02, null, null, null, "file 15", "detail 15", 0, pg03, it02, taskStatus);
        Task t16 = insertTask("T16", "Task 16", 10.0, tt01, "EM006", "02/04/2016", "10/04/2016", "file 16", "detail 16", 0, pg04, it01, taskStatus);
        Task t17 = insertTask("T17", "Task 17", 10.0, tt01, "EM006", "11/04/2016", "20/04/2016", "file 17", "detail 17", 0, pg04, it01, taskStatus);
        Task t18 = insertTask("T18", "Task 18", 10.0, tt02, null, "02/04/2016", "10/04/2016", "file 18", "detail 18", 0, pg04, it01, taskStatus);

        OtherTask ot01 = insertOtherTask("Other Task 1", 10.0, "EM002", "Detail other task 1", 0);
        OtherTask ot02 = insertOtherTask("Other Task 2", 10.0, "EM002", "Detail other task 2", 0);
        OtherTask ot03 = insertOtherTask("Other Task 3", 10.0, "EM003", "Detail other task 3", 0);

        LOGGER.debug("================================ Before ===========================================");
    }

    @Test
    public void findAllProject() throws Exception {
        // EM001 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("admin");
        MvcResult mvcResult = this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
        Assert.assertEquals(mvcResult.getResponse().getContentAsString(), "[]");
        // EM002 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("58060");
        this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].projectName", is("Human Resource Management System")))
                .andReturn();
        // EM003 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("58024");
        this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].projectName", is("Human Resource Management System")))
                .andReturn();
        // EM004 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("40001");
        this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].projectName", is("Human Resource Management System")))
                .andReturn();
        // EM005 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("40002");
        this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].projectName", is("Human Resource Management System")))
                .andExpect(jsonPath("$[1].projectName", is("Plan and Project Management System")))
                .andReturn();
        // EM006 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("40003");
        this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].projectName", is("Plan and Project Management System")))
                .andReturn();
    }

    @Test
    public void findAllTaskType() throws Exception {
        this.mockMvc.perform(get("/plans/findAllTaskType")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].typeTaskName", is("Design")))
                .andExpect(jsonPath("$[1].typeTaskName", is("Dev")))
                .andReturn();
    }

    @Test
    public void findModuleByProject() throws Exception {
        // EM003 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("58024");
        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Employee Sale Service")))
                .andReturn();

        // EM004 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("40001");
        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Employee Sale Service")))
                .andExpect(jsonPath("$[1].moduleName", is("Training Development")))
                .andReturn();

        // EM005 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("40002");
        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Training Development")))
                .andExpect(jsonPath("$[1].moduleName", is("Employee Management")))
                .andReturn();

        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Training Development")))
                .andReturn();

        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "2")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Employee Management")))
                .andReturn();
    }

    @Test
    public void findTaskByModuleAndTypeTask() throws Exception {
        // EM002 -------------------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------- All module, All type, Public and Private
        AuthorizeUtil.setUserName("58060");
        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
                        .content("[\"0\", \"0\", [], false, false]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskName", is("Task 10")))
                .andExpect(jsonPath("$[1].taskName", is("Task 1")))
                .andExpect(jsonPath("$[2].taskName", is("Task 6")))
                .andExpect(jsonPath("$[3].taskName", is("Task 8")))
                .andExpect(jsonPath("$[4].taskName", is("Task 15")))
                .andExpect(jsonPath("$[5].taskName", is("Task 9")))
                .andReturn();
        // -------------------------------------------------------------------- All module, All type, Private
        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
                        .content("[\"0\", \"0\", [], true, false]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskName", is("Task 10")))
                .andExpect(jsonPath("$[1].taskName", is("Task 1")))
                .andExpect(jsonPath("$[2].taskName", is("Task 6")))
                .andReturn();
        // -------------------------------------------------------------------- All module, All type, Public
        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
                        .content("[\"0\", \"0\", [], false, true]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskName", is("Task 8")))
                .andExpect(jsonPath("$[1].taskName", is("Task 15")))
                .andExpect(jsonPath("$[2].taskName", is("Task 9")))
                .andReturn();

        // EM005 -------------------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------- All module, All type, Public and Private
        AuthorizeUtil.setUserName("40002");
        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
                        .content("[\"0\", \"0\", [], false, false]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskName", is("Task 13")))
                .andExpect(jsonPath("$[1].taskName", is("Task 14")))
                .andExpect(jsonPath("$[2].taskName", is("Task 18")))
                .andExpect(jsonPath("$[3].taskName", is("Task 15")))
                .andReturn();
    }

    @Test
    public void insertPlan() throws Exception {
        // EM002 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("58060");
        this.mockMvc.perform(post("/plans/insertPlan")
            .content("[\"1\", false, \"Note plan 1\", {\"dateStart\":1459530000000,\"dateEnd\": 1459702800000}]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();

        this.mockMvc.perform(get("/plans/findPlanByMonth")
            .param("month", "4")
            .param("year", "2016")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].note", is("Note plan 1")))
                .andExpect(jsonPath("$[0].task.taskName", is("Task 1")))
                .andReturn();
    }

    @Test
    public void insertOtherPlan() throws Exception {
        // EM002 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("58060");
        this.mockMvc.perform(post("/plans/insertOtherPlan")
            .content("{\"taskName\":\"other task 1\",\"taskCost\": \"10.0\",\"dateStart\": 1459530000000,\"dateEnd\": 1459702800000,\"note\": \"note other task\"}")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();

        this.mockMvc.perform(get("/plans/findPlanByMonth")
            .param("month", "4")
            .param("year", "2016")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].note", is("note other task")))
                .andExpect(jsonPath("$[0].otherTask.taskName", is("other task 1")))
                .andReturn();
    }

    @Test
    public void cancelTask() throws Exception {
        // EM002 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("58060");
        this.mockMvc.perform(post("/plans/cancelTask")
                        .content("10")
        ).andDo(print())
                .andExpect(status().isCreated())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
        // -------------------------------------------------------------------- All module, All type, Private
        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
                        .content("[\"0\", \"0\", [], true, false]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskName", is("Task 1")))
                .andExpect(jsonPath("$[1].taskName", is("Task 6")))
                .andReturn();
    }

    @Test
    public void findPlanByMonth() throws Exception {
        // EM002 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("58060");
        this.mockMvc.perform(post("/plans/insertPlan")
            .content("[\"1\", false, \"Note plan 1\", {\"dateStart\":1459789200000,\"dateEnd\": 1465059600000}]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();

        this.mockMvc.perform(post("/plans/insertPlan")
            .content("[\"2\", false, \"Note plan 2\", {\"dateStart\":1451926800000,\"dateEnd\": 1451926800000}]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
    }

    @Test
    public void deletePlan() throws Exception {
        // EM002 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("58060");
        this.mockMvc.perform(post("/plans/insertPlan")
            .content("[\"1\", false, \"Note plan 1\", {\"dateStart\":1459789200000,\"dateEnd\": 1465059600000}]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();

        this.mockMvc.perform(post("/plans/insertPlan")
            .content("[\"2\", false, \"Note plan 2\", {\"dateStart\":1451926800000,\"dateEnd\": 1451926800000}]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();

        this.mockMvc.perform(post("/plans/deletePlan")
            .content("1")
        ).andDo(print())
                .andExpect(status().isCreated())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
    }

    @Test
    public void updatePlan() throws Exception {
        // EM002 -------------------------------------------------------------------------------------------------------
        AuthorizeUtil.setUserName("58060");
        this.mockMvc.perform(post("/plans/insertPlan")
            .content("[\"1\", false, \"Note plan 1\", {\"dateStart\":1459789200000,\"dateEnd\": 1465059600000}]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();

        this.mockMvc.perform(post("/plans/insertPlan")
            .content("[\"2\", false, \"Note plan 2\", {\"dateStart\":1451926800000,\"dateEnd\": 1451926800000}]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
        //------------------------------------------------------------------------------------------------------- not match version
        MvcResult mvcResult = this.mockMvc.perform(post("/plans/updatePlan")
            .content("[\"2\", false, 100, \"Note plan 2\", 1, 0, {\"dateStart\":1451926800000,\"dateEnd\": 1451926800000}]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
        Assert.assertEquals(mvcResult.getResponse().getContentAsString(), "\"not match version\"");
        //------------------------------------------------------------------------------------------------------- match version
        MvcResult mvcResult2 = this.mockMvc.perform(post("/plans/updatePlan")
            .content("[\"2\", false, 100, \"Note plan 2 update\", 0, 1, {\"dateStart\":1451926800000,\"dateEnd\": 1451926800000}]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
        Assert.assertEquals(mvcResult2.getResponse().getContentAsString(), "null");
    }



    //------------------------------------------------------------------------------------------------------------------

    public Project insertProject(String projectCode, String projectName, Double projectCost, String dateStart, String dateEnd) throws Exception {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Project project = new Project();
        project.setProjectCode(projectCode);
        project.setProjectName(projectName);
        project.setProjectCost(projectCost);
        project.setDateStart(formatter.parse(dateStart));
        project.setDateEnd(formatter.parse(dateEnd));
        project.persist();
        return project;
    }

    public ModuleProject insertModuleProject(String moduleCode, String moduleName, Double moduleCost, String dateStart, String dateEnd, Project project, String moduleStatus) throws Exception {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        ModuleProject moduleProject = new ModuleProject();
        moduleProject.setModuleCode(moduleCode);
        moduleProject.setModuleName(moduleName);
        moduleProject.setModuleCost(moduleCost);
        moduleProject.setDateStart(formatter.parse(dateStart));
        moduleProject.setDateEnd(formatter.parse(dateEnd));
        moduleProject.setProject(project);
        moduleProject.setModuleStatus(moduleStatus);
        moduleProject.persist();
        return moduleProject;
    }

    public void insertModuleMember(String empCode, ModuleProject moduleProject) throws Exception {
        ModuleMember moduleMember = new ModuleMember();
        moduleMember.setEmpCode(empCode);
        moduleMember.setModuleProject(moduleProject);
        moduleMember.persist();
    }

    public Program insertProgram(String programCode, String programName, ModuleProject moduleProject) throws Exception {
        Program program = new Program();
        program.setProgramCode(programCode);
        program.setProgramName(programName);
        program.setModuleProject(moduleProject);
        program.persist();
        return program;
    }

    public TypeTask insertTypeTask(String typeTaskCode, String typeTaskName) throws Exception {
        TypeTask typeTask = new TypeTask();
        typeTask.setTypeTaskCode(typeTaskCode);
        typeTask.setTypeTaskName(typeTaskName);
        typeTask.persist();
        return typeTask;
    }

    public ImportanceTask insertImportantTask(String importantTaskCode, String importantTaskName){
        ImportanceTask importanceTask = new ImportanceTask();
        importanceTask.setImportanceTaskCode(importantTaskCode);
        importanceTask.setImportanceTaskName(importantTaskName);
        importanceTask.persist();
        return importanceTask;
    }

    public Task insertTask(String taskCode, String taskName, Double taskCost, TypeTask typeTask, String empCode, String dateStart, String dateEnd, String fileName, String detail, Integer progress, Program program, ImportanceTask importanceTask, String taskStatus) throws Exception {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

        Task task = new Task();
        task.setTaskCode(taskCode);
        task.setTaskName(taskName);
        task.setTaskCost(taskCost);
        task.setTypeTask(typeTask);
        task.setEmpCode(empCode);
        if(dateStart != null)
            task.setDateStart(formatter.parse(dateStart));
        if(dateEnd != null)
            task.setDateEnd(formatter.parse(dateEnd));
        task.setDetail(detail);
        task.setFileName(fileName);
        task.setProgress(progress);
        task.setProgram(program);
        task.setImportanceTask(importanceTask);
        task.setTaskStatus(taskStatus);
        task.persist();
        return task;
    }

    public OtherTask insertOtherTask(String taskName, Double taskCost, String empCode, String detail, Integer progress) throws Exception {
        OtherTask otherTask = new OtherTask();
        otherTask.setTaskName(taskName);
        otherTask.setTaskCost(taskCost);
        otherTask.setEmpCode(empCode);
        otherTask.setDetail(detail);
        otherTask.setProgress(progress);
        otherTask.persist();
        return otherTask;
    }

    public void insertPlan(String note, String dateStart, String dateEnd, Task task, OtherTask otherTask) throws Exception {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Plan plan = new Plan();
        plan.setNote(note);
        plan.setDateStart(formatter.parse(dateStart));
        plan.setDateEnd(formatter.parse(dateEnd));
        plan.setTask(task);
        plan.setOtherTask(otherTask);
        plan.persist();
    }

}

