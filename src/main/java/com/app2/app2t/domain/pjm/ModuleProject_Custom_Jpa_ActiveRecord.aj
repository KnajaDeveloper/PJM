// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;




privileged aspect ModuleProject_Custom_Jpa_ActiveRecord {
    protected static Logger LOGGER = LoggerFactory.getLogger(ModuleProject_Custom_Jpa_ActiveRecord.class);
    
    public static ModuleProject ModuleProject.saveModuleProject(String moduleCode, String moduleName, Double moduleCost
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

    public static List<ModuleProject> ModuleProject.findAllNameModuleByProjectCode(Project project) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("project", project));
        return criteria.list();
    }

    public static List<ModuleProject> ModuleProject.findModuleByModuleCode(String moduleCode) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("moduleCode", moduleCode));
        return criteria.list();
     }

    public static ModuleProject ModuleProject.editModuleProjectByModuleProjectCodeAndProjectId(String moduleNeedEdit, String moduleCode,
           String moduleName, Double moduleCost, Date dateStart, Date dateEnd, Project project) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("project", project));
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

    public static double ModuleProject.increseCostByModuleNameAndProjectId(Project project,String codeModuleProject,Double costIncrese) {
        double totalCost = 0 ;
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
//                LOGGER.error(">>>>>>>>>>>><<<<<[} :" +moduleProject1);oject1);
            }

            return criteria.list();
        }
        catch (Exception e) {

            return criteria.list();
        }

    }

//    public static List<ModuleProject> ModuleProject.findAllNameModuleByProjectCode2(Project project) {
//        EntityManager ent = ModuleProject.entityManager();
//        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class, "modul");
//        criteria.createAlias("modul.project", "project");
//        criteria.add(Restrictions.eq("project", project));
//        return criteria.list();
//    }

    public static List<ModuleProject> ModuleProject.findModuleProjectByModuleProjectID(Long id) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("id", id));
        return criteria.list();
     }

    public static void ModuleProject.deleteModuleByModuleCodeAndProjectId(String moduleCode,Project project) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("project", project));
        criteria.add(Restrictions.eq("moduleCode", moduleCode));
        List<ModuleProject> moduleProjectList = criteria.list();
        ModuleProject moduleProject = moduleProjectList.get(0);
        moduleProject.remove();
    }

    public static List<ModuleProject> ModuleProject.findModuleByModuleCodeAndProjectId(String moduleCode,Project project) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("project", project));
        criteria.add(Restrictions.eq("moduleCode", moduleCode));
        List<ModuleProject> result = criteria.list();
        return result;
    }

    public static long ModuleProject.findModuleProjectCheckID(long projectId) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class,"moDuleProject");
        criteria.createAlias("moDuleProject.project","project");
        criteria.add(Restrictions.eq("project.id", projectId));
        criteria.setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();


    }
    public static List ModuleProject.findModuleProjectCostforSum (Long id) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class, "mo");
        criteria.createAlias("mo.project", "project");
        criteria.add(Restrictions.eq("project.id", id));
        criteria.setProjection(Projections.sum("mo.moduleCost"));
        return criteria.list();
    }

    public static List ModuleProject.findAllModuleByProjectId (Project project) {
        EntityManager ent = ModuleProject.entityManager();
        Criteria criteria1 = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria1.add(Restrictions.eq("project", project));
        return criteria1.list();
    }



    public static Criteria ModuleProject.queryModuleprojectPagging(Long id){
        Session session = (Session) ModuleProject.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(ModuleProject.class, "moduleproject");
        criteria.createAlias("moduleproject.project", "project");
        criteria.add(Restrictions.eq("project.id", id));
        return criteria;
    }

    public static  List<ModuleProject> ModuleProject.findModuleprojectDataPagingData(
            Long id
            ,Integer firstResult
            ,Integer maxResult
    ){
        Criteria criteria = ModuleProject.queryModuleprojectPagging(id)
                .setFirstResult(firstResult)
                .setMaxResults(maxResult);
        return criteria.list();
    }

    public static  Long ModuleProject.findModuleProjectDataPagingSize(
            Long id
    ){
        Criteria criteria = ModuleProject.queryModuleprojectPagging(id)
                .setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

    public static List<ModuleProject> ModuleProject.findModuleByProjectAndEmpCode(Long projectId, String empCode) {

        EntityManager ent = ModuleMember.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleMember.class, "ModuleMember");
        criteria.add(Restrictions.eq("empCode", empCode));
        criteria.createAlias("ModuleMember.moduleProject", "ModuleProject");
        criteria.add(Restrictions.eq("ModuleProject.moduleStatus", "Not Success"));
        criteria.setProjection(Projections.distinct(Projections.property("ModuleMember.moduleProject")));
        criteria.createAlias("ModuleProject.project", "Project");
        criteria.add(Restrictions.eq("Project.id", projectId));
        return criteria.list();
    }

}
