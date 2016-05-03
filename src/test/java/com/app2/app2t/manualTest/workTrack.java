package com.app2.app2t.manualtest;

import com.app2.app2t.domain.pjm.*;
import com.app2.app2t.util.AuthorizeUtil;
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
import java.text.SimpleDateFormat;
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

public class workTrack {

    private Logger LOGGER = LoggerFactory.getLogger(workTrack.class);

    @Autowired
    protected WebApplicationContext wac;
    protected MockMvc mockMvc;

    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        AuthorizeUtil.setUserName("58024");
        insertProjectToDB("1457456400000","1459357200000","EM003","JUnitProject1","Unit1",20.0);//date 09/03/2016 - 31/03/2016
        ModuleProject mp1 = insertModuleToDB("Module1","ModuleUnitTest1",5.0,"1457456400000","1459357200000","EM003","EM002==EM003",1);
        insertModuleToDB("Module2","ModuleUnitTest2",5.0,"1457456400000","1459357200000","EM002","EM002==EM003",1);
        TypeTask typeTask = insertTypeTaskToDB("Type01","Dev");
        Program program = insertProgramToDB("Program01","Project",mp1);
        Task task = insertTaskToDB("T001","CreateProject",1.0,"",typeTask,program,"R");
        Task task1 = insertTaskToDB("T002","EditProject",2.0,"EM006",typeTask,program,"C");
        insertFollower(task,"EM003");
        insertFollower(task1,"EM003");
    }

    @Test
    public void findTask() throws Exception {
        MvcResult mvcResult ;
//        MvcResult mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
//                .param("statusTask", "R")
//                .param("empCode", "")
//                .param("projectId", "")
//                .param("moduleId", "")
//                .param("typeTaskId", "")
//                .param("option","")
//                .param("maxResult", "0")
//                .param("firstResult", "15")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andReturn();
//
//        mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
//                .param("statusTask", "C")
//                .param("projectId", "")
//                .param("moduleId", "")
//                .param("typeTaskId", "")
//                .param("empCode", "")
//                .param("option","")
//                .param("maxResult", "0")
//                .param("firstResult", "15")
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andReturn();

        mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
                .param("empCode", "EM003")
                .param("projectId", "")
                .param("moduleId", "")
                .param("typeTaskId", "")
                .param("option","")
                .param("maxResult", "0")
                .param("firstResult", "15")
                .param("statusTask", "R")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.Task[0].id", is(1)))
                .andReturn();

        mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
                .param("option", "size")
                .param("empCode", "EM003")
                .param("projectId", "")
                .param("moduleId", "")
                .param("typeTaskId", "")
                .param("maxResult", "0")
                .param("firstResult", "15")
                .param("statusTask", "R")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size", is(1)))
                .andReturn();

        mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
                .param("empCode", "EM003")
                .param("option", "size")
                .param("projectId", "")
                .param("moduleId", "")
                .param("typeTaskId", "")
                .param("maxResult", "0")
                .param("firstResult", "15")
                .param("statusTask", "R")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size", is(1)))
                .andReturn();
    }

    @Test
    public void findAllTypeTask() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/findAllTypeTask")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].typeTaskCode", is("Type01")))
                .andReturn();
    }

    public void insertProjectToDB (String stDate_,String enDate_,String pm,String name,String code,double cost) throws Exception{
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date stDate = new Date(Long.parseLong(stDate_));//date = 09/03/2016
        stDate = formatter.parse(formatter.format(stDate));
        Date enDate = new Date(Long.parseLong(enDate_));//date = 31/03/2016
        enDate = formatter.parse(formatter.format(enDate));
        Project project = new Project();
        project.setProjectCode(code);
        project.setProjectName(name);
        project.setProjectCost(cost);
        project.setDateStart(stDate);
        project.setDateEnd(enDate);
        project.persist();

        ProjectManager pjm = new ProjectManager();
        pjm.setEmpCode(pm);
        pjm.setProject(project);
        pjm.persist();
    }

    public ModuleProject insertModuleToDB (
            String moduleCode,
            String moduleName,
            Double moduleCost,
            String dateStart,
            String dateEnd,
            String arr_moduleManager,
            String arr_moduleMember,
            long projectId
    ) throws Exception{
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date stDate = new Date(Long.parseLong(dateStart));//date = 09/03/2016
        stDate = formatter.parse(formatter.format(stDate));
        Date enDate = new Date(Long.parseLong(dateEnd));//date = 31/03/2016
        enDate = formatter.parse(formatter.format(enDate));
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
        criteria.add(Restrictions.eq("id", projectId));
        List<Project> pj = criteria.list();

        ModuleProject moduleproject = new ModuleProject();
        moduleproject.setModuleCode(moduleCode);
        moduleproject.setModuleName(moduleName);
        moduleproject.setModuleCost(moduleCost);
        moduleproject.setDateStart(stDate);
        moduleproject.setDateEnd(enDate);
        moduleproject.setProject(pj.get(0));
        moduleproject.setModuleStatus("Not Success");
        moduleproject.persist();

        String[] empCode = arr_moduleManager.split("==");
        for(String name : empCode){
            ModuleManager mm = new ModuleManager();
            mm.setEmpCode(name);
            mm.setModuleProject(moduleproject);
            mm.persist();
        }

        empCode = arr_moduleMember.split("==");
        for(String name : empCode){
            ModuleMember mm = new ModuleMember();
            mm.setEmpCode(name);
            mm.setModuleProject(moduleproject);
            mm.persist();
        }
        return moduleproject;
    }

    public TypeTask insertTypeTaskToDB(String code, String name){
        TypeTask tt = new TypeTask();
        tt.setTypeTaskCode(code);
        tt.setTypeTaskName(name);
        tt.persist();
        return tt;
    }

    public Program insertProgramToDB(String code,String name,ModuleProject mp){
        Program tt = new Program();
        tt.setProgramCode(code);
        tt.setProgramName(name);
        tt.setModuleProject(mp);
        tt.persist();
        return tt;
    }

    public Task insertTaskToDB(String taskCode,String taskName,Double taskCost,String empCode,TypeTask typeTask,Program programs,String status){
        Task task = new Task();
        task.setTaskCode(taskCode);
        task.setTaskName(taskName);
        task.setTaskCost(taskCost);
        task.setTypeTask(typeTask);
        if(empCode!="") task.setEmpCode(empCode);
        else task.setEmpCode(null);
        task.setProgress(0);
        task.setProgram(programs);
        task.setTaskStatus(status);
        task.setImportanceTask(null);
        task.persist();
        return task;
    }

    public void insertFollower(Task task , String empCode){
        FollowerTask ff = new FollowerTask();
        ff.setEmpCode(empCode);
        ff.setTask(task);
        ff.persist();
    }
}
