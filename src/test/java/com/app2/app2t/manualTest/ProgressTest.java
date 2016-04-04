//package com.app2.app2t.manualTest;
//
//import com.app2.app2t.domain.pjm.*;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.context.WebApplicationContext;
//
//import java.text.SimpleDateFormat;
//import java.util.Date;
//
//import static org.hamcrest.core.Is.is;
//import static org.junit.Assert.assertEquals;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@WebAppConfiguration
//@Transactional
//@ContextConfiguration({"classpath:META-INF/spring/applicationContext*.xml", "file:src/main/webapp/WEB-INF/spring/webmvc-config.xml"})
//@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
//public class ProgressTest {
//    private Logger LOGGER = LoggerFactory.getLogger(ProgressTest.class);
//    @Autowired
//    protected WebApplicationContext wac;
//
//    protected MockMvc mockMvc;
//
//    public void insertDataTodateBase (String stDate_,String enDate_,String pm,String projectcode,String code,int cost,String modulename ,String date_startModule,String date_EndModule,String codeManager,String codeProgram,int progress)throws Exception{
//
//        Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").parse(stDate_);
//        Date endDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").parse(enDate_);
//        Date st_Module = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").parse(date_startModule);
//        Date en_Mo = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").parse(date_EndModule);
//
//
//
//        Project project = new Project();
//        project.setProjectCode(projectcode);
//        project.setProjectName(code);
//        project.setProjectCost(cost);
//        project.setDateStart(date);
//        project.setDateEnd(endDate);
//        project.persist();
//
//        ProjectManager pjm = new ProjectManager();
//        pjm.setEmpCode(pm);
//        pjm.setProject(project);
//        pjm.persist();
//
//        ModuleProject moduleProject = new ModuleProject();
//        moduleProject.setProject(project);
//        moduleProject.setModuleName(modulename);
//        moduleProject.setDateStart(st_Module);
//        moduleProject.setDateEnd(en_Mo);
//        moduleProject.persist();
//
//        ModuleManager moduleManager = new ModuleManager();
//        moduleManager.setModuleProject(moduleProject);
//        moduleManager.setEmpCode(codeManager);
//
//
//        Program program = new Program();
//        program.setModuleProject(moduleProject);
//        program.setProgramCode(codeProgram);
//
//        Task task = new Task();
//        task.setProgram(program);
//        task.setProgress(progress);
//
//    }
//    @Before
//    public void setup()throws Exception {
//        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
//        insertDataTodateBase("2011-01-18 00:00:00.0", "2011-02-18 00:00:00.0", "PM1", "PT01", "ProjectTest1", 20, "ModuleProject1", "2011-01-19 00:00:00.0", "2011-01-20 00:00:00.0", "CodeManager01", "CodeProgram01", 15);
//        //date 09/03/2016 - 31/03/2016
//    }
//    @Test
//    public void dataTestReturnData ()throws Exception{
//        MvcResult mvcResult = this.mockMvc.perform(get("/projects/findProjectByIdProject")
//                .param("projectID","1")
//
//        ).andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"))
//                .andExpect(jsonPath("$.Project[0].projectName", is("ProjectTest1")))
//                .andReturn()
//                ;
//
//    }
////    @Test
////    public void dataTestReturnIsNull  ()throws Exception{
////        MvcResult mvcResult = this.mockMvc.perform(get("/projects/findProjectByIdProject")
////                .param("projectID","2")
////
////        ).andDo(print())
////                .andExpect(status().isOk())
////                .andExpect(content().contentType("application/json;charset=UTF-8"))
////                .andReturn()
////                ;
////
////    }
//
//
//
//}
