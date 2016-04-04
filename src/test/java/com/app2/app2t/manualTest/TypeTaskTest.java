package com.app2.app2t.manualtest;

import com.app2.app2t.domain.pjm.OtherTask;
import com.app2.app2t.domain.pjm.Task;
import com.app2.app2t.domain.pjm.TypeTask;
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

import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
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


       TypeTask typeTask1 =  insertDataTodateBaseTypeTask("001","TypeTask1");
        TypeTask typeTask2 = insertDataTodateBaseTypeTask("002","TypeTask2");
        TypeTask typeTask3 = insertDataTodateBaseTypeTask("003","TypeTask3");
        TypeTask typeTask4 = insertDataTodateBaseTypeTask("004","TypeTask4");
        insertDataTodateBaseTypeTask("005","TypeTask5");
        insertDataTodateBaseTypeTask("006","TypeTask6");
        insertDataTodateBaseTypeTask("007","TypeTask7");
        insertDataTodateBaseTask(typeTask1);
        insertDataTodateBaseTask(typeTask2);
        insertDataTodateBaseOtherTask (typeTask3);
        insertDataTodateBaseOtherTask(typeTask4);

    }

    @After
    public void log()throws Exception{
        LOGGER.debug("----------------------------------After---------------------------------------");
    }

    public TypeTask insertDataTodateBaseTypeTask (String typeTaskCode,String typeTaskName)throws Exception{

        TypeTask typeTask = new TypeTask();
        typeTask.setTypeTaskCode(typeTaskCode);
        typeTask.setTypeTaskName(typeTaskName);
        typeTask.persist();
        return typeTask;
    }

    public void insertDataTodateBaseTask (TypeTask typeTaskId)throws Exception{

        Task task = new Task();
        task.setTypeTask(typeTaskId);
        task.persist();

    }

    public void insertDataTodateBaseOtherTask (TypeTask typeTaskId)throws Exception{
        OtherTask otherTask = new OtherTask();
        otherTask.setTypeTask(typeTaskId);
        otherTask.persist();
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
//        EntityManager ent = TypeTask.entityManager();
//        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
//        criteria.add(Restrictions.eq("typeTaskCode", "007"));
//        List<TypeTask> result = criteria.list();

        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/deleteAllProject")
                .param("typetaskID","7")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
        selectAll();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void editTest()throws Exception{
//        EntityManager ent = TypeTask.entityManager();
//        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
//        criteria.add(Restrictions.eq("typeTaskCode", "001"));
//        List<TypeTask> result = criteria.list();

        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/editAllProject")
                //"maxResult" ตรงกับ RequestParam
                .param("editTypeID","1")
                .param("editTypeName","1")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void selectAllpaggingSize ()throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingSize")
                .param("findTypeCode", "")
                .param("findTypeName", "")
                .param("maxResult", "15")
                .param("firstResult", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(7)))
                .andReturn();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void selectAllpaggingSizeByTypeCode ()throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingSize")
                .param("findTypeCode", "00")
                .param("findTypeName", "")
                .param("maxResult", "15")
                .param("firstResult", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(7)))
                .andReturn();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void selectAllpaggingSizeByTypeName ()throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingSize")
                .param("findTypeCode", "")
                .param("findTypeName", "Type")
                .param("maxResult", "15")
                .param("firstResult", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(7)))
                .andReturn();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void selectAllpaggingSizeByTypeCodeTypeName ()throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingSize")
                .param("findTypeCode", "00")
                .param("findTypeName", "Type")
                .param("maxResult", "15")
                .param("firstResult", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(7)))
                .andReturn();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void selectTypeCodePaggingSize ()throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingSize")
                .param("findTypeCode", "001")
                .param("findTypeName", "")
                .param("maxResult", "15")
                .param("firstResult", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(1)))
                .andReturn();
    }

//----------------------------------------------------------------------------------------------------

    @Test
    public void selectTypeNamePaggingSize ()throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingSize")
                .param("findTypeCode", "")
                .param("findTypeName", "TypeTask1")
                .param("maxResult", "15")
                .param("firstResult", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(1)))
                .andReturn();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void selectTypeCodeTypeNamePaggingSize ()throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingSize")
                .param("findTypeCode", "001")
                .param("findTypeName", "TypeTask1")
                .param("maxResult", "15")
                .param("firstResult", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(1)))
                .andReturn();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void selectTypeCodePaggingSizeIsEmpty ()throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingSize")
                .param("findTypeCode", "X")
                .param("findTypeName", "")
                .param("maxResult", "15")
                .param("firstResult", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(0)))
                .andReturn();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void selectTypeNamePaggingSizeIsEmpty ()throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingSize")
                .param("findTypeCode", "")
                .param("findTypeName", "X")
                .param("maxResult", "15")
                .param("firstResult", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(0)))
                .andReturn();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void selectTypeCodeTypeNamePaggingSizeIsEmpty ()throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingSize")
                .param("findTypeCode", "X")
                .param("findTypeName", "X")
                .param("maxResult", "15")
                .param("firstResult", "0")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.size", is(0)))
                .andReturn();
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void checkData()throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/checkAllProject")
                .param("checkTypeCode","001")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andReturn();
        Assert.assertNotEquals(mvcResult.getResponse().getContentAsString(),"[]");
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void checkInUseTask () throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingData")
                .param("findTypeCode", "001")
                .param("findTypeName", "")
                .param("firstResult","0")
                .param("maxResult","15")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].inUseTask", is(1)))
                .andReturn();
        LOGGER.debug("-------------------------InuseTask");
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void checkInUseOtherTask () throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingData")
                .param("findTypeCode", "003")
                .param("findTypeName", "")
                .param("firstResult","0")
                .param("maxResult","15")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].inUseOtherTask", is(1)))
                .andReturn();
        LOGGER.debug("-------------------------InuseOtherTask");
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void checkInUseTaskIsEmpty () throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingData")
                .param("findTypeCode", "005")
                .param("findTypeName", "")
                .param("firstResult","0")
                .param("maxResult","15")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].inUseTask", is(0)))
                .andReturn();
        LOGGER.debug("-------------------------InuseTaskIsEmpty");
    }

    //----------------------------------------------------------------------------------------------------

    @Test
    public void checkInUseOtherTaskIsEmpty () throws Exception{
        MvcResult mvcResult = this.mockMvc.perform(get("/typetasks/testPaggingData")
                .param("findTypeCode", "006")
                .param("findTypeName", "")
                .param("firstResult","0")
                .param("maxResult","15")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$[0].inUseOtherTask", is(0)))
                .andReturn();
        LOGGER.debug("-------------------------InuseOtherTaskIsEmpty");
    }
}
