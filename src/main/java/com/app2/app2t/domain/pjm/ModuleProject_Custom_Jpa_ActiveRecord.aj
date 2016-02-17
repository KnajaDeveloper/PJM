// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import com.app2.app2t.domain.pjm.ModuleProject;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import javax.persistence.EntityManager;

privileged aspect ModuleProject_Custom_Jpa_ActiveRecord {
    protected static Logger LOGGER = LoggerFactory.getLogger(ModuleProject_Custom_Jpa_ActiveRecord.class);
    
    public static ModuleProject ModuleProject.saveModuleProject(String moduleCode, String moduleName, Integer moduleCost
            , Date dateStart, Date dateEnd, Project project) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        ModuleProject moduleproject = new ModuleProject();
        moduleproject.setModuleCode(moduleCode);
        moduleproject.setModuleName(moduleName);
        moduleproject.setModuleCost(moduleCost);
        moduleproject.setDateStart(dateStart);
        moduleproject.setDateEnd(dateEnd);
        moduleproject.setProject(project);
        moduleproject.persist();
        return moduleproject;
    }
    
}
