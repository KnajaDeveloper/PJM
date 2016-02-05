// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import com.app2.app2t.domain.pjm.ProjectDataOnDemand;
import com.app2.app2t.domain.pjm.ProjectManager;
import com.app2.app2t.domain.pjm.ProjectManagerDataOnDemand;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

privileged aspect ProjectManagerDataOnDemand_Roo_DataOnDemand {
    
    declare @type: ProjectManagerDataOnDemand: @Component;
    
    private Random ProjectManagerDataOnDemand.rnd = new SecureRandom();
    
    private List<ProjectManager> ProjectManagerDataOnDemand.data;
    
    @Autowired
    ProjectDataOnDemand ProjectManagerDataOnDemand.projectDataOnDemand;
    
    public ProjectManager ProjectManagerDataOnDemand.getNewTransientProjectManager(int index) {
        ProjectManager obj = new ProjectManager();
        setCreatedBy(obj, index);
        setCreatedDate(obj, index);
        setEmpCode(obj, index);
        setStatus(obj, index);
        setUpdatedBy(obj, index);
        setUpdatedDate(obj, index);
        return obj;
    }
    
    public void ProjectManagerDataOnDemand.setCreatedBy(ProjectManager obj, int index) {
        String createdBy = "createdBy_" + index;
        obj.setCreatedBy(createdBy);
    }
    
    public void ProjectManagerDataOnDemand.setCreatedDate(ProjectManager obj, int index) {
        Date createdDate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setCreatedDate(createdDate);
    }
    
    public void ProjectManagerDataOnDemand.setEmpCode(ProjectManager obj, int index) {
        String empCode = "empCode_" + index;
        obj.setEmpCode(empCode);
    }
    
    public void ProjectManagerDataOnDemand.setStatus(ProjectManager obj, int index) {
        String status = "status_" + index;
        obj.setStatus(status);
    }
    
    public void ProjectManagerDataOnDemand.setUpdatedBy(ProjectManager obj, int index) {
        String updatedBy = "updatedBy_" + index;
        obj.setUpdatedBy(updatedBy);
    }
    
    public void ProjectManagerDataOnDemand.setUpdatedDate(ProjectManager obj, int index) {
        Date updatedDate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setUpdatedDate(updatedDate);
    }
    
    public ProjectManager ProjectManagerDataOnDemand.getSpecificProjectManager(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        ProjectManager obj = data.get(index);
        Long id = obj.getId();
        return ProjectManager.findProjectManager(id);
    }
    
    public ProjectManager ProjectManagerDataOnDemand.getRandomProjectManager() {
        init();
        ProjectManager obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return ProjectManager.findProjectManager(id);
    }
    
    public boolean ProjectManagerDataOnDemand.modifyProjectManager(ProjectManager obj) {
        return false;
    }
    
    public void ProjectManagerDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = ProjectManager.findProjectManagerEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'ProjectManager' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<ProjectManager>();
        for (int i = 0; i < 10; i++) {
            ProjectManager obj = getNewTransientProjectManager(i);
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
