package com.app2.app2t.manualtest;

import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.domain.pjm.ProjectManager;
import com.app2.app2t.util.AuthorizeUtil;
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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@Transactional
@ContextConfiguration({"classpath:META-INF/spring/applicationContext*.xml", "file:src/main/webapp/WEB-INF/spring/webmvc-config.xml"})
public class ProjectTest {

    private Logger LOGGER = LoggerFactory.getLogger(ProjectTest.class);

    @Autowired
    protected WebApplicationContext wac;
    protected MockMvc mockMvc;

    @Autowired
    AuthorizeUtil authorizeUtil;

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

    @Before
    public void setup() throws Exception
    {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        authorizeUtil.setUserName("58024");
        insertProjectToDB("1457456400000","1459357200000","EM003","Unit1","JUnitProject1",20.0);//date 09/03/2016 - 31/03/2016
    }

//    @Test
//    public void createProject() throws Exception{
//        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
//        Date dStart = new Date();
//        Date dEnd = new Date();
//        try {
//            dStart = formatter.parse(formatter.format(dStart));
//            dEnd = formatter.parse(formatter.format(dEnd));
//        }catch (ParseException e){
//            e.printStackTrace();
//        }
//        MvcResult mvcResult = this.mockMvc.perform(get("/projects/saveOrUpdateProject")
//                .param("projectCode", "excrepj")
//                .param("projectName", "Test Create Project")
//                .param("projectCost", "99")
//                .param("dateStart", String.valueOf(dStart))
//                .param("dateEnd",String.valueOf(dEnd))
//                .param("arr_ProjectManager", "EM001==EM002==EM003")
//        ).andDo(print())
//                .andExpect(jsonPath("$.Project[0].projectCode", is("excrepj")))
//                .andReturn()
//                ;
//    }

    @Test
    public void findProjectByIdProject() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/projects/findProjectByIdProject")
                .param("projectID", "121")
        ).andDo(print())
                .andExpect(jsonPath("$.Project[0].projectCode", is("PPMS")))
                .andReturn()
                ;
    }

    @Test
    public void incresePointProjectByIdProject() throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/projects/incresePointProjectByIdProject")
                .param("projectID", "1")
                .param("increseCost", "20.0")
        ).andDo(print())
                .andExpect(jsonPath("$.Project[0].projectCode", is("Unit1")))
                .andExpect(jsonPath("$.Project[0].projectCost", is("40.0")))
                .andReturn()
                ;
    }

}
