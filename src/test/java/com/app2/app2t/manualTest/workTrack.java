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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
        Project p1 = insertProjectToDB("1457456400000","1459357200000","EM001==EM002","Plan and Project Management System","PPMS",2000.0);
        Project p2 = insertProjectToDB("1457456400000","1459357200000","EM003==EM004","Human Resource Management System","HRMS",1500.0);
        ModuleProject mp1 = insertModuleToDB("EMM","Employee Management",1000.0,"1457456400000","1459357200000","EM001==EM005","EM001==EM005==EM006==EM007==EM003==EM004",p1);
        ModuleProject mp2 = insertModuleToDB("PNM","Plan Management",500.0,"1457456400000","1459357200000","EM004","EM004==EM006==EM007==EM003",p1);
        ModuleProject mp3 = insertModuleToDB("SC","Security",500.0,"1457456400000","1459357200000","EM004","EM004",p1);
        ModuleProject mp4 = insertModuleToDB("ESS","Employees Sale Service",100.0,"1457456400000","1459357200000","EM005==EM006","EM005==EM006==EM004",p2);
        ModuleProject mp5 = insertModuleToDB("TD","Training Development",100.0,"1457456400000","1459357200000","EM003==EM004","EM003==EM004==EM001==EM006",p2);
        TypeTask typeTask1 = insertTypeTaskToDB("TT001","Dev");
        TypeTask typeTask2 = insertTypeTaskToDB("TT002","Design");
        TypeTask typeTask3 = insertTypeTaskToDB("TT003","Maintenance");
        TypeTask typeTask4 = insertTypeTaskToDB("TT004","Business");
        TypeTask typeTask5 = insertTypeTaskToDB("TT005","Technique");
        TypeTask typeTask6 = insertTypeTaskToDB("TT006","Edit Bug");
        Program program1 = insertProgramToDB("EMM01","Program1",mp1);
        Program program2 = insertProgramToDB("EMM02","Program2",mp1);
        Program program3 = insertProgramToDB("EMM03","Program3",mp1);
        Program program4 = insertProgramToDB("PNM01","Program4",mp2);
        Program program5 = insertProgramToDB("PNM02","Program5",mp2);
        Program program6 = insertProgramToDB("PNM03","Program6",mp2);
        Program program7 = insertProgramToDB("SC01","Program7",mp3);
        Program program8 = insertProgramToDB("SC02","Program8",mp3);
        Program program9 = insertProgramToDB("SC03","Program9",mp3);
        Program program10 = insertProgramToDB("ESS01","Program10",mp4);
        Program program11 = insertProgramToDB("ESS02","Program11",mp4);
        Program program12 = insertProgramToDB("ESS03","Program12",mp4);
        Program program13 = insertProgramToDB("TD01","Program13",mp5);
        Program program14 = insertProgramToDB("TD02","Program14",mp5);
        Program program15 = insertProgramToDB("TD03","Program15",mp5);
        ImportanceTask im1 = insertImportanceTask("IT001","Level 1");
        ImportanceTask im2 = insertImportanceTask("IT002","Level 2");
        ImportanceTask im3 = insertImportanceTask("IT003","Level 3");
        ImportanceTask im4 = insertImportanceTask("IT004","Level 4");
        ImportanceTask im5 = insertImportanceTask("IT005","Level 5");
        ImportanceTask im6 = insertImportanceTask("IT006","Level 6");
        Task task1 = insertTaskToDB("task1","TaskWork1",1.0,"EM003",typeTask1,program1,"R",im1);
        Task task2 = insertTaskToDB("task2","TaskWork2",2.0,"EM004",typeTask2,program1,"R",im1);
        Task task3 = insertTaskToDB("task3","TaskWork3",1.0,"EM003",typeTask3,program1,"N",im1);
        Task task4 = insertTaskToDB("task4","TaskWork4",2.0,"EM002",typeTask4,program2,"C",im1);
        Task task5 = insertTaskToDB("task5","TaskWork5",1.0,"",typeTask5,program2,"R",im1);
        Task task6 = insertTaskToDB("task6","TaskWork6",2.0,"",typeTask1,program2,"R",im1);
        Task task7 = insertTaskToDB("task7","TaskWork7",1.0,"",typeTask1,program3,"R",im1);
        Task task8 = insertTaskToDB("task8","TaskWork8",1.0,"EM004",typeTask1,program3,"R",im2);
        Task task9 = insertTaskToDB("task9","TaskWork9",1.0,"EM003",typeTask1,program3,"N",im2);
        Task task10 = insertTaskToDB("task10","TaskWork10",1.0,"EM002",typeTask1,program4,"R",im2);
        Task task11 = insertTaskToDB("task11","TaskWork11",1.0,"",typeTask1,program4,"R",im2);
        Task task12 = insertTaskToDB("task12","TaskWork12",1.0,"",typeTask1,program4,"R",im2);
        Task task13 = insertTaskToDB("task13","TaskWork13",1.0,"",typeTask1,program4,"R",im2);
        Task task14 = insertTaskToDB("task14","TaskWork14",1.0,"EM003",typeTask1,program5,"R",im2);
        Task task15 = insertTaskToDB("task15","TaskWork15",1.0,"EM002",typeTask1,program5,"R",im2);
        Task task16 = insertTaskToDB("task16","TaskWork16",1.0,"",typeTask1,program5,"R",im3);
        Task task17 = insertTaskToDB("task17","TaskWork17",2.0,"",typeTask2,program6,"R",im3);
        Task task18 = insertTaskToDB("task18","TaskWork18",1.0,"",typeTask3,program6,"N",im3);
        Task task19 = insertTaskToDB("task19","TaskWork19",2.0,"",typeTask4,program6,"R",im3);
        Task task20 = insertTaskToDB("task20","TaskWork20",1.0,"EM004",typeTask5,program7,"R",im3);
        Task task21 = insertTaskToDB("task21","TaskWork21",2.0,"",typeTask1,program7,"C",im3);
        Task task22 = insertTaskToDB("task22","TaskWork22",1.0,"",typeTask1,program7,"C",im3);
        Task task23 = insertTaskToDB("task23","TaskWork23",1.0,"",typeTask1,program8,"C",im4);
        Task task24 = insertTaskToDB("task24","TaskWork24",1.0,"",typeTask1,program8,"C",im4);
        Task task25 = insertTaskToDB("task25","TaskWork25",1.0,"",typeTask1,program8,"C",im4);
        Task task26 = insertTaskToDB("task26","TaskWork26",1.0,"",typeTask1,program9,"C",im4);
        Task task27 = insertTaskToDB("task27","TaskWork27",1.0,"",typeTask1,program9,"C",im4);
        Task task28 = insertTaskToDB("task28","TaskWork28",1.0,"",typeTask1,program9,"C",im4);
        Task task29 = insertTaskToDB("task29","TaskWork29",1.0,"",typeTask1,program10,"C",im4);
        Task task30 = insertTaskToDB("task30","TaskWork30",1.0,"",typeTask1,program10,"C",im5);
        Task task31 = insertTaskToDB("task31","TaskWork31",1.0,"",typeTask1,program10,"C",im5);
        Task task32 = insertTaskToDB("task32","TaskWork32",2.0,"",typeTask2,program11,"C",im5);
        Task task33 = insertTaskToDB("task33","TaskWork33",1.0,"",typeTask3,program11,"C",im5);
        Task task34 = insertTaskToDB("task34","TaskWork34",2.0,"EM002",typeTask4,program11,"C",im5);
        Task task35 = insertTaskToDB("task35","TaskWork35",1.0,"",typeTask5,program12,"C",im5);
        Task task36 = insertTaskToDB("task36","TaskWork36",2.0,"",typeTask1,program12,"C",im5);
        Task task37 = insertTaskToDB("task37","TaskWork37",1.0,"EM001",typeTask1,program12,"C",im5);
        Task task38 = insertTaskToDB("task38","TaskWork38",1.0,"",typeTask1,program13,"C",im6);
        Task task39 = insertTaskToDB("task39","TaskWork39",1.0,"",typeTask1,program13,"C",im6);
        Task task40 = insertTaskToDB("task40","TaskWork40",1.0,"",typeTask1,program13,"C",im6);
        Task task41 = insertTaskToDB("task41","TaskWork41",1.0,"",typeTask1,program14,"C",im6);
        Task task42 = insertTaskToDB("task42","TaskWork42",1.0,"EM001",typeTask1,program14,"C",im6);
        Task task43 = insertTaskToDB("task43","TaskWork43",1.0,"",typeTask1,program14,"C",im6);
        Task task44 = insertTaskToDB("task44","TaskWork44",1.0,"EM001",typeTask1,program15,"C",im6);
        Task task45 = insertTaskToDB("task48","TaskWork45",1.0,"EM001",typeTask1,program15,"C",im6);
        insertFollower(task1,"EM003");
        insertFollower(task2,"EM003");
        insertFollower(task9,"EM003");
        insertFollower(task8,"EM003");
        insertFollower(task10,"EM003");
        insertFollower(task15,"EM003");
        insertFollower(task3,"EM003");
    }

    @Test
    public void findTask() throws Exception {
        MvcResult mvcResult ;

        mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
                .param("empCode", "EM003")
                .param("projectId", "")
                .param("moduleId", "")
                .param("typeTaskId", "")
                .param("option","")
                .param("maxResult", "15")
                .param("firstResult", "0")
                .param("statusTask", "R")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[2].id", is(8)))
                .andExpect(jsonPath("$[3].id", is(10)))
                .andReturn();

                mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
                .param("empCode", "EM003")
                .param("projectId", "")
                .param("moduleId", "")
                .param("typeTaskId", "")
                .param("option","size")
                .param("statusTask", "")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size", is(7)))
                .andReturn();

        mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
                .param("option", "size")
                .param("empCode", "EM003")
                .param("projectId", "")
                .param("moduleId", "")
                .param("typeTaskId", "")
                .param("statusTask", "R")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size", is(5)))
                .andReturn();

        mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
                .param("option", "size")
                .param("empCode", "")
                .param("projectId", "")
                .param("moduleId", "")
                .param("typeTaskId", "")
                .param("statusTask", "N")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size", is(3)))
                .andReturn();

        mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
                .param("option", "size")
                .param("empCode", "")
                .param("projectId", "")
                .param("moduleId", "")
                .param("typeTaskId", "")
                .param("statusTask", "")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size", is(45)))
                .andReturn();
    }

    @Test
    public void findAllTypeTask() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/findAllTypeTask")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].typeTaskCode", is("TT001")))
                .andReturn();
    }

    @Test
    public void editTaskStatusCheckWhoCanEditNotSameVersion() throws Exception {
        AuthorizeUtil.setUserName("58024");
        MvcResult mvcResult = this.mockMvc.perform(post("/tasks/editTaskStatusCheckWhoCanEdit")
                .param("taskId", "1")
                .param("status", "C")
                .param("version", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        mvcResult = this.mockMvc.perform(get("/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus")
                .param("option", "size")
                .param("empCode", "EM003")
                .param("projectId", "")
                .param("moduleId", "")
                .param("typeTaskId", "")
                .param("statusTask", "C")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size", is(1)))
                .andReturn();
    }

    @Test
    public void editTaskStatusCheckWhoCanEditSameVersion() throws Exception {
        AuthorizeUtil.setUserName("58024");
        MvcResult mvcResult = this.mockMvc.perform(post("/tasks/editTaskStatusCheckWhoCanEdit")
                .param("taskId", "2")
                .param("status", "C")
                .param("version", "5")
        ).andDo(print())
                .andExpect(status().isNotFound())
                .andReturn();
    }

    public Project insertProjectToDB (String stDate_,String enDate_,String pm,String name,String code,double cost) throws Exception{
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

        String[] arrPM = pm.split("==");
        for(String ar : arrPM){
            ProjectManager pjm = new ProjectManager();
            pjm.setEmpCode(ar);
            pjm.setProject(project);
            pjm.persist();
        }
        return project;
    }

    public ModuleProject insertModuleToDB (
            String moduleCode,
            String moduleName,
            Double moduleCost,
            String dateStart,
            String dateEnd,
            String arr_moduleManager,
            String arr_moduleMember,
            Project project
    ) throws Exception{
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date stDate = new Date(Long.parseLong(dateStart));//date = 09/03/2016
        stDate = formatter.parse(formatter.format(stDate));
        Date enDate = new Date(Long.parseLong(dateEnd));//date = 31/03/2016
        enDate = formatter.parse(formatter.format(enDate));

        ModuleProject moduleproject = new ModuleProject();
        moduleproject.setModuleCode(moduleCode);
        moduleproject.setModuleName(moduleName);
        moduleproject.setModuleCost(moduleCost);
        moduleproject.setDateStart(stDate);
        moduleproject.setDateEnd(enDate);
        moduleproject.setProject(project);
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

    public Task insertTaskToDB(String taskCode,String taskName,Double taskCost,String empCode,TypeTask typeTask,Program programs,String status,ImportanceTask im){
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
        task.setImportanceTask(im);
        task.persist();
        return task;
    }

    public void insertFollower(Task task , String empCode){
        FollowerTask ff = new FollowerTask();
        ff.setEmpCode(empCode);
        ff.setTask(task);
        ff.persist();
    }

    public ImportanceTask insertImportanceTask(String code,String name){
        ImportanceTask im = new ImportanceTask();
        im.setImportanceTaskCode(code);
        im.setImportanceTaskName(name);
        im.persist();
        return im;
    }
}
