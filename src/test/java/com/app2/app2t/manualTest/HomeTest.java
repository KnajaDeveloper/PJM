package com.app2.app2t.manualtest;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.util.ConstantApplication;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
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

import java.util.Date;

import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@Transactional
@ContextConfiguration({"classpath:META-INF/spring/applicationContext*.xml", "file:src/main/webapp/WEB-INF/spring/webmvc-config.xml"})
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class HomeTest {

    private Logger LOGGER = LoggerFactory.getLogger(HomeTest.class);
    @Autowired
    protected WebApplicationContext wac;
    protected MockMvc mockMvc;


    public void insertDataToDataBase(String empCode,String taskCode,String taskName,String dateSt,String dateEn,int count,String taskStatus,Integer progress){

        Date stDate = new Date(dateSt);
        LOGGER.debug(stDate.toString()+"---------------------------------------------------------------");
        Date enDate = new Date(dateEn);
        LOGGER.debug(enDate.toString()+"---------------------------------------------------------------");

        Project project = new Project();
        project.setProjectCode("P");
        project.setProjectCost(1000.0);
        project.setProjectName("Test");
        project.setDateStart(stDate);
        project.setDateEnd(enDate);
        project.persist();

        ModuleProject moduleProject = new ModuleProject();
        moduleProject.setProject(project);
        moduleProject.setDateStart(stDate);
        moduleProject.setDateEnd(enDate);
        moduleProject.setModuleCode(project.getProjectCode());
        moduleProject.setModuleName(project.getProjectName());
        moduleProject.setModuleCost(100.0);
        moduleProject.setModuleStatus("");
        moduleProject.persist();

        ModuleManager moduleManager = new ModuleManager();
        moduleManager.setEmpCode("EM001");
        moduleManager.setModuleProject(moduleProject);
        moduleManager.persist();

        ModuleMember moduleMember = new ModuleMember();
        moduleManager.setModuleProject(moduleProject);
        moduleMember.setEmpCode("EM002");
        moduleManager.persist();

        Program program = new Program();
        program.setModuleProject(moduleProject);
        program.setProgramCode(moduleProject.getModuleCode());
        program.setProgramName(moduleProject.getModuleName());
        program.persist();

        ImportanceTask importanceTask = new ImportanceTask();
        importanceTask.setImportanceTaskCode(program.getProgramCode()+ count);
        importanceTask.setImportanceTaskName(program.getProgramName());
        importanceTask.persist();

        Task task = new Task();
        task.setImportanceTask(importanceTask);
        task.setProgram(program);
        task.setTaskCode(taskCode);
        task.setEmpCode(empCode);
        task.setTaskName(taskName);
        task.setProgress(progress);
        task.setTaskStatus(ConstantApplication.getTaskStatusNew());
        task.setTaskCost(0.0);
        task.setDateStart(stDate);
        task.setDateEnd(enDate);
        task.setTaskStatus(taskStatus);
        task.persist();

        Plan plan = new Plan();
        plan.setTask(task);
        plan.setDateStart(stDate);
        plan.setDateEnd(enDate);
        plan.persist();

        FollowerTask followerTask = new FollowerTask();
        followerTask.setEmpCode("EM001");
        followerTask.setTask(task);
        followerTask.persist();
    }
    @Before
    public void setup()throws Exception
    {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        AuthorizeUtil.setUserName("admin");
        int count = 0 ;

        insertDataToDataBase("EM001","T001","TestToday","03/04/2016","12/9/2016",count++,"R",100);
        insertDataToDataBase("EM001","T002","TestToday2","03/04/2016","3/9/2016",count++,"N",50);
        insertDataToDataBase("EM001","T003","TestToday3","03/04/2016","12/9/2016",count++,"N",50);
        insertDataToDataBase("EM001","T004","TestToday4","03/04/2016","3/9/2016",count++,"R",100);
        insertDataToDataBase("EM001","T005","TestToday5","03/04/2016","12/9/2016",count++,"R",100);


    }
    @After
    public void logger()throws Exception{
        LOGGER.debug("****************************************************************************************************");
    }
    @Test
    public void taskToday()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/plans/selectPlanTofirstPage")
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskCode", is("T001")))
                .andReturn()
                ;
    }
    @Test
    public void taskTodaySize()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/plans/planPaggingSize")
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size",is(3)))
                .andReturn()
                ;
    }

    @Test
    public void taskBackLog()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/plans/selectPlanBaclLogTofirstPage")
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskCode", is("T002")))
                .andReturn()
                ;
    }
    @Test
    public void taskBackLogSize()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/plans/planPaggingSizeTaskBackLog")
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(1)))
                .andReturn()
                ;
    }

    @Test
    public void updateProgress100()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(post("/tasks/updateTaskStatusAndProgress")
                .param("taskId","3")
                .param("progress","100")
                .param("taskType","1")
                .param("notePlan","")
                .param("versionPlan","0")
                .param("versionTask","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn()
                ;
         this.mockMvc.perform(get("/plans/selectPlanTofirstPage")
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[1].taskProgress", is(100)))
                .andReturn()
                ;
    }

    @Test
    public void updateProgressNot100()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(post("/tasks/updateTaskStatusAndProgress")
                .param("taskId","3")
                .param("progress","50")
                .param("taskType","1")
                .param("notePlan","")
                .param("versionPlan","0")
                .param("versionTask","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn()
                ;
        this.mockMvc.perform(get("/plans/selectPlanTofirstPage")
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[1].taskProgress", is(50)))
                .andReturn()
        ;
    }

    @Test
    public void taskFollower()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/tasks/selectTaskFollowTofirstPage")
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].taskCode", is("T004")))
                .andReturn()
                ;
    }

    @Test
    public void taskFollowerSize()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/tasks/taskPaggingSizeTaskFollow")
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size",is(5)))
                .andReturn()
                ;
    }

//    @Test
//    public void updateTaskStatusComplete()throws Exception{
//        MvcResult mvcResult = this.mockMvc.perform(post("/tasks/editTaskStatusCheckWhoCanEdit")
//                .param("taskId","4")
//                .param("status","C")
//                .param("version","0")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andReturn()
//                ;
//
//    }
//    @Test
//    public void updateTaskStatusNew()throws Exception{
//        MvcResult mvcResult = this.mockMvc.perform(post("/tasks/editTaskStatusCheckWhoCanEdit")
//                .param("taskId","5")
//                .param("status","N")
//                .param("version","0")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andReturn()
//                ;
//
//    }
}
