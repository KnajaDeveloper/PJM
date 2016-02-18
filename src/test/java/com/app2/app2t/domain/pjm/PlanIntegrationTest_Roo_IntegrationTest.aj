// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import com.app2.app2t.domain.pjm.Plan;
import com.app2.app2t.domain.pjm.PlanDataOnDemand;
import com.app2.app2t.domain.pjm.PlanIntegrationTest;
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

privileged aspect PlanIntegrationTest_Roo_IntegrationTest {
    
    declare @type: PlanIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: PlanIntegrationTest: @ContextConfiguration(locations = "classpath*:/META-INF/spring/applicationContext*.xml");
    
    declare @type: PlanIntegrationTest: @Transactional;
    
    @Autowired
    PlanDataOnDemand PlanIntegrationTest.dod;
    
    @Test
    public void PlanIntegrationTest.testCountPlans() {
        Assert.assertNotNull("Data on demand for 'Plan' failed to initialize correctly", dod.getRandomPlan());
        long count = Plan.countPlans();
        Assert.assertTrue("Counter for 'Plan' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void PlanIntegrationTest.testFindPlan() {
        Plan obj = dod.getRandomPlan();
        Assert.assertNotNull("Data on demand for 'Plan' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Plan' failed to provide an identifier", id);
        obj = Plan.findPlan(id);
        Assert.assertNotNull("Find method for 'Plan' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'Plan' returned the incorrect identifier", id, obj.getId());
    }
    
    @Test
    public void PlanIntegrationTest.testFindAllPlans() {
        Assert.assertNotNull("Data on demand for 'Plan' failed to initialize correctly", dod.getRandomPlan());
        long count = Plan.countPlans();
        Assert.assertTrue("Too expensive to perform a find all test for 'Plan', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<Plan> result = Plan.findAllPlans();
        Assert.assertNotNull("Find all method for 'Plan' illegally returned null", result);
        Assert.assertTrue("Find all method for 'Plan' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void PlanIntegrationTest.testFindPlanEntries() {
        Assert.assertNotNull("Data on demand for 'Plan' failed to initialize correctly", dod.getRandomPlan());
        long count = Plan.countPlans();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<Plan> result = Plan.findPlanEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'Plan' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'Plan' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void PlanIntegrationTest.testFlush() {
        Plan obj = dod.getRandomPlan();
        Assert.assertNotNull("Data on demand for 'Plan' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Plan' failed to provide an identifier", id);
        obj = Plan.findPlan(id);
        Assert.assertNotNull("Find method for 'Plan' illegally returned null for id '" + id + "'", obj);
        boolean modified =  dod.modifyPlan(obj);
        Integer currentVersion = obj.getVersion();
        obj.flush();
        Assert.assertTrue("Version for 'Plan' failed to increment on flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void PlanIntegrationTest.testMergeUpdate() {
        Plan obj = dod.getRandomPlan();
        Assert.assertNotNull("Data on demand for 'Plan' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Plan' failed to provide an identifier", id);
        obj = Plan.findPlan(id);
        boolean modified =  dod.modifyPlan(obj);
        Integer currentVersion = obj.getVersion();
        Plan merged = (Plan)obj.merge();
        obj.flush();
        Assert.assertEquals("Identifier of merged object not the same as identifier of original object", merged.getId(), id);
        Assert.assertTrue("Version for 'Plan' failed to increment on merge and flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void PlanIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'Plan' failed to initialize correctly", dod.getRandomPlan());
        Plan obj = dod.getNewTransientPlan(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'Plan' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'Plan' identifier to be null", obj.getId());
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
        Assert.assertNotNull("Expected 'Plan' identifier to no longer be null", obj.getId());
    }
    
    @Test
    public void PlanIntegrationTest.testRemove() {
        Plan obj = dod.getRandomPlan();
        Assert.assertNotNull("Data on demand for 'Plan' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Plan' failed to provide an identifier", id);
        obj = Plan.findPlan(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'Plan' with identifier '" + id + "'", Plan.findPlan(id));
    }
    
}