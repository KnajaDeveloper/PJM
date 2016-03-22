package ManualTest;

import com.app2.app2t.domain.pjm.TypeTask;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
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

import javax.persistence.EntityManager;

import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@Transactional
@ContextConfiguration({"classpath:META-INF/spring/applicationContext*.xml", "file:src/main/webapp/WEB-INF/spring/webmvc-config.xml"})
public class TypeTaskTest {

    private Logger LOGGER = LoggerFactory.getLogger(TypeTaskTest.class);

    @Autowired
    protected WebApplicationContext wac;

    protected MockMvc mockMvc;

    @Before
    public void setup()throws Exception
    {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        insertDataTodateBase("001","TypeTask1");
        insertDataTodateBase("002","TypeTask2");
        insertDataTodateBase("003","TypeTask3");
        insertDataTodateBase("004","TypeTask4");
        insertDataTodateBase("005","TypeTask5");
        insertDataTodateBase("006","TypeTask6");
        insertDataTodateBase("007","TypeTask7");

    }

    public void insertDataTodateBase (String typeTaskCode,String typeTaskName)throws Exception{

        TypeTask typeTask = new TypeTask();
        typeTask.setTypeTaskCode(typeTaskCode);
        typeTask.setTypeTaskName(typeTaskName);
        typeTask.persist();

    }

//----------------------------------------------------------------------------------------------------

    public void searchTest(String typeTaskCode, String typeTaskName,String jsonPart1,String Ans1,String jsonPart2,String Ans2)throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingData")
                //"maxResult" ตรงกับ RequestParam
                .param("maxResult","15")
                .param("firstResult","0")
                .param("findTypeCode",typeTaskCode)
                .param("findTypeName",typeTaskName)
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                //-----------------------.typeTaskCode ใน map ใน Controller
                .andExpect(jsonPath(jsonPart1, is(Ans1)))
                .andExpect(jsonPath(jsonPart2, is(Ans2)))
                .andReturn();
    }

    @Test
    public void selectAll()throws Exception{
        searchTest("","","$[0].typeTaskCode","001","$[1].typeTaskCode","002");
    }

    @Test
    public void selectWhereTypeCode()throws Exception{
        searchTest("001","","$[0].typeTaskCode","001","$[0].typeTaskName","TypeTask1");
    }

    @Test
    public void selectWhereTypeCodeAndTypeName()throws Exception{
        searchTest("001","TypeTask1","$[0].typeTaskCode","001","$[0].typeTaskName","TypeTask1");
    }

    @Test
    public void selectWhereTypeName()throws Exception{
        searchTest("","TypeTask1","$[0].typeTaskCode","001","$[0].typeTaskName","TypeTask1");
    }



    //----------------------------------------------------------------------------------------------------

    @Test
    public void deleteTest()throws Exception{
        EntityManager ent = TypeTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
        criteria.add(Restrictions.eq("typeTaskCode", "007"));
        List<TypeTask> result = criteria.list();

        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/deleteAllProject")
                .param("typetaskID",result.get(0).getId().toString())
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
        selectAll();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void editTest()throws Exception{
        EntityManager ent = TypeTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
        criteria.add(Restrictions.eq("typeTaskCode", "001"));
        List<TypeTask> result = criteria.list();

        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/editAllProject")
                //"maxResult" ตรงกับ RequestParam
                .param("editTypeCode",result.get(0).getId().toString())
                .param("editTypeName","1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();

    }


}
