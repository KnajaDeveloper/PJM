// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import com.app2.app2t.domain.pjm.FollowerTask;
import com.app2.app2t.domain.pjm.FollowerTaskDataOnDemand;
import com.app2.app2t.domain.pjm.FollowerTaskIntegrationTest;
import java.util.Iterator;
import java.util.List;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

privileged aspect FollowerTaskIntegrationTest_Roo_IntegrationTest {
    
    declare @type: FollowerTaskIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: FollowerTaskIntegrationTest: @ContextConfiguration(locations = "classpath*:/META-INF/spring/applicationContext*.xml");
    
    declare @type: FollowerTaskIntegrationTest: @Transactional;
    
    @Autowired
    FollowerTaskDataOnDemand FollowerTaskIntegrationTest.dod;
    
    @Test
    public void FollowerTaskIntegrationTest.testCountFollowerTasks() {
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to initialize correctly", dod.getRandomFollowerTask());
        long count = FollowerTask.countFollowerTasks();
        Assert.assertTrue("Counter for 'FollowerTask' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void FollowerTaskIntegrationTest.testFindFollowerTask() {
        FollowerTask obj = dod.getRandomFollowerTask();
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to provide an identifier", id);
        obj = FollowerTask.findFollowerTask(id);
        Assert.assertNotNull("Find method for 'FollowerTask' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'FollowerTask' returned the incorrect identifier", id, obj.getId());
    }
    
    @Test
    public void FollowerTaskIntegrationTest.testFindAllFollowerTasks() {
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to initialize correctly", dod.getRandomFollowerTask());
        long count = FollowerTask.countFollowerTasks();
        Assert.assertTrue("Too expensive to perform a find all test for 'FollowerTask', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<FollowerTask> result = FollowerTask.findAllFollowerTasks();
        Assert.assertNotNull("Find all method for 'FollowerTask' illegally returned null", result);
        Assert.assertTrue("Find all method for 'FollowerTask' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void FollowerTaskIntegrationTest.testFindFollowerTaskEntries() {
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to initialize correctly", dod.getRandomFollowerTask());
        long count = FollowerTask.countFollowerTasks();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<FollowerTask> result = FollowerTask.findFollowerTaskEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'FollowerTask' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'FollowerTask' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void FollowerTaskIntegrationTest.testFlush() {
        FollowerTask obj = dod.getRandomFollowerTask();
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to provide an identifier", id);
        obj = FollowerTask.findFollowerTask(id);
        Assert.assertNotNull("Find method for 'FollowerTask' illegally returned null for id '" + id + "'", obj);
        boolean modified =  dod.modifyFollowerTask(obj);
        Integer currentVersion = obj.getVersion();
        obj.flush();
        Assert.assertTrue("Version for 'FollowerTask' failed to increment on flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void FollowerTaskIntegrationTest.testMergeUpdate() {
        FollowerTask obj = dod.getRandomFollowerTask();
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to provide an identifier", id);
        obj = FollowerTask.findFollowerTask(id);
        boolean modified =  dod.modifyFollowerTask(obj);
        Integer currentVersion = obj.getVersion();
        FollowerTask merged = (FollowerTask)obj.merge();
        obj.flush();
        Assert.assertEquals("Identifier of merged object not the same as identifier of original object", merged.getId(), id);
        Assert.assertTrue("Version for 'FollowerTask' failed to increment on merge and flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void FollowerTaskIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to initialize correctly", dod.getRandomFollowerTask());
        FollowerTask obj = dod.getNewTransientFollowerTask(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'FollowerTask' identifier to be null", obj.getId());
        try {
            obj.persist();
        } catch (final ConstraintViolationException e) {
            final StringBuilder msg = new StringBuilder();
            for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                final ConstraintViolation<?> cv = iter.next();
                msg.append("[").append(cv.getRootBean().getClass().getName()).append(".").append(cv.getPropertyPath()).append(": ").append(cv.getMessage()).append(" (invalid value = ").append(cv.getInvalidValue()).append(")").append("]");
            }
            throw new IllegalStateException(msg.toString(), e);
        }
        obj.flush();
        Assert.assertNotNull("Expected 'FollowerTask' identifier to no longer be null", obj.getId());
    }
    
    @Test
    public void FollowerTaskIntegrationTest.testRemove() {
        FollowerTask obj = dod.getRandomFollowerTask();
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'FollowerTask' failed to provide an identifier", id);
        obj = FollowerTask.findFollowerTask(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'FollowerTask' with identifier '" + id + "'", FollowerTask.findFollowerTask(id));
    }
    
}
