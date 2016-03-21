package ManualTest;

import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.domain.pjm.ProjectManager;
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

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@Transactional
@ContextConfiguration({"classpath:META-INF/spring/applicationContext*.xml", "file:src/main/webapp/WEB-INF/spring/webmvc-config.xml"})
public class SearchProject {

    private Logger LOGGER = LoggerFactory.getLogger(SearchProject.class);
    @Autowired
    protected WebApplicationContext wac;

    protected MockMvc mockMvc;

    @Before
    public void setup()throws Exception
    {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        insertDataTodateBase("1457456400000","1459357200000","PM1","ProjectTest1","PT01",20);//date 09/03/2016 - 31/03/2016
        insertDataTodateBase("1457456400000","1458061200000","PM2","ProjectTest2","PT02",30);//date 09/03/2016 - 16/03/2016
        insertDataTodateBase("1457456400000","1459357200000","PM3","ProjectTest3","PT04",20);//date 09/03/2016 - 31/03/2016
        insertDataTodateBase("1457456400000","1458061200000","PM4","ProjectTest4","PT04",30);//date 09/03/2016 - 16/03/2016
    }


    public void selectProjectReturnLong(long dateLong,String json,String stDatefrom,String stDate_To,String fnDateFrom,String fnDateTo,String costFrom,String costTo,String pm) throws Exception{
//        insertDataTodateBase("1457456400000","1459357200000","PM1","ProjectTest1","PT01",20);//date 09/03/2016 - 31/03/2016
//        insertDataTodateBase("1457456400000","1458061200000","PM2","ProjectTest2","PT02",30);//date 09/03/2016 - 16/03/2016
        dateTest(dateLong,json,stDatefrom,stDate_To,fnDateFrom,fnDateTo,costFrom,costTo,pm);
    }
    public void selectProjectReturnInt(int dateLong,String json,String stDatefrom,String stDate_To,String fnDateFrom,String fnDateTo,String costFrom,String costTo,String pm) throws Exception{
//        insertDataTodateBase("1457456400000","1459357200000","PM1","ProjectTest1","PT01",20);//date 09/03/2016 - 31/03/2016
//        insertDataTodateBase("1457456400000","1458061200000","PM2","ProjectTest2","PT02",30);//date 09/03/2016 - 16/03/2016
        dataTest(dateLong,json,stDatefrom,stDate_To,fnDateFrom,fnDateTo,costFrom,costTo,pm);
    }

    public void insertDataTodateBase (String stDate_,String enDate_,String pm,String name,String code,int cost)throws Exception{
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date stDate = new Date(Long.parseLong(stDate_));//date = 09/03/2016
        stDate = formatter.parse(formatter.format(stDate));
        Date enDate = new Date(Long.parseLong(enDate_));//date = 31/03/2016
        enDate = formatter.parse(formatter.format(enDate));
        Project project = new Project();
        project.setProjectCode(name);
        project.setProjectName(code);
        project.setProjectCost(cost);
        project.setDateStart(stDate);
        project.setDateEnd(enDate);
        project.persist();

        ProjectManager pjm = new ProjectManager();
        pjm.setEmpCode(pm);
        pjm.setProject(project);
        pjm.persist();
    }

    public void dateTest  (long dateLong,String json,String stDatefrom,String stDateTo,String fnDateFrom,String fnDateTo,String costFrom,String costTo,String pm)throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/projects/findProjectSearchData")
                .param("StDateBegin",stDatefrom)
                .param("StDateEnd",stDateTo)
                .param("FnDateBegin",fnDateFrom)
                .param("FnDateEnd",fnDateTo)
                .param("costStart",costFrom)
                .param("costEnd",costTo)
                .param("projectManage",pm)
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath(json, is(dateLong)))
                .andReturn()
                ;
    }

    public void dataTest  (int dataJson,String json,String stDatefrom,String stDateTo,String fnDateFrom,String fnDateTo,String costFrom,String costTo,String pm)throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/projects/findProjectSearchData")
                .param("StDateBegin",stDatefrom)
                .param("StDateEnd",stDateTo)
                .param("FnDateBegin",fnDateFrom)
                .param("FnDateEnd",fnDateTo)
                .param("costStart",costFrom)
                .param("costEnd",costTo)
                .param("projectManage",pm)
                .param("maxResult","15")
                .param("firstResult","0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath(json, is(dataJson)))
                .andReturn()
                ;
    }

    @Test
    public void selectWhereStDateFrom () throws Exception{
        selectProjectReturnLong(1457456400000L,"$[0].dateStart","1457456400000","","","","","","");//date = 09/03/2016
    }
    @Test
    public void selectWhereStDateTo () throws Exception{
        selectProjectReturnLong(1457456400000L,"$[0].dateStart","","1458061200000","","","","","");//date = 16/03/2016
    }
    @Test
    public void selectWhereStDateFrom_StDateTo () throws Exception{
        selectProjectReturnLong(1457456400000L,"$[0].dateStart","1457456400000","1458061200000","","","","","");//date = 09/03/2016 - 16/03/2016
    }
    @Test
    public void selectWhereEnDateFrom () throws Exception{
        selectProjectReturnLong(1459357200000L,"$[0].dateEnd","","","1459357200000","","","","");//date = 31/03/2016
    }
    @Test
    public void selectWhereEnDateTo () throws Exception{
        selectProjectReturnLong(1458061200000L,"$[0].dateEnd","","","","1458061200000","","","");//date = 16/03/2016
    }
    @Test
    public void selectWhereEnDateFrom_EnDateTo () throws Exception{
        selectProjectReturnLong(1458061200000L,"$[0].dateEnd","","","1457456400000","1458061200000","","","");//date = 09/03/2016 - 16/03/2016
    }
    @Test
    public void selectWhereCostFrom () throws Exception{
        selectProjectReturnInt(20,"$[0].projectCost","","","","","20","","");
    }
    @Test
    public void selectWhereCostTo () throws Exception{
        selectProjectReturnInt(30,"$[1].projectCost","","","","","","30","");
    }
    @Test
    public void selectWhereCostFrom_CostTo () throws Exception{
        selectProjectReturnInt(30,"$[0].projectCost","","","","","30","31","");
    }
    @Test
    public void selectWherePm () throws Exception{
        selectProjectReturnInt(30,"$[0].projectCost","","","","","","","PM2");
    }
    ////////////////////////////////
    @Test
    public void checkModule() throws Exception{

        MvcResult mvcResult = this.mockMvc.perform(get("/moduleprojects/findProjectCheckID")
                .param("projectId", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn()
                ;
        assertEquals(mvcResult.getResponse().getContentAsString(),"[]");

    }
    ////////////////////////////////
    @Test
    public void deleteProject() throws Exception{

        MvcResult mvcResult = this.mockMvc.perform(get("/projects/deleteProjects")
                .param("deleteCode", "4")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn()
                ;

        selectAll();
    }
    public void selectAll ()throws Exception{
        selectProjectReturnLong(1457456400000L,"$[0].dateStart","","","","","","","");//date = 09/03/2016
    }


}
