package com.app2.app2t.manualtest;

import com.app2.app2t.domain.pjm.Program;
import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.domain.pjm.Task;
import com.app2.app2t.domain.pjm.TypeTask;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.util.ConstantApplication;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
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

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@Transactional
@ContextConfiguration({"classpath:META-INF/spring/applicationContext*.xml", "file:src/main/webapp/WEB-INF/spring/webmvc-config.xml"})
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class PlanViewsTest {

    private Logger LOGGER = LoggerFactory.getLogger(PlanViewsTest.class);

    @Autowired
    protected WebApplicationContext wac;
    protected MockMvc mockMvc;

    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        AuthorizeUtil.setUserName("admin");
    }

    @Test
    public void findEmptyTask() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/tasks/findEmptyTask")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.Task[0].id", is(100005)))
                .andExpect(jsonPath("$.Task[1].id", is(100006)))
                .andExpect(jsonPath("$.Task[2].id", is(100007)))
                .andReturn();
    }

    @Test
    public void findDataByYearAndProjectAndModuleProjectAndTeam() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/plans/findDataByYearAndProjectAndModuleProjectAndTeam")
                .param("statProject", "1459494182791")
                .param("endProject", "1461999782791")
                .param("projectId", "100001")
                .param("moduleProjectId", "")
                .param("teamId", "")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.Name[0]", is("EM006")))
                .andExpect(jsonPath("$.Plan[2].Task[0][1]", is(1.0)))
                .andReturn();
    }

    public TypeTask insertTypeTaskToDB(String code, String name){
        TypeTask tt = new TypeTask();
        tt.setTypeTaskCode(code);
        tt.setTypeTaskName(name);
        return tt;
    }

    public Program insertProgramToDB(String code,String name){
        Program tt = new Program();
        tt.setProgramCode(code);
        tt.setProgramName(name);
        return tt;
    }

    public void insertTaskToDB(String taskCode,String taskName,Double taskCost,String empCode){
        TypeTask typeTask = insertTypeTaskToDB("TT001","Project");
        Program programs =insertProgramToDB("P001","CreateProject");

        Task task = new Task();
        task.setTaskCode(taskCode);
        task.setTaskName(taskName);
        task.setTaskCost(taskCost);
        task.setTypeTask(typeTask);
        if(empCode!="") task.setEmpCode(empCode);
        else task.setEmpCode(null);
        task.setProgress(0);
        task.setProgram(programs);
        task.setTaskStatus("N");
        task.setImportanceTask(null);
        task.persist();
    }
}

