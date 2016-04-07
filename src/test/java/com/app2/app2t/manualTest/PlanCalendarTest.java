package com.app2.app2t.manualTest;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.domain.pjm.Plan;
import com.app2.app2t.util.AuthorizeUtil;
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
    @Autowired
    AuthorizeUtil authorizeUtil;

    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

        Project pj01 = insertProject("PJ01", "Project 1", 100.0, 1451581200000L, 1464627600000L);    //date 01/01/2016 - 31/05/2016
        Project pj02 = insertProject("PJ02", "Project 2", 250.0, 1451581200000L, 1464627600000L);    //date 01/01/2016 - 31/05/2016

        ModuleProject md01 = insertModuleProject("MD01", "Module 1", 40.0, 1451581200000L, 1459357200000L, pj01, "Not Success");     //date 01/01/2016 - 31/03/2016
        ModuleProject md02 = insertModuleProject("MD02", "Module 2", 60.0, 1458406800000L, 1464627600000L, pj01, "Not Success");     //date 20/03/2016 - 31/05/2016
        ModuleProject md03 = insertModuleProject("MD03", "Module 3", 50.0, 1451581200000L, 1459357200000L, pj02, "Not Success");     //date 01/01/2016 - 31/03/2016
        ModuleProject md04 = insertModuleProject("MD04", "Module 4", 50.0, 1458406800000L, 1464627600000L, pj02, "Not Success");     //date 20/03/2016 - 31/05/2016

        insertModuleMember("EM001", md01);
        insertModuleMember("EM002", md01);
        insertModuleMember("EM003", md01);
        insertModuleMember("EM004", md01);
        insertModuleMember("EM005", md01);

        insertModuleMember("EM001", md02);
        insertModuleMember("EM002", md02);
        insertModuleMember("EM004", md02);
        insertModuleMember("EM005", md02);
        insertModuleMember("EM006", md02);

        insertModuleMember("EM002", md03);
        insertModuleMember("EM005", md03);
        insertModuleMember("EM007", md03);

        insertModuleMember("EM002", md04);

        Program pg01 = insertProgram("PG01", "Program 1", md01);
        Program pg02 = insertProgram("PG02", "Program 2", md01);
        Program pg03 = insertProgram("PG03", "Program 3", md02);
        Program pg04 = insertProgram("PG04", "Program 4", md02);
        Program pg05 = insertProgram("PG05", "Program 5", md02);
        Program pg06 = insertProgram("PG06", "Program 6", md03);

        TypeTask tt01 = insertTypeTask("TT01", "Design");
        TypeTask tt02 = insertTypeTask("TT02", "Dev");

        Task t01 = insertTask("T01", "Task 1", 2.5, tt01, "EM003", 1451581200000L, 1451926800000L, "file 1", "detail 1", 0, pg01);     // date 01/01/2016 - 05/01/2016
        Task t02 = insertTask("T02", "Task 2", 2.5, tt01, "EM003", 1452013200000L, 1452358800000L, "file 2", "detail 2", 0, pg01);     // date 06/01/2016 - 10/01/2016
        Task t03 = insertTask("T03", "Task 3", 2.5, tt02, "EM003", 1452445200000L, 1452531600000L, "file 3", "detail 3", 0, pg01);     // date 11/01/2016 - 12/01/2016
        Task t04 = insertTask("T04", "Task 4", 2.5, tt01, "EM004", 1451581200000L, 1451926800000L, "file 4", "detail 4", 0, pg01);     // date 01/01/2016 - 05/01/2016
        Task t05 = insertTask("T05", "Task 5", 2.5, tt02, "EM004", 1452013200000L, 1452358800000L, "file 5", "detail 5", 0, pg01);     // date 06/01/2016 - 10/01/2016
        Task t06 = insertTask("T06", "Task 6", 2.5, tt02, "EM004", 1452445200000L, 1452531600000L, "file 6", "detail 6", 0, pg01);     // date 11/01/2016 - 12/01/2016
        Task t07 = insertTask("T07", "Task 7", 5.0, tt02, "EM004", null, null, "file 7", "detail 7", 0, pg01);                         // date -
        Task t08 = insertTask("T08", "Task 8", 2.5, tt01, null, 1451581200000L, 1451926800000L, "file 5", "detail 5", 0, pg02);        // date 01/01/2016 - 05/01/2016
        Task t09 = insertTask("T09", "Task 9", 2.5, tt02, null, 1452013200000L, 1452358800000L, "file 5", "detail 5", 0, pg02);        // date 06/01/2016 - 10/01/2016
        Task t10 = insertTask("T10", "Task 10", 2.5, tt02, null, 1452445200000L, 1452531600000L, "file 5", "detail 5", 0, pg02);       // date 11/01/2016 - 12/01/2016
        Task t11 = insertTask("T11", "Task 11", 2.5, tt02, null, 1451581200000L, 1451926800000L, "file 5", "detail 5", 0, pg02);       // date 01/01/2016 - 05/01/2016
        Task t12 = insertTask("T12", "Task 12", 2.5, tt01, "EM001", 1452013200000L, 1452358800000L, "file 5", "detail 5", 0, pg02);    // date 06/01/2016 - 10/01/2016
        Task t13 = insertTask("T13", "Task 13", 2.5, tt01, "EM002", 1452445200000L, 1452531600000L, "file 5", "detail 5", 0, pg02);    // date 11/01/2016 - 12/01/2016
        Task t14 = insertTask("T14", "Task 14", 5.0, tt02, "EM005", 1452445200000L, 1452531600000L, "file 5", "detail 5", 0, pg02);    // date 11/01/2016 - 12/01/2016
        Task t15 = insertTask("T15", "Task 15", 10.0, tt01, "EM004", 1458406800000L, 1464627600000L, "file 5", "detail 5", 0, pg04);   // date 20/03/2016 - 31/05/2016
        Task t16 = insertTask("T16", "Task 16", 10.0, tt01, "EM005", 1458406800000L, 1458838800000L, "file 5", "detail 5", 0, pg04);   // date 20/03/2016 - 25/03/2016
        Task t17 = insertTask("T17", "Task 17", 10.0, tt02, "EM005", 1459443600000L, 1460221200000L, "file 5", "detail 5", 0, pg04);   // date 01/04/2016 - 10/04/2016
        Task t18 = insertTask("T18", "Task 18", 5.0, tt01, "EM001", 1458406800000L, 1464627600000L, "file 5", "detail 5", 0, pg04);    // date 20/03/2016 - 31/05/2016
        Task t19 = insertTask("T19", "Task 19", 5.0, tt02, "EM002", 1458406800000L, 1464627600000L, "file 5", "detail 5", 0, pg04);    // date 20/03/2016 - 31/05/2016
        Task t20 = insertTask("T20", "Task 20", 5.0, tt02, null, null, null, "file 5", "detail 5", 0, pg05);                           // date -
        Task t21 = insertTask("T21", "Task 21", 5.0, tt01, "EM005", 1462035600000L, 1463245200000L, "file 5", "detail 5", 0, pg05);    // date 01/05/2016 - 15/05/2016
        Task t22 = insertTask("T22", "Task 22", 5.0, tt01, "EM006", 1462035600000L, 1463245200000L, "file 5", "detail 5", 0, pg05);    // date 01/05/2016 - 15/05/2016
        Task t23 = insertTask("T23", "Task 23", 5.0, tt02, "EM006", 1463677200000L, 1464541200000L, "file 5", "detail 5", 0, pg05);    // date 20/05/2016 - 30/05/2016
        Task t24 = insertTask("T24", "Task 24", 10.0, tt02, null, null, null, "file 5", "detail 5", 0, pg06);                          // date -
        Task t25 = insertTask("T25", "Task 25", 10.0, tt01, "EM005", 1451581200000L, 1454173200000L, "file 5", "detail 5", 0, pg06);   // date 01/01/2016 - 31/01/2016
        Task t26 = insertTask("T26", "Task 26", 15.0, tt01, "EM005", 1454259600000L, 1455901200000L, "file 5", "detail 5", 0, pg06);   // date 01/02/2016 - 20/02/2016
        Task t27 = insertTask("T27", "Task 27", 15.0, tt02, "EM005", 1455987600000L, 1456333200000L, "file 5", "detail 5", 0, pg06);   // date 21/02/2016 - 25/02/2016

        OtherTask ot01 = insertOtherTask("Other Task 1", 1.0, "EM001", "", 0, null);
        OtherTask ot02 = insertOtherTask("Other Task 2", 1.0, "EM001", "", 0, null);
        OtherTask ot03 = insertOtherTask("Other Task 3", 1.0, "EM001", "", 0, null);
        OtherTask ot04 = insertOtherTask("Other Task 4", 1.0, "EM002", "", 0, null);
        OtherTask ot05 = insertOtherTask("Other Task 5", 1.0, "EM002", "", 0, null);
        OtherTask ot06 = insertOtherTask("Other Task 6", 1.0, "EM002", "", 0, null);
        OtherTask ot07 = insertOtherTask("Other Task 7", 1.0, "EM003", "", 0, null);
        OtherTask ot08 = insertOtherTask("Other Task 8", 1.0, "EM003", "", 0, null);
        OtherTask ot09 = insertOtherTask("Other Task 9", 1.0, "EM004", "", 0, null);
        OtherTask ot10 = insertOtherTask("Other Task 10", 1.0, "EM004", "", 0, null);

        // EM001
        insertPlanByTask("", 1452445200000L, 1452531600000L, t10);
        insertPlanByTask("", 1451581200000L, 1451926800000L, t11);
        insertPlanByTask("", 1452013200000L, 1452358800000L, t12);
        insertPlanByTask("", 1458406800000L, 1464627600000L, t18);
        insertPlanByTask("", null, null, t20);
        insertPlanByOtherTask("", 1456765200000L, 1456851600000L, ot01);    // date 01/03/2016 - 02/03/2016
        insertPlanByOtherTask("", 1458406800000L, 1458838800000L, ot02);    // date 20/03/2016 - 25/03/2016
        insertPlanByOtherTask("", 1459443600000L, 1459616400000L, ot03);    // date 01/04/2016 - 03/04/2016
        // EM002
        insertPlanByTask("", 1452013200000L, 1452358800000L, t09);
        insertPlanByOtherTask("", 1456765200000L, 1456851600000L, ot04);    // date 01/03/2016 - 02/03/2016
        insertPlanByOtherTask("", 1458406800000L, 1458838800000L, ot05);    // date 20/03/2016 - 25/03/2016
        insertPlanByOtherTask("", 1459443600000L, 1459616400000L, ot06);    // date 01/04/2016 - 03/04/2016
        // EM003        
        insertPlanByTask("", 1451581200000L, 1451926800000L, t01);
        insertPlanByTask("", 1451581200000L, 1451926800000L, t01);
        insertPlanByOtherTask("", 1456765200000L, 1456851600000L, ot07);    // date 01/03/2016 - 02/03/2016
        insertPlanByOtherTask("", 1458406800000L, 1458838800000L, ot08);    // date 20/03/2016 - 25/03/2016
        // EM004
        insertPlanByTask("", 1452013200000L, 1452358800000L, t05);
        insertPlanByTask("", 1452445200000L, 1452531600000L, t06);
        insertPlanByOtherTask("", 1456765200000L, 1456851600000L, ot09);    // date 01/03/2016 - 02/03/2016
        insertPlanByOtherTask("", 1458406800000L, 1458838800000L, ot10);    // date 20/03/2016 - 25/03/2016

        LOGGER.debug("================================ Before ===========================================");
    }

    @Test
    public void findAllProjectTest() throws Exception {
        // EM001 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("admin");
        this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].projectName", is("Project 1")))
                .andReturn();
        // EM002 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("58060");
        this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].projectName", is("Project 1")))
                .andExpect(jsonPath("$[1].projectName", is("Project 2")))
                .andReturn();
        // EM003 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("58024");
        this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].projectName", is("Project 1")))
                .andReturn();
        // EM004 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("40001");
        this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].projectName", is("Project 1")))
                .andReturn();
        // EM005 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("40002");
        this.mockMvc.perform(get("/plans/findAllProject")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].projectName", is("Project 1")))
                .andExpect(jsonPath("$[1].projectName", is("Project 2")))
                .andReturn();
    }

    @Test
    public void findAllTaskTypeTest() throws Exception {
        this.mockMvc.perform(get("/plans/findAllTaskType")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].typeTaskName", is("Design")))
                .andExpect(jsonPath("$[1].typeTaskName", is("Dev")))
                .andReturn();
    }

    @Test
    public void findAllModuleTest() throws Exception {
        // EM001 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("admin");
        this.mockMvc.perform(get("/plans/findAllModule")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
                .andReturn();
        // EM002 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("58060");
        this.mockMvc.perform(get("/plans/findAllModule")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
                .andExpect(jsonPath("$[2].moduleName", is("Module 3")))
                .andExpect(jsonPath("$[3].moduleName", is("Module 4")))
                .andReturn();
        // EM003 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("58024");
        this.mockMvc.perform(get("/plans/findAllModule")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
                .andReturn();
        // EM004 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("40001");
        this.mockMvc.perform(get("/plans/findAllModule")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
                .andReturn();
        // EM005 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("40002");
        this.mockMvc.perform(get("/plans/findAllModule")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
                .andExpect(jsonPath("$[2].moduleName", is("Module 3")))
                .andReturn();
    }

    @Test
    public void findModuleByProjectTest() throws Exception {
        // EM001 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("admin");
        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
                .andReturn();
        // EM002 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("58060");
        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
                .andReturn();

        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "2")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 3")))
                .andExpect(jsonPath("$[1].moduleName", is("Module 4")))
                .andReturn();

        // EM003 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("58024");
        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
                .andReturn();
        // EM004 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("40001");
        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
                .andReturn();
        // EM005 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("40002");
        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
                .andReturn();

        this.mockMvc.perform(get("/plans/findModuleByProject")
                        .param("id", "2")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].moduleName", is("Module 3")))
                .andReturn();
    }

    @Test
    public void findTaskByModuleAndTypeTaskTest() throws Exception {
        // EM001 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("admin");

        // + All module -> All type task -> public & private
        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
                        .content("[\"0\", [], false, false]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskName", is("Task 8")))
                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Design")))
                .andReturn();

        // + Module 1 -> All type task -> public & private
        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
                        .content("[\"1\", [], false, false]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskName", is("Task 8")))
                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Design")))
                .andReturn();

        // + Module 2 -> All type task -> public & private
        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
                        .content("[\"2\", [], false, false]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$", Matchers.hasSize(0)))
                .andReturn();

        // EM002 --------------------------------------------------------------------------------
        authorizeUtil.setUserName("58060");

        // + All module -> All type task -> public & private
        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
                        .content("[\"0\", [], false, false]")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskName", is("Task 8")))
                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Design")))
                .andExpect(jsonPath("$[1].taskName", is("Task 13")))
                .andExpect(jsonPath("$[1].typeTask.typeTaskName", is("Design")))
                .andExpect(jsonPath("$[2].taskName", is("Task 19")))
                .andExpect(jsonPath("$[2].typeTask.typeTaskName", is("Dev")))
                .andExpect(jsonPath("$[3].taskName", is("Task 24")))
                .andExpect(jsonPath("$[3].typeTask.typeTaskName", is("Dev")))
                .andReturn();

//        // + Module 1 -> All type task -> public & private
//        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
//                        .content("[\"1\", [], false, false]")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].taskName", is("Task 8")))
//                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Design")))
//                .andReturn();
//
//        // + Module 2 -> All type task -> public & private
//        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
//                        .content("[\"2\", [], false, false]")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$", Matchers.hasSize(0)))
//                .andReturn();







//        this.mockMvc.perform(get("/plans/findModuleByProject")
//                        .param("id", "1")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
//                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
//                .andReturn();
//
//        this.mockMvc.perform(get("/plans/findModuleByProject")
//                        .param("id", "2")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].moduleName", is("Module 3")))
//                .andExpect(jsonPath("$[1].moduleName", is("Module 4")))
//                .andReturn();
//
//        // EM003 --------------------------------------------------------------------------------
//        authorizeUtil.setUserName("58024");
//        this.mockMvc.perform(get("/plans/findModuleByProject")
//                        .param("id", "1")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
//                .andReturn();
//        // EM004 --------------------------------------------------------------------------------
//        authorizeUtil.setUserName("40001");
//        this.mockMvc.perform(get("/plans/findModuleByProject")
//                        .param("id", "1")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
//                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
//                .andReturn();
//        // EM005 --------------------------------------------------------------------------------
//        authorizeUtil.setUserName("40002");
//        this.mockMvc.perform(get("/plans/findModuleByProject")
//                        .param("id", "1")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].moduleName", is("Module 1")))
//                .andExpect(jsonPath("$[1].moduleName", is("Module 2")))
//                .andReturn();
//
//        this.mockMvc.perform(get("/plans/findModuleByProject")
//                        .param("id", "2")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].moduleName", is("Module 3")))
//                .andReturn();
//
//
//
//
//
//
//
//        // EM002 -> All module & All task type
//        authorizeUtil.setUserName("58060");
//        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
//                        .content("[\"0\", [], false, false]")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].taskName", is("Task 2")))
//                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Design")))
//                .andExpect(jsonPath("$[1].taskName", is("Task 1")))
//                .andExpect(jsonPath("$[1].typeTask.typeTaskName", is("Dev")))
//                .andExpect(jsonPath("$[2].taskName", is("Task 3")))
//                .andExpect(jsonPath("$[2].typeTask.typeTaskName", is("Dev")))
//                .andExpect(jsonPath("$[3].taskName", is("Task 4")))
//                .andExpect(jsonPath("$[3].typeTask.typeTaskName", is("Maintenance")))
//                .andReturn();
//
//        // EM002 -> All module & Dev task type
//        authorizeUtil.setUserName("58060");
//        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
//                        .content("[\"0\", [\"1\"], false, false]")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].taskName", is("Task 1")))
//                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Dev")))
//                .andExpect(jsonPath("$[1].taskName", is("Task 3")))
//                .andExpect(jsonPath("$[1].typeTask.typeTaskName", is("Dev")))
//                .andReturn();
//
//        // EM002 -> All module & Design task type
//        authorizeUtil.setUserName("58060");
//        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
//                        .content("[\"0\", [\"2\"], false, false]")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].taskName", is("Task 2")))
//                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Design")))
//                .andReturn();
//
//        // EM002 -> Module 2 & All task type
//        authorizeUtil.setUserName("58060");
//        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
//                        .content("[\"2\", [], false, false]")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].taskName", is("Task 4")))
//                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Maintenance")))
//                .andReturn();
//
//
//        // EM003 -> All module & All task type
//        authorizeUtil.setUserName("58024");
//        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
//                        .content("[\"0\", [], false, false]")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].taskName", is("Task 7")))
//                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Design")))
//                .andExpect(jsonPath("$[1].taskName", is("Task 5")))
//                .andExpect(jsonPath("$[1].typeTask.typeTaskName", is("Dev")))
//                .andExpect(jsonPath("$[2].taskName", is("Task 6")))
//                .andExpect(jsonPath("$[2].typeTask.typeTaskName", is("Dev")))
//                .andReturn();
//
//        // EM003 -> All module & Dev task type
//        authorizeUtil.setUserName("58024");
//        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
//                        .content("[\"0\", [\"1\"], false, false]")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].taskName", is("Task 5")))
//                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Dev")))
//                .andExpect(jsonPath("$[1].taskName", is("Task 6")))
//                .andExpect(jsonPath("$[1].typeTask.typeTaskName", is("Dev")))
//                .andReturn();
//
//        // EM003 -> All module & Design task type
//        authorizeUtil.setUserName("58024");
//        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
//                        .content("[\"0\", [\"2\"], false, false]")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].taskName", is("Task 7")))
//                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Design")))
//                .andReturn();
//
//        // EM003 -> Module 4 & All task type
//        authorizeUtil.setUserName("58024");
//        this.mockMvc.perform(post("/plans/findTaskByModuleAndTypeTask")
//                        .content("[\"4\", [], false, false]")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].taskName", is("Task 7")))
//                .andExpect(jsonPath("$[0].typeTask.typeTaskName", is("Design")))
//                .andReturn();
    }
///**********************************************8
    // @Test
    // public void findRoleByIdTest() throws Exception {
    //     MvcResult mvcResult = this.mockMvc.perform(get("/approles/findRole")
    //                     .param("id", "1")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andExpect(jsonPath("$.roleCode", is("ADMIN")))
    //             .andExpect(jsonPath("$.roleName", is("Administrator")))
    //             .andReturn();
    // }
    // @Test
    // public void findPaggingDataAppRoleTest() throws Exception {
    //     MvcResult mvcResult = this.mockMvc.perform(get("/approles/findPaggingDataAppRole")
    //                     .param("firstResult", "0")
    //                     .param("maxResult", "15")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andExpect(jsonPath("$[0].roleCode", is("ADMIN")))
    //             .andExpect(jsonPath("$[0].roleName", is("Administrator")))
    //             .andExpect(jsonPath("$[1].roleCode", is("EM")))
    //             .andExpect(jsonPath("$[1].roleName", is("Employee")))
    //             .andExpect(jsonPath("$[2].roleCode", is("PM")))
    //             .andExpect(jsonPath("$[2].roleName", is("Project manager")))
    //             .andExpect(jsonPath("$[3].roleCode", is("SA")))
    //             .andExpect(jsonPath("$[3].roleName", is("Software analysis")))
    //             .andReturn();
    // }
    // @Test
    // public void findPaggingSizeAppRoleTest() throws Exception {
    //     MvcResult mvcResult = this.mockMvc.perform(get("/approles/findPaggingSizeAppRole")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andExpect(jsonPath("$.size", is(4)))
    //             .andReturn();
    // }
    // @Test
    // public void insertAppRoleTest() throws Exception {
    //     MvcResult mvcResult = this.mockMvc.perform(post("/approles/insertAppRole")
    //                     .content("{\"roleCode\":\"DEV\",\"roleName\":\"Developer\"}")
    //     ).andDo(print())
    //             .andExpect(status().isCreated())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andReturn();

    //     this.mockMvc.perform(get("/approles/findRole")
    //                     .param("id", "5")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andExpect(jsonPath("$.roleCode", is("DEV")))
    //             .andExpect(jsonPath("$.roleName", is("Developer")))
    //             .andReturn();
    // }
    // @Test
    // public void insertAppRoleDuplicateCodeTest() throws Exception {
    //     MvcResult mvcResult = this.mockMvc.perform(post("/approles/insertAppRole")
    //                     .content("{\"roleCode\":\"ADMIN\",\"roleName\":\"Developer\"}")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andReturn();
    // }
    // @Test
    // public void updateAppRoleCodeAndNameTest() throws Exception {
    //     MvcResult mvcResult = this.mockMvc.perform(post("/approles/updateAppRole")
    //                     .content("{\"roleId\":\"1\",\"roleCode\":\"ADMIN2\",\"roleName\":\"Administrator2\"}")
    //     ).andDo(print())
    //             .andExpect(status().isCreated())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andReturn();

    //     this.mockMvc.perform(get("/approles/findRole")
    //                     .param("id", "1")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andExpect(jsonPath("$.roleCode", is("ADMIN2")))
    //             .andExpect(jsonPath("$.roleName", is("Administrator2")))
    //             .andReturn();
    // }
    // @Test
    // public void updateAppRoleCodeOnlyTest() throws Exception {
    //     MvcResult mvcResult = this.mockMvc.perform(post("/approles/updateAppRole")
    //                     .content("{\"roleId\":\"1\",\"roleCode\":\"Admin\",\"roleName\":\"Administrator\"}")
    //     ).andDo(print())
    //             .andExpect(status().isCreated())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andReturn();

    //     this.mockMvc.perform(get("/approles/findRole")
    //                     .param("id", "1")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andExpect(jsonPath("$.roleCode", is("Admin")))
    //             .andExpect(jsonPath("$.roleName", is("Administrator")))
    //             .andReturn();
    // }
    // @Test
    // public void updateAppRoleNameOnlyTest() throws Exception {
    //     MvcResult mvcResult = this.mockMvc.perform(post("/approles/updateAppRole")
    //                     .content("{\"roleId\":\"1\",\"roleCode\":\"ADMIN\",\"roleName\":\"Administrator2\"}")
    //     ).andDo(print())
    //             .andExpect(status().isCreated())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andReturn();

    //     this.mockMvc.perform(get("/approles/findRole")
    //                     .param("id", "1")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andExpect(jsonPath("$.roleCode", is("ADMIN")))
    //             .andExpect(jsonPath("$.roleName", is("Administrator2")))
    //             .andReturn();
    // }
    // @Test
    // public void updateAppRoleDuplicateCodeTest() throws Exception {
    //     MvcResult mvcResult = this.mockMvc.perform(post("/approles/updateAppRole")
    //                     .content("{\"roleId\":\"1\",\"roleCode\":\"EM\",\"roleName\":\"Administrator\"}")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andReturn();

    //     this.mockMvc.perform(get("/approles/findRole")
    //                     .param("id", "1")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andExpect(jsonPath("$.roleCode", is("ADMIN")))
    //             .andExpect(jsonPath("$.roleName", is("Administrator")))
    //             .andReturn();
    // }
    // @Test
    // public void deleteRoleTest() throws Exception {
    //     MvcResult mvcResult = this.mockMvc.perform(post("/approles/deleteAppRole")
    //                     .content("[\"1\", \"2\"]")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andExpect(jsonPath("$.countRemove", is(2)))
    //             .andReturn();

    //     MvcResult mvcResult2 = this.mockMvc.perform(get("/approles/findRole")
    //                     .param("id", "1")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andReturn();
    //     Assert.assertEquals(mvcResult2.getResponse().getContentAsString(), "null");

    //     MvcResult mvcResult3 = this.mockMvc.perform(get("/approles/findRole")
    //                     .param("id", "2")
    //     ).andDo(print())
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json;charset=UTF-8"))
    //             .andReturn();
    //     Assert.assertEquals(mvcResult3.getResponse().getContentAsString(), "null");
    // }
//    @After
//    public void afterTest() {
//        EntityManager ent = AppRole.entityManager();
//        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(AppRole.class);
//        List<AppRole> appRoleList = criteria.list();
//        for (AppRole appRole : appRoleList) {
//            LOGGER.debug("================> Id: {} Role Code {} Role Name: {}", appRole.getId(), appRole.getRoleCode(), appRole.getRoleName());
//        }
//    }

    // -- function prepare data for test -------------------------------------------------------------------------------


    public Project insertProject(String projectCode, String projectName, Double projectCost, Long dateStart, Long dateEnd) throws Exception {
        Date startDate = null;
        Date endDate = null;

        if (dateStart != null) {
            startDate = new Date(dateStart);
        }
        if (dateEnd != null) {
            endDate = new Date(dateEnd);
        }

        Project project = new Project();
        project.setProjectCode(projectCode);
        project.setProjectName(projectName);
        project.setProjectCost(projectCost);
        project.setDateStart(startDate);
        project.setDateEnd(endDate);
        project.persist();
        return project;
    }

    public ModuleProject insertModuleProject(String moduleCode, String moduleName, Double moduleCost, Long dateStart, Long dateEnd, Project project, String moduleStatus) throws Exception {
        Date startDate = null;
        Date endDate = null;

        if (dateStart != null) {
            startDate = new Date(dateStart);
        }
        if (dateEnd != null) {
            endDate = new Date(dateEnd);
        }

        ModuleProject moduleProject = new ModuleProject();
        moduleProject.setModuleCode(moduleCode);
        moduleProject.setModuleName(moduleName);
        moduleProject.setModuleCost(moduleCost);
        moduleProject.setDateStart(startDate);
        moduleProject.setDateEnd(endDate);
        moduleProject.setProject(project);
        moduleProject.setModuleStatus(moduleStatus);
        moduleProject.persist();
        return moduleProject;
    }

    public void insertModuleManager(String empCode, ModuleProject moduleProject) throws Exception {
        ModuleManager moduleManager = new ModuleManager();
        moduleManager.setEmpCode(empCode);
        moduleManager.setModuleProject(moduleProject);
        moduleManager.persist();
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

    public Task insertTask(String taskCode, String taskName, Double taskCost, TypeTask typeTask, String empCode, Long dateStart, Long dateEnd, String fileName, String detail, Integer progress, Program program) throws Exception {
        Date startDate = null;
        Date endDate = null;

        if (dateStart != null) {
            startDate = new Date(dateStart);
        }
        if (dateEnd != null) {
            endDate = new Date(dateEnd);
        }

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
        task.persist();
        return task;
    }

    public OtherTask insertOtherTask(String taskName, Double taskCost, String empCode, String detail, Integer progress, TypeTask typeTask) throws Exception {
        OtherTask otherTask = new OtherTask();
        otherTask.setTaskName(taskName);
        otherTask.setTaskCost(taskCost);
        otherTask.setEmpCode(empCode);
        otherTask.setDetail(detail);
        otherTask.setProgress(progress);
        otherTask.setTypeTask(typeTask);
        otherTask.persist();
        return otherTask;
    }

    public void insertPlanByTask(String note, Long dateStart, Long dateEnd, Task task) {
        Date startDate = null;
        Date endDate = null;

        if (dateStart != null) {
            startDate = new Date(dateStart);
        }
        if (dateEnd != null) {
            endDate = new Date(dateEnd);
        }

        Plan plan = new Plan();
        plan.setNote(note);
        plan.setDateStart(startDate);
        plan.setDateEnd(endDate);
        plan.setTask(task);
        plan.persist();
    }

    public void insertPlanByOtherTask(String note, Long dateStart, Long dateEnd, OtherTask otherTask) {
        Date startDate = null;
        Date endDate = null;

        if (dateStart != null) {
            startDate = new Date(dateStart);
        }
        if (dateEnd != null) {
            endDate = new Date(dateEnd);
        }

        Plan plan = new Plan();
        plan.setNote(note);
        plan.setDateStart(startDate);
        plan.setDateEnd(endDate);
        plan.setOtherTask(otherTask);
        plan.persist();
    }

}

