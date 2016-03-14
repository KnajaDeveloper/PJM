package ManualTest;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = "classpath*:/META-INF/spring/applicationContext*.xml")
public class ProjectTest {

    private Logger LOGGER = LoggerFactory.getLogger(ProjectTest.class);

    @Test
    public void firstTest(){
        int i = 0;
        i+=1;
        Assert.assertEquals(1,i);
    }
}
