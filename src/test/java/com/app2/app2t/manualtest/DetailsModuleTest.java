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
public class DetailsModuleTest {

  private Logger LOGGER = LoggerFactory.getLogger(DetailsModuleTest.class);
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

  public void insertDataTodateBaseProgram2 (String programCode, String programName)throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(post("/programs/saveProgram")
      .param("id", "1")
      .param("programCode", programCode)
      .param("programName", programName)
    ).andDo(print())
      .andExpect(status().isCreated())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
  }

  public void editDataTodateBaseProgram (String programCode, String programName)throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(post("/programs/findEditProgram")
      .param("id", "1")
      .param("programCode", programCode)
      .param("programName", programName)
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
  }

  public void deleteDataTodateBaseProgram (String id)throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(post("/programs/findDeleteProgram")
      .param("id", "1")
      .param("programId", id)
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
  }

  public void dateTestfindSizeProgramByProgramCode (String programCode)throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(get("/programs/findSizeProgramByProgramCode")
      .param("id", "1")
      .param("programCode", programCode)
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
  }

  public void insertDataTodateBaseTask2 (String taskCode, String taskName, Double taskCost, String typeTask, String empCode, String dateStart, String dateEnd, String fileName, String detail, Integer progress)throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(post("/tasks/saveTask/" + taskCode + 
       																                             "/" + taskName +
       																                             "/" + taskCost +
       																                             "/" + typeTask +
       																                             "/" + empCode +
       																                             "/" + dateStart +
       																                             "/" + dateEnd +
       																                             "/" + fileName +
       																                             "/" + detail +
       																                             "/" + progress +
       																                             "/" + 1)
    ).andDo(print())
      .andExpect(status().isCreated())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
  }

  public void editDataTodateBaseTask (String id, String taskCode, String taskName, String taskCost, String typeTask, String empCode, String dateStart, String dateEnd, String fileName, String detail, String progress)throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(post("/tasks/findEditTask")
      .param("id", id)
      .param("taskCode", taskCode)
      .param("taskName", taskName)
      .param("taskCost", taskCost)
      .param("typeTask", typeTask)
      .param("empCode", empCode)
      .param("dateStart", dateStart)
      .param("dateEnd", dateEnd)
      .param("fileName", fileName)
      .param("detail", detail)
      .param("progress", progress)
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
  }

  public void deleteDataTodateBaseTask (String id)throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(post("/tasks/findDeleteTask")
      .param("id", "1")
      .param("taskID", id)
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
  }

  public void dateTestfindSizeTaskByTaskCode (String taskCode)throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(get("/tasks/findSizeTaskByTaskCode")
      .param("id", "1")
      .param("taskCode", taskCode)
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
  }

  @Test
  public void dateTestFindModuleProject ()throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(get("/moduleprojects/findModuleProjectByModuleProjectID")
      .param("id", "1")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andExpect(jsonPath("$[0].moduleProject.moduleCode", is("MO1")))
      .andExpect(jsonPath("$[0].moduleProject.moduleName", is("MO1")))
      .andExpect(jsonPath("$[0].moduleProject.moduleCost", is(30.0000)))
      .andExpect(jsonPath("$[0].moduleProject.dateStart", is(1457456400000L)))
      .andExpect(jsonPath("$[0].moduleProject.dateEnd", is(1459357200000L)))
      .andExpect(jsonPath("$[0].empCode", is("EM001")))
      .andReturn();
  }

  @Test
  public void dateTestFindTaskCostforSum ()throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(get("/tasks/findTaskCostforSum")
      .param("id", "1")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
      assertEquals(mvcResult.getResponse().getContentAsString(), "[12.0]");
  }

  @Test
  public void dateTestFindPaggingDataProgram ()throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(get("/programs/findPaggingData")
      .param("id", "1")
      .param("firstResult","0")
      .param("maxResult","15")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andExpect(jsonPath("$[0].inUse", is(4)))
      .andExpect(jsonPath("$[0].programCode", is("PG001")))
      .andExpect(jsonPath("$[0].programName", is("Plus")))
      .andReturn();
  }

  @Test
  public void dateTestFindPaggingSizeProgram ()throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(get("/programs/findPaggingSize")
      .param("id", "1")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andExpect(jsonPath("size", is(1)))
      .andReturn();
  }

  @Test
  public void insert_Into_PROGRAM_Values_Equal () throws Exception{
    insertDataTodateBaseProgram2("P0001", "PN 01");
    MvcResult mvcResult = this.mockMvc.perform(get("/programs/findPaggingData")
      .param("id", "1")
      .param("firstResult","0")
      .param("maxResult","15")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andExpect(jsonPath("$[1].inUse", is(0)))
      .andExpect(jsonPath("$[1].programCode", is("P0001")))
      .andExpect(jsonPath("$[1].programName", is("PN 01")))
      .andReturn();
  }

  @Test
  public void update_From_PROGRAM_set_ProgramName_Equal_Where_ProgramCode_Equal () throws Exception{
    editDataTodateBaseProgram("PG001", "Plusing");
    MvcResult mvcResult = this.mockMvc.perform(get("/programs/findPaggingData")
      .param("id", "1")
      .param("firstResult","0")
      .param("maxResult","15")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andExpect(jsonPath("$[0].inUse", is(4)))
      .andExpect(jsonPath("$[0].programCode", is("PG001")))
      .andExpect(jsonPath("$[0].programName", is("Plusing")))
      .andReturn();
  }

   @Test
   public void delete_From_PROGRAM_Where_ProgramCode_Equal () throws Exception{
    insertDataTodateBaseProgram2("P0001", "PN 01");
    deleteDataTodateBaseProgram("3");
    MvcResult mvcResult = this.mockMvc.perform(get("/programs/findPaggingData")
      .param("id", "1")
      .param("firstResult","0")
      .param("maxResult","15")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
  }

  @Test
  public void select_Count_ProgramCode_PROGRAM_Where_ProgramCode_Equal () throws Exception{
    dateTestfindSizeProgramByProgramCode("PG001");
  }

  @Test
  public void dateTestFindPaggingDataTask ()throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(get("/tasks/findPaggingData")
      .param("id", "1")
      .param("firstResult","0")
      .param("maxResult","15")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andExpect(jsonPath("$[0].taskCode", is("T001")))
      .andExpect(jsonPath("$[1].taskCode", is("T002")))
      .andExpect(jsonPath("$[2].taskCode", is("T003")))
      .andExpect(jsonPath("$[3].taskCode", is("T004")))
      .andReturn();
  }

  @Test
  public void dateTestFindPaggingSizeTask ()throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(get("/tasks/findPaggingSize")
      .param("id", "1")
    ).andDo(print()) 
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andExpect(jsonPath("size", is(4)))
      .andReturn();
  }

   // @Test
   // public void insert_Into_TASK_Values_Equal () throws Exception{
   //     insertDataTodateBaseTask2("T005", "Edit Alert for EM005", 3.0000, "TT003", "EM005", "09-03-2016", "6-03-2016", "null", "detail5", 0);
   //     MvcResult mvcResult = this.mockMvc.perform(get("/tasks/findPaggingData")
   //         .param("id", "1")
   //         .param("firstResult","0")
   //         .param("maxResult","15")
   //     ).andDo(print())
   //         .andExpect(status().isOk())
   //         .andExpect(content().contentType("application/json;charset=UTF-8"))
   //         .andExpect(jsonPath("$[4].taskCode", is("T005")))
   //         .andExpect(jsonPath("$[4].taskName", is("Edit Alert for EM005")))
   //         .andExpect(jsonPath("$[4].taskCost", is(3.0000)))
   //         .andExpect(jsonPath("$[4].typeTaskName", is("Maintenance")))
   //         .andExpect(jsonPath("$[4].empCode", is("EM005")))
   //         .andExpect(jsonPath("$[4].dateStart", is(1457456400000L)))
   //         .andExpect(jsonPath("$[4].dateEnd", is(1457197200000L)))
   //         .andExpect(jsonPath("$[4].progress", is(0)))
   //         .andExpect(jsonPath("$[4].fileName", is("README5.txt")))
   //         .andExpect(jsonPath("$[4].detail", is("detail5")))
   //         .andReturn();
   // }

   // @Test
   // public void update_From_TASK_set_TaskName_Equal_Where_TaskCode_Equal () throws Exception{
   //     editDataTodateBaseTask("4", "T004", "Edit Alert for EM004", "3.0000", "TT002", "EM004", "09/03/2016", "16/03/2016", "README4.txt", "detail4", "0");
   //     MvcResult mvcResult = this.mockMvc.perform(get("/tasks/findPaggingData")
   //         .param("id", "1")
   //         .param("firstResult","0")
   //         .param("maxResult","15")
   //     ).andDo(print())
   //         .andExpect(status().isOk())
   //         .andExpect(content().contentType("application/json;charset=UTF-8"))
   //         .andExpect(jsonPath("$[3].taskCode", is("T004")))
   //         .andExpect(jsonPath("$[3].taskName", is("Edit Alert for EM004")))
   //         .andExpect(jsonPath("$[3].taskCost", is(3.0000)))
   //         .andExpect(jsonPath("$[3].typeTask.typeTaskName", is("DESIGN")))
   //         .andExpect(jsonPath("$[3].empCode", is("EM004")))
   //         .andExpect(jsonPath("$[3].dateStart", is(1457456400000L)))
   //         .andExpect(jsonPath("$[3].dateEnd", is(1458061200000L)))
   //         .andExpect(jsonPath("$[3].progress", is(0)))
   //         .andExpect(jsonPath("$[3].fileName", is("README4.txt")))
   //         .andExpect(jsonPath("$[3].detail", is("detail4")))
   //         .andReturn();
   // }

  @Test
  public void delete_From_TASK () throws Exception{
    for(int i = 1; i <= 4; i++)
      deleteDataTodateBaseTask(i + "");

    MvcResult mvcResult = this.mockMvc.perform(get("/tasks/findPaggingData")
      .param("id", "1")
      .param("firstResult","0")
      .param("maxResult","15")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andReturn();
      assertEquals(mvcResult.getResponse().getContentAsString(), "[]");
  }

  @Test
  public void select_Count_TaskCode_PROGRAM_Where_TaskCode_Equal () throws Exception{
    dateTestfindSizeTaskByTaskCode("T001");
  }

  @Test
  public void dateTestFindModuleProjectByModuleProjectID ()throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(get("/moduleprojects/findModuleProjectByModuleProjectID")
      .param("id", "1")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andExpect(jsonPath("$[0].moduleProject.moduleName", is("MO1")))
      .andExpect(jsonPath("$[0].moduleProject.moduleCode", is("MO1")))
      .andExpect(jsonPath("$[0].moduleProject.moduleCost", is(30.0)))
      .andExpect(jsonPath("$[0].moduleProject.dateStart", is(1457456400000L)))
      .andExpect(jsonPath("$[0].moduleProject.dateEnd", is(1459357200000L)))
      .andExpect(jsonPath("$[0].empCode", is("EM001")))
      .andReturn();
  }

  @Test
  public void dateTestFindAllTypeTask ()throws Exception{
    MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/findAllTypeTask")
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType("application/json;charset=UTF-8"))
      .andExpect(jsonPath("$[0].typeTaskCode", is("TT001")))
      .andExpect(jsonPath("$[1].typeTaskCode", is("TT002")))
      .andExpect(jsonPath("$[2].typeTaskCode", is("TT003")))
      .andExpect(jsonPath("$[0].typeTaskName", is("DEV")))
      .andExpect(jsonPath("$[1].typeTaskName", is("DESIGN")))
      .andExpect(jsonPath("$[2].typeTaskName", is("Maintenance")))
      .andReturn();
  }

  // @Test
  // public void dateTestDownloadFile ()throws Exception{
  //   MvcResult mvcResult = this.mockMvc.perform(get("/tasks/downloadFile/1/T001/README1.txt")
  //   ).andDo(print())
  //     .andExpect(status().isOk())
  //     .andExpect(content().contentType("application/json;charset=UTF-8"))
  //     .andReturn();
  // }
}
