// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import com.app2.app2t.domain.pjm.ModuleManager;
import com.app2.app2t.domain.pjm.ModuleManagerDataOnDemand;
import com.app2.app2t.domain.pjm.ModuleProjectDataOnDemand;
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

privileged aspect ModuleManagerDataOnDemand_Roo_DataOnDemand {
    
    declare @type: ModuleManagerDataOnDemand: @Component;
    
    private Random ModuleManagerDataOnDemand.rnd = new SecureRandom();
    
    private List<ModuleManager> ModuleManagerDataOnDemand.data;
    
    @Autowired
    ModuleProjectDataOnDemand ModuleManagerDataOnDemand.moduleProjectDataOnDemand;
    
    public ModuleManager ModuleManagerDataOnDemand.getNewTransientModuleManager(int index) {
        ModuleManager obj = new ModuleManager();
        setCreatedBy(obj, index);
        setCreatedDate(obj, index);
        setEmpCode(obj, index);
        setStatus(obj, index);
        setUpdatedBy(obj, index);
        setUpdatedDate(obj, index);
        return obj;
    }
    
    public void ModuleManagerDataOnDemand.setCreatedBy(ModuleManager obj, int index) {
        String createdBy = "createdBy_" + index;
        obj.setCreatedBy(createdBy);
    }
    
    public void ModuleManagerDataOnDemand.setCreatedDate(ModuleManager obj, int index) {
        Date createdDate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setCreatedDate(createdDate);
    }
    
    public void ModuleManagerDataOnDemand.setEmpCode(ModuleManager obj, int index) {
        String empCode = "empCode_" + index;
        if (empCode.length() > 15) {
            empCode = empCode.substring(0, 15);
        }
        obj.setEmpCode(empCode);
    }
    
    public void ModuleManagerDataOnDemand.setStatus(ModuleManager obj, int index) {
        String status = "status_" + index;
        obj.setStatus(status);
    }
    
    public void ModuleManagerDataOnDemand.setUpdatedBy(ModuleManager obj, int index) {
        String updatedBy = "updatedBy_" + index;
        obj.setUpdatedBy(updatedBy);
    }
    
    public void ModuleManagerDataOnDemand.setUpdatedDate(ModuleManager obj, int index) {
        Date updatedDate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setUpdatedDate(updatedDate);
    }
    
    public ModuleManager ModuleManagerDataOnDemand.getSpecificModuleManager(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        ModuleManager obj = data.get(index);
        Long id = obj.getId();
        return ModuleManager.findModuleManager(id);
    }
    
    public ModuleManager ModuleManagerDataOnDemand.getRandomModuleManager() {
        init();
        ModuleManager obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return ModuleManager.findModuleManager(id);
    }
    
    public boolean ModuleManagerDataOnDemand.modifyModuleManager(ModuleManager obj) {
        return false;
    }
    
    public void ModuleManagerDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = ModuleManager.findModuleManagerEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'ModuleManager' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<ModuleManager>();
        for (int i = 0; i < 10; i++) {
            ModuleManager obj = getNewTransientModuleManager(i);
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
