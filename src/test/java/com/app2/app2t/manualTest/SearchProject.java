
package com.app2.app2t.manualtest;

import com.app2.app2t.domain.pjm.ModuleManager;
import com.app2.app2t.domain.pjm.ModuleProject;
import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.domain.pjm.ProjectManager;
import com.app2.app2t.util.AuthorizeUtil;
        import org.junit.After;
        import org.junit.Assert;
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

        import java.text.SimpleDateFormat;
        import java.util.Date;

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
        public class SearchProject {

            private Logger LOGGER = LoggerFactory.getLogger(SearchProject.class);
            @Autowired
            protected WebApplicationContext wac;
            protected MockMvc mockMvc;

            public void insertDataTodateBase (String stDate_,String enDate_,String pm,String name,String code,double cost)throws Exception{
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
                        .param("moduleManager","")
                ).andDo(print())
                        .andExpect(status().isOk())
                        .andExpect(content().contentType("application/json;charset=UTF-8"))
                        .andExpect(jsonPath(json, is(dateLong)))
                        .andReturn()
                        ;
            }
            public void dataTestReturnInt  (double dataJson,String json,String stDatefrom,String stDateTo,String fnDateFrom,String fnDateTo,String costFrom,String costTo,String pm)throws Exception{
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
                        .param("moduleManager","")
                ).andDo(print())
                        .andExpect(status().isOk())
                        .andExpect(content().contentType("application/json;charset=UTF-8"))
                        .andExpect(jsonPath(json, is(dataJson)))
                        .andReturn()
                        ;
            }
            public void dataTestReturnString  (String dataJson,String json,String stDatefrom,String stDateTo,String fnDateFrom,String fnDateTo,String costFrom,String costTo,String pm)throws Exception{
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
                        .param("moduleManager","")
                ).andDo(print())
                        .andExpect(status().isOk())
                        .andExpect(content().contentType("application/json;charset=UTF-8"))
                        .andExpect(jsonPath(json, is(dataJson)))
                        .andReturn()
                        ;
            }
            public void dataTestReturnIsEmpty  (String dataJson, String json, String stDatefrom, String stDateTo, String fnDateFrom, String fnDateTo, String costFrom, String costTo, String pm)throws Exception{
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
                        .param("moduleManager","")
                ).andDo(print())
                        .andExpect(status().isOk())
                        .andExpect(content().contentType("application/json;charset=UTF-8"))
                        .andReturn()
                        ;
                assertEquals(mvcResult.getResponse().getContentAsString(),dataJson);
            }
            @Before
            public void setup()throws Exception
            {
                this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
                AuthorizeUtil.setUserName("admin");
                insertDataTodateBase("1457456400000","1459357200000","EM001","PT01","ProjectTest1",20.0);//date 09/03/2016 - 31/03/2016
                insertDataTodateBase("1457456400000","1458061200000","EM002","PT02","ProjectTest2",30.0);//date 09/03/2016 - 16/03/2016
                insertDataTodateBase("1457456400000","1459357200000","EM003","PT03","ProjectTest3",20.0);//date 09/03/2016 - 31/03/2016
                insertDataTodateBase("1457456400000","1458061200000","EM004","PT04","ProjectTest4",30.0);//date 09/03/2016 - 16/03/2016
                insertDataTodateBase("1457456400000","1459357200000","EM005","PT05","ProjectTest5",25.0);//date 09/03/2016 - 31/03/2016
            }
            @After
            public void logger()throws Exception{
                LOGGER.debug("****************************************************************************************************");
            }
            public void selectProjectReturnLong(long dateLong,String json,String stDatefrom,String stDate_To,String fnDateFrom,String fnDateTo,String costFrom,String costTo,String pm) throws Exception{
                dateTest(dateLong,json,stDatefrom,stDate_To,fnDateFrom,fnDateTo,costFrom,costTo,pm);
            }
            public void selectProjectReturnInt(double dateLong,String json,String stDatefrom,String stDate_To,String fnDateFrom,String fnDateTo,String costFrom,String costTo,String pm) throws Exception{
                dataTestReturnInt(dateLong,json,stDatefrom,stDate_To,fnDateFrom,fnDateTo,costFrom,costTo,pm);
            }
            public void selectProjectReturnString(String  data,String json,String stDatefrom,String stDate_To,String fnDateFrom,String fnDateTo,String costFrom,String costTo,String pm) throws Exception{
                dataTestReturnString(data,json,stDatefrom,stDate_To,fnDateFrom,fnDateTo,costFrom,costTo,pm);
            }
            public void selectProjectReturnEmpty(String data,String json,String stDatefrom,String stDate_To,String fnDateFrom,String fnDateTo,String costFrom,String costTo,String pm) throws Exception{
                dataTestReturnIsEmpty(data,json,stDatefrom,stDate_To,fnDateFrom,fnDateTo,costFrom,costTo,pm);
    }
    @Test
    public void selectWhereStar () throws Exception{
        selectProjectReturnLong(1457456400000L,"$[4].dateStart","","","","","","","");
    }
    @Test
    public void selectWhereStDateFrom_StDateTo_EnDateFrom_EnDateTo () throws Exception{
        selectProjectReturnString("ProjectTest4","$[1].projectName","1457456400000","1458061200000","1458061200000","1458061200000","","","");//Stdate = 09/03/2016-16/03/2016 Endate 16/03/2016-16/03/2016
    }
    @Test
    public void selectWhereStDateFrom_StDateTo_EnDateFrom_EnDateTo_CostFrom_Pm () throws Exception{
        selectProjectReturnString("ProjectTest4","$[0].projectName","1457456400000","1458061200000","1458061200000","1458061200000","30","","EM004");//Stdate = 09/03/2016-16/03/2016 Endate 16/03/2016-16/03/2016
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
    public void selectWhereStDateFrom_EnDateFrom () throws Exception{
        selectProjectReturnLong(1457456400000L,"$[1].dateStart","1457456400000","","1459357200000","","","","");//stdate = 09/03/2016  endate///31/03/2016
    }
    @Test
    public void selectWhereCostFrom () throws Exception{
        selectProjectReturnInt(20.0,"$[0].projectCost","","","","","20","","");
    }
    @Test
    public void selectWhereCostTo () throws Exception{
        selectProjectReturnInt(30.0,"$[1].projectCost","","","","","","30","");
    }
    @Test
    public void selectWhereCostFrom_CostTo () throws Exception{
        selectProjectReturnInt(30.0,"$[0].projectCost","","","","","30","31","");
    }
    @Test
    public void selectWhereStDateFrom_EnDateFrom_CostFrom () throws Exception{
        selectProjectReturnInt(25.0,"$[0].projectCost","1457456400000","","1459357200000","","25","","");//stdate = 09/03/2016  endate///31/03/2016
    }
    @Test
    public void selectWherePm () throws Exception{
        selectProjectReturnInt(30.0,"$[0].projectCost","","","","","","","EM002");
    }
    @Test
    public void selectWhereStDateFrom_EnDateFrom_CostFrom_Pm () throws Exception{
        selectProjectReturnInt(25.0,"$[0].projectCost","1457456400000","","1459357200000","","25","","EM005");//stdate = 09/03/2016  endate///31/03/2016
    }
    @Test
    public void selectWhereStDateFrom_EnDateFrom_CostFrom_Pm_isEmpty () throws Exception{
        selectProjectReturnEmpty("[]","$","1457456400000","","1459357200000","","25","","EM003");//stdate = 09/03/2016  endate///31/03/2016
    }
    @Test
    public void selectWherePm_isEmpty () throws Exception{
        selectProjectReturnEmpty("[]","$","","","","","","","PA");
    }
    @Test
    public void selectAllPaggingSize () throws Exception{
        MvcResult mvcResult =this.mockMvc.perform(get("/projects/projectPaggingSize")
                .param("StDateBegin","")
                .param("StDateEnd","")
                .param("FnDateBegin","")
                .param("FnDateEnd","")
                .param("costStart","")
                .param("costEnd","")
                .param("projectManage","")
                .param("maxResult","15")
                .param("firstResult","0")
                .param("moduleManager","")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size",is(5)))
                .andReturn()
                ;

    }
    @Test
    public void selectWherePmPaggingSize () throws Exception{
        MvcResult mvcResult =this.mockMvc.perform(get("/projects/projectPaggingSize")
                .param("StDateBegin","")
                .param("StDateEnd","")
                .param("FnDateBegin","")
                .param("FnDateEnd","")
                .param("costStart","")
                .param("costEnd","")
                .param("projectManage","EM002")
                .param("maxResult","15")
                .param("firstResult","0")
                .param("moduleManager","")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size",is(1)))
                .andReturn()
                ;

    }
    @Test
    public void selectWherePmPaggingSize_isEmpty () throws Exception{
        MvcResult mvcResult =this.mockMvc.perform(get("/projects/projectPaggingSize")
                .param("StDateBegin","")
                .param("StDateEnd","")
                .param("FnDateBegin","")
                .param("FnDateEnd","")
                .param("costStart","31.1")
                .param("costEnd","")
                .param("projectManage","")
                .param("maxResult","15")
                .param("firstResult","0")
                .param("moduleManager","")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size",is(0)))
                .andReturn()
                ;

    }
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
    @Test
    public void deleteProject() throws Exception{
//        Session session = (Session) Project.entityManager().getDelegate();
//        Criteria criteria = session.createCriteria(Project.class, "project");
//        DetachedCriteria subCriteria = DetachedCriteria.forClass(ProjectManager.class, "projectManager");
//        subCriteria.add(Restrictions.like("empCode", "%" + "EM004" + "%"));
//        subCriteria.setProjection(Projections.property("project"));
//        //----//
//        criteria.add(Subqueries.propertyIn("project.id", subCriteria));
//        List<Project> projectList = criteria.list();
//        Project project = projectList.get(0);
//        String id = project.getId().toString();
        this.mockMvc.perform(get("/projects/deleteProjects")
                .param("projectId", "1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn()
                ;
        MvcResult mvcResult =this.mockMvc.perform(get("/projects/findProjectSearchData")
                .param("StDateBegin","")
                .param("StDateEnd","")
                .param("FnDateBegin","")
                .param("FnDateEnd","")
                .param("costStart","")
                .param("costEnd","")
                .param("projectManage","EM001")
                .param("maxResult","15")
                .param("firstResult","0")
                .param("moduleManager","")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn()
                ;
        Assert.assertEquals(mvcResult.getResponse().getContentAsString(),"[]");

    }
    @Test
    public void checkRoleEditProjectUserAdmin () throws Exception{
    MvcResult mvcResult =this.mockMvc.perform(post("/projectmanagers/checkRolePmAndMm")
                        .param("projectId","1")
                ).andDo(print())
                        .andExpect(status().isOk())
                        .andExpect(content().contentType("application/json;charset=UTF-8"))
                        .andReturn()
                        ;
        Assert.assertEquals(mvcResult.getResponse().getContentAsString(),"true");
            }

            @Test
            public void checkRoleEditProjectUser58060 () throws Exception{
                MvcResult mvcResult =this.mockMvc.perform(post("/projectmanagers/checkRolePmAndMm")
                        .param("projectId","2")
                ).andDo(print())
                        .andExpect(status().isOk())
                        .andExpect(content().contentType("application/json;charset=UTF-8"))
                        .andReturn()
                        ;
                Assert.assertEquals(mvcResult.getResponse().getContentAsString(),"false");
            }

        }
