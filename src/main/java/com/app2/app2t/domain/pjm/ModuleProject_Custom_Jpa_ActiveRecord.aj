// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;




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
        moduleproject.setModuleStatus("Not Success");
        moduleproject.persist();
        return moduleproject;
    }

    public static List<ModuleProject> ModuleProject.findModuleByModuleCode(String moduleCode) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("moduleCode", moduleCode));
        return criteria.list();
    }

    public static List<ModuleProject> ModuleProject.findAllNameModuleByProjectCode(Project project) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("project", project));
        return criteria.list();
    }


    public static ModuleProject ModuleProject.editModuleProjectByModuleProjectCode(String moduleNeedEdit, String moduleCode,
           String moduleName, Integer moduleCost, Date dateStart, Date dateEnd    ) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("moduleCode", moduleNeedEdit));
        List<ModuleProject> result = criteria.list();
        ModuleProject moduleProject = result.get(0);
        moduleProject.setModuleCode(moduleCode);
        moduleProject.setModuleName(moduleName);
        moduleProject.setModuleCost(moduleCost);
        moduleProject.setDateEnd(dateStart);
        moduleProject.setDateEnd(dateEnd);
        moduleProject.merge();
        return moduleProject;
    }

    public static int ModuleProject.increseCostByModuleNameAndCodeProject(Project project,String codeModuleProject,Integer costIncrese) {
        int totalCost = 0 ;
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("project", project));
        criteria.add(Restrictions.eq("moduleCode", codeModuleProject));
        List<ModuleProject> moduleProject = criteria.list();
        for(int i=0;i<moduleProject.size();i++) {
            ModuleProject editCostModuleProject = moduleProject.get(0);
            totalCost = editCostModuleProject.getModuleCost() + costIncrese;
            editCostModuleProject.setModuleCost(totalCost);
            editCostModuleProject.merge();
        }
        return totalCost;
    }

    public static int ModuleProject.findAllModuleCostByProject(Project project) {
        int totalCost = 0 ;
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("project", project));
        List<ModuleProject> moduleProject = criteria.list();
        for(int i=0;i<moduleProject.size();i++) {
            ModuleProject editCostModuleProject = moduleProject.get(i);
            totalCost += editCostModuleProject.getModuleCost();
        }
        return totalCost;
    }
    public static List<ModuleProject> ModuleProject.findProjectBymoduleProjectAll() {
         EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        return criteria.list();
     }

    public static List<ModuleProject> ModuleProject.findProjectCheckID(long projectId) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class,"moDuleProject");
        criteria.createAlias("moDuleProject.project","project");

        try
        {
            criteria.add(Restrictions.eq("project.id", projectId));
            List<ModuleProject> moduleProject = criteria.list();
            for(int i=0 ; moduleProject.size() > i ;i++ ){
                ModuleProject moduleProject1 = moduleProject.get(i);
                LOGGER.error(">>>>>>>>>>>><<<<<[} :" +moduleProject1);
            }

            return criteria.list();
        }
        catch (Exception e) {
            System.out.print(">>>>>>>>>>>>>>>>>>>>>>>."+e);
            return criteria.list();
        }

    }


}
