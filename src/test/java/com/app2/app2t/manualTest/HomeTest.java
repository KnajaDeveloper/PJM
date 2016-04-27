package com.app2.app2t.manualTest;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.util.AuthorizeUtil;
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


    public void insertDataToDataBase(String empCode,String taskCode,String taskName,String dateSt,String dateEn){

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
        program.persist();

        Task task = new Task();
        task.setTaskCode(taskCode);
        task.setEmpCode(empCode);
        task.setTaskName(taskName);
        task.setProgress(0);
        task.setTaskCost(0.0);
        task.setDateStart(stDate);
        task.setDateEnd(enDate);
        task.persist();

        Plan plan = new Plan();
        plan.setTask(task);
        plan.setDateStart(stDate);
        plan.setDateEnd(enDate);
        plan.persist();

    }
    @Before
    public void setup()throws Exception
    {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        AuthorizeUtil.setUserName("admin");
        insertDataToDataBase("EM003","T001","TestToday","03/04/2016","12/9/2016");
        insertDataToDataBase("EM003","T002","TestToday2","03/04/2016","12/9/2016");

    }
    @After
    public void logger()throws Exception{
        LOGGER.debug("****************************************************************************************************");
    }
@Test
public void test()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/plans/selectPlanTofirstPage")
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$[0].taskCode", is("T001")))
                .andReturn()
                ;
    }
}
