// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.domain.pjm.ProjectDataOnDemand;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.stereotype.Component;

privileged aspect ProjectDataOnDemand_Roo_DataOnDemand {
    
    declare @type: ProjectDataOnDemand: @Component;
    
    private Random ProjectDataOnDemand.rnd = new SecureRandom();
    
    private List<Project> ProjectDataOnDemand.data;
    
    public Project ProjectDataOnDemand.getNewTransientProject(int index) {
        Project obj = new Project();
        setCreatedBy(obj, index);
        setCreatedDate(obj, index);
        setDateEnd(obj, index);
        setDateStart(obj, index);
        setProjectCode(obj, index);
        setProjectCost(obj, index);
        setProjectName(obj, index);
        setStatus(obj, index);
        setUpdatedBy(obj, index);
        setUpdatedDate(obj, index);
        return obj;
    }
    
    public void ProjectDataOnDemand.setCreatedBy(Project obj, int index) {
        String createdBy = "createdBy_" + index;
        obj.setCreatedBy(createdBy);
    }
    
    public void ProjectDataOnDemand.setCreatedDate(Project obj, int index) {
        Date createdDate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setCreatedDate(createdDate);
    }
    
    public void ProjectDataOnDemand.setDateEnd(Project obj, int index) {
        Date dateEnd = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setDateEnd(dateEnd);
    }
    
    public void ProjectDataOnDemand.setDateStart(Project obj, int index) {
        Date dateStart = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setDateStart(dateStart);
    }
    
    public void ProjectDataOnDemand.setProjectCode(Project obj, int index) {
        String projectCode = "projectCode_" + index;
        obj.setProjectCode(projectCode);
    }
    
    public void ProjectDataOnDemand.setProjectCost(Project obj, int index) {
        Double projectCost = new Integer(index).doubleValue();
        obj.setProjectCost(projectCost);
    }
    
    public void ProjectDataOnDemand.setProjectName(Project obj, int index) {
        String projectName = "projectName_" + index;
        obj.setProjectName(projectName);
    }
    
    public void ProjectDataOnDemand.setStatus(Project obj, int index) {
        String status = "status_" + index;
        obj.setStatus(status);
    }
    
    public void ProjectDataOnDemand.setUpdatedBy(Project obj, int index) {
        String updatedBy = "updatedBy_" + index;
        obj.setUpdatedBy(updatedBy);
    }
    
    public void ProjectDataOnDemand.setUpdatedDate(Project obj, int index) {
        Date updatedDate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setUpdatedDate(updatedDate);
    }
    
    public Project ProjectDataOnDemand.getSpecificProject(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Project obj = data.get(index);
        Long id = obj.getId();
        return Project.findProject(id);
    }
    
    public Project ProjectDataOnDemand.getRandomProject() {
        init();
        Project obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return Project.findProject(id);
    }
    
    public boolean ProjectDataOnDemand.modifyProject(Project obj) {
        return false;
    }
    
    public void ProjectDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = Project.findProjectEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Project' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Project>();
        for (int i = 0; i < 10; i++) {
            Project obj = getNewTransientProject(i);
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
            data.add(obj);
        }
    }
    
}
