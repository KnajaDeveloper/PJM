package com.app2.app2t.manualtest;

import com.app2.app2t.domain.pjm.ModuleManager;
import com.app2.app2t.domain.pjm.ModuleProject;
import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.domain.pjm.ProjectManager;
import com.app2.app2t.util.AuthorizeUtil;
import org.hamcrest.core.Is;
import org.hamcrest.core.IsNull;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@Transactional
@ContextConfiguration({"classpath:META-INF/spring/applicationContext*.xml", "file:src/main/webapp/WEB-INF/spring/webmvc-config.xml"})
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class ProjectTest {

    private Logger LOGGER = LoggerFactory.getLogger(ProjectTest.class);

    @Autowired
    protected WebApplicationContext wac;
    protected MockMvc mockMvc;

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

    public void insertModuleToDB (
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
    }

    @Before
    public void setup() throws Exception
    {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        AuthorizeUtil.setUserName("58024");
        insertProjectToDB("1457456400000","1459357200000","EM003","JUnitProject1","Unit1",20.0);//date 09/03/2016 - 31/03/2016
        insertModuleToDB("Module1","ModuleUnitTest1",5.0,"1457456400000","1459357200000","EM003","EM002==EM003",1);
        insertModuleToDB("Module2","ModuleUnitTest2",5.0,"1457456400000","1459357200000","EM002","EM002==EM003",1);
    }

    @Test
    public void createProject() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(post("/projects/saveOrUpdateProject")
                .param("projectCode", "excrepj")
                .param("projectName", "Test Create Project")
                .param("projectCost", "100.0")
                .param("dateStart", "14/04/2016")
                .param("dateEnd", "21/04/2016")
                .param("arr_ProjectManager", "EM001==EM002==EM003")
        ).andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.projectCode",is("excrepj")))
                .andReturn()
                ;
    }

    @Test
    public void findProjectByIdProject() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/projects/findProjectByIdProject")
                .param("projectID", "1")
        ).andDo(print())
                .andExpect(jsonPath("$.Project[0].projectCode",is("Unit1")))
                .andReturn()
                ;
    }

    @Test
    public void incresePointProjectByIdProject() throws Exception{
        // increse
        MvcResult mvcResult = this.mockMvc.perform(post("/projects/incresePointProjectByIdProject")
                .param("projectId", "1")
                .param("increseCost", "20.0")
        ).andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.projectCost",is(40.0)))
                .andReturn()
                ;

        // decrese
         mvcResult = this.mockMvc.perform(post("/projects/incresePointProjectByIdProject")
                .param("projectId", "1")
                .param("increseCost", "-20.0")
        ).andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.projectCost",is(20.0)))
                .andReturn()
                ;
    }

    @Test
    public void updateProjectByIdProjectSameVersion() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(post("/projects/updateProjectByIdProject")
                .param("projectID", "1")
                .param("projectCode", "excrepj")
                .param("projectName", "Test Create Project")
                .param("projectCost", "100.0")
                .param("dateStart", "14/04/2016")
                .param("dateEnd", "21/04/2016")
                .param("arr_ProjectManager", "EM001==EM002==EM003")
                .param("version", "0")
        ).andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.projectCost",is(100.0)))
                .andReturn()
                ;
    }

    @Test
    public void updateProjectByIdProjectNotSameVersion() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(post("/projects/updateProjectByIdProject")
                .param("projectID", "1")
                .param("projectCode", "excrepj")
                .param("projectName", "Test Create Project")
                .param("projectCost", "100.0")
                .param("dateStart", "14/04/2016")
                .param("dateEnd", "21/04/2016")
                .param("arr_ProjectManager", "EM001==EM002==EM003")
                .param("version", "5")
        ).andDo(print())
                .andExpect(status().isNotFound())
                .andReturn()
                ;
    }

    @Test
    public void editModuleProjectByModuleProjectCodeAndProjectId() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(post("/moduleprojects/editModuleProjectByModuleProjectCodeAndProjectId")
                .param("moduleNeedEdit", "Module1")
                .param("moduleCode", "mp1")
                .param("moduleName", "ModuleTest1")
                .param("moduleCost", "10.0")
                .param("dateStart", "14/04/2016")
                .param("dateEnd", "21/04/2016")
                .param("arr_moduleManager", "EM001==EM002==EM003")
                .param("arr_moduleMember", "EM001==EM002==EM003")
                .param("projectId", "1")
                .param("version", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ModuleProject.moduleCode",is("mp1")))
                .andReturn()
                ;
    }

    @Test
    public void editModuleProjectByModuleProjectCodeAndProjectIdNotSameVersion() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(post("/moduleprojects/editModuleProjectByModuleProjectCodeAndProjectId")
                .param("moduleNeedEdit", "Module1")
                .param("moduleCode", "mp1")
                .param("moduleName", "ModuleTest1")
                .param("moduleCost", "10.0")
                .param("dateStart", "14/04/2016")
                .param("dateEnd", "21/04/2016")
                .param("arr_moduleManager", "EM001==EM002==EM003")
                .param("arr_moduleMember", "EM001==EM002==EM003")
                .param("projectId", "1")
                .param("version", "5")
        ).andDo(print())
                .andExpect(status().isNotFound())
                .andReturn()
                ;
    }

    @Test
    public void saveModuleProject() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(post("/moduleprojects/saveModuleProject")
                .param("moduleCode", "mp2")
                .param("moduleName", "ModuleTest2")
                .param("moduleCost", "10.0")
                .param("dateStart", "14/04/2016")
                .param("dateEnd", "21/04/2016")
                .param("projectId", "1")
                .param("arr_moduleManager", "EM001==EM002==EM003")
                .param("arr_moduleMember", "EM001==EM002==EM003")
        ).andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.ModuleProject.moduleCode",is("mp2")))
                .andReturn()
                ;
    }

    @Test
    public void findModuleByModuleCodeAndProjectId() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/moduleprojects/findModuleByModuleCodeAndProjectId")
                .param("moduleCode", "Module1")
                .param("projectId", "1")
                .param("option", "")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].moduleCode",is("Module1")))
                .andReturn()
                ;

        mvcResult = this.mockMvc.perform(get("/moduleprojects/findModuleByModuleCodeAndProjectId")
                .param("moduleCode", "Module1")
                .param("projectId", "1")
                .param("option", "size")
        ).andDo(print())
                .andExpect(status().isOk())
                .andReturn()
                ;
    }

    @Test
    public void findModuleByProjectId() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/moduleprojects/findModuleByProjectId")
                .param("projectId", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[1].moduleCode",is("Module2")))
                .andReturn()
                ;
    }

    @Test
    public void deleteModuleByModuleCodeAndProjectId() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/moduleprojects/deleteModuleByModuleCodeAndProjectId")
                .param("moduleCode", "Module1")
                .param("projectId", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andReturn()
                ;

         mvcResult = this.mockMvc.perform(get("/moduleprojects/findModuleByModuleCodeAndProjectId")
        .param("moduleCode", "Module1")
        .param("projectId", "1")
        .param("option", "")
        ).andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.size").value(IsNull.nullValue()))
            .andReturn()
            ;
    }

        @Test
        public void checkRoleByModuleProjectId() throws Exception{
            AuthorizeUtil.setUserName("58024");
            MvcResult mvcResult = this.mockMvc.perform(get("/moduleprojects/checkRoleByModuleProjectId")
                .param("moduleProjectId", "1")
             ).andDo(print())
                .andExpect(status().isOk())
                .andReturn()
                ;
            assertEquals(mvcResult.getResponse().getContentAsString(),"Y");

            AuthorizeUtil.setUserName("58060");
            mvcResult = this.mockMvc.perform(get("/moduleprojects/checkRoleByModuleProjectId")
                    .param("moduleProjectId", "1")
            ).andDo(print())
                    .andExpect(status().isOk())
                    .andReturn()
                    ;
            assertEquals(mvcResult.getResponse().getContentAsString(),"N");

            AuthorizeUtil.setUserName("58060");
            mvcResult = this.mockMvc.perform(get("/moduleprojects/checkRoleByModuleProjectId")
                    .param("moduleProjectId", "2")
            ).andDo(print())
                    .andExpect(status().isOk())
                    .andReturn()
            ;
            assertEquals(mvcResult.getResponse().getContentAsString(),"Y");
    }

}
