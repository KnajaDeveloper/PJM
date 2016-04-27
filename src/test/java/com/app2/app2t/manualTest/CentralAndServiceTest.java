package com.app2.app2t.manualtest;

import com.app2.app2t.util.AuthorizeUtil;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@Transactional
@ContextConfiguration({"classpath:META-INF/spring/applicationContext*.xml", "file:src/main/webapp/WEB-INF/spring/webmvc-config.xml"})
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class CentralAndServiceTest {

    private Logger LOGGER = LoggerFactory.getLogger(CentralAndServiceTest.class);

    @Autowired
    protected WebApplicationContext wac;
    protected MockMvc mockMvc;

    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        AuthorizeUtil.setUserName("admin");
    }

    @Test
    public void findAllEmployeeByEmpCodeArray() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/central/findAllEmployeeByEmpCodeArray")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].empCode", is("EM001")))
                .andExpect(jsonPath("$[2].empCode", is("EM003")))
                .andReturn();
    }

    @Test
    public void findEmployeeByEmpCodeArray() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/central/findEmployeeByEmpCodeArray")
                .param("empCode", "EM001==EM002")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].empCode", is("EM001")))
                .andExpect(jsonPath("$[1].empCode", is("EM002")))
                .andReturn();
    }

    @Test
    public void findTeamAll() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/central/findTeamAll")
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].teamCode", is("T001")))
                .andExpect(jsonPath("$[1].teamCode", is("T002")))
                .andReturn();
    }
}

