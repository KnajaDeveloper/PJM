// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.Subqueries;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

privileged aspect Project_Custom_Jpa_ActiveRecord {

    protected static Logger LOGGER = LoggerFactory.getLogger(Project_Custom_Jpa_ActiveRecord.class);

    public static Project Project.saveOrUpdateProject(String projectCode, String projectName, Integer projectCost, Date dateStart, Date dateEnd) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
        Project project = new Project();
        project.setProjectCode(projectCode);
        project.setProjectName(projectName);
        project.setProjectCost(projectCost);
        project.setDateStart(dateStart);
        project.setDateEnd(dateEnd);
        project.persist();
        return project;
    }

    public static List<Project> Project.findProjectByProjectCode(String projectCode) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
        criteria.add(Restrictions.eq("projectCode", projectCode));
        return criteria.list();
    }


    public static Criteria Project.findProjectSearchData(String StDateBegin, String StDateEnd, String FnDateBegin, String FnDateEnd, Integer costStart, Integer costEnd, String projectManage) {

        try {
            Session session = (Session) Project.entityManager().getDelegate();
            Criteria criteria = session.createCriteria(Project.class, "project");
            //-- FormatDate--//
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            //-- Startdate Select --//
            if (StDateBegin != "" && StDateEnd != "") {
                Date stDatebegin = new Date(Long.parseLong(StDateBegin));
                Date stDateend = new Date(Long.parseLong(StDateEnd));
                stDatebegin = formatter.parse(formatter.format(stDatebegin));
                stDateend = formatter.parse(formatter.format(stDateend));

                criteria.add(Restrictions.between("dateStart", stDatebegin, stDateend));
            } else if (StDateBegin != "" && StDateEnd == "") {
                Date stDatebegin = new Date(Long.parseLong(StDateBegin));
                stDatebegin = formatter.parse(formatter.format(stDatebegin));
                criteria.add(Restrictions.ge("dateStart", stDatebegin));
            } else if (StDateBegin == "" && StDateEnd != "") {
                Date stDateend = new Date(Long.parseLong(StDateEnd));
                stDateend = formatter.parse(formatter.format(stDateend));
                criteria.add(Restrictions.le("dateStart", stDateend));
            }
            //-- Enddate Select --//
            if (FnDateBegin != "" && FnDateEnd != "") {
                Date fnDatebegin = new Date(Long.parseLong(FnDateBegin));
                Date fnDateend = new Date(Long.parseLong(FnDateEnd));
                fnDatebegin = formatter.parse(formatter.format(fnDatebegin));
                fnDateend = formatter.parse(formatter.format(fnDateend));
                criteria.add(Restrictions.between("dateEnd", fnDatebegin, fnDateend));
            } else if (FnDateBegin != "" && FnDateEnd == "") {
                Date fnDatebegin = new Date(Long.parseLong(FnDateBegin));
                fnDatebegin = formatter.parse(formatter.format(fnDatebegin));
                criteria.add(Restrictions.ge("dateEnd", fnDatebegin));
            } else if (FnDateBegin == "" && FnDateEnd != "") {
                Date fnDateend = new Date(Long.parseLong(FnDateEnd));
                fnDateend = formatter.parse(formatter.format(fnDateend));
                criteria.add(Restrictions.le("dateEnd", fnDateend));
            }
            //-- Cost Select --//
            if (costStart != null && costEnd != null) {
                criteria.add(Restrictions.between("projectCost", costStart, costEnd));
            } else if (costStart != null && costEnd == null) {
                criteria.add(Restrictions.ge("projectCost", costStart));
            } else if (costStart == null && costEnd != null) {
                criteria.add(Restrictions.le("projectCost", costEnd));
            }
            //-- SubQuery ProjectManager --//
            DetachedCriteria subCriteria = DetachedCriteria.forClass(ProjectManager.class, "projectManager");
            subCriteria.add(Restrictions.like("empCode", "%" + projectManage + "%"));
            subCriteria.setProjection(Projections.property("project"));
            //----//
            criteria.add(Subqueries.propertyIn("project.id", subCriteria));
            return criteria ;
        } catch (Exception e) {
            LOGGER.error(">>>{} :" + e);
        }
        return null;
    }

    public static Project Project.increseCostByModuleNameAndCodeProject(String projectCode,Integer increseCost,Integer totalCost) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
        criteria.add(Restrictions.eq("projectCode", projectCode));
        List<Project> projectList = criteria.list();
        Project project = projectList.get(0);;
        int oldCost = project.getProjectCost();
        if(totalCost+increseCost>oldCost) totalCost = totalCost + increseCost ;
        else totalCost = project.getProjectCost();
        project.setProjectCost(totalCost);
        project.merge();
        return project;
    }


    @Transactional
    public static List<Project> Project.findDeleteProjects(long deleteCode) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
        criteria.add(Restrictions.eq("id", deleteCode));
        List<Project> projects = criteria.list();
        Project project = projects.get(0);
        project.remove();
        return criteria.list();
    }



   /* public static List<Project> Project.findProjectName(String projectCode) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
        criteria.add(Restrictions.eq("projectCode", projectCode));
        return criteria.list();
    }*/

    public static List<Project> Project.findProjectByProjectCode2(String projectCode) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
        criteria.add(Restrictions.eq("projectCode", projectCode));
        return criteria.list();
    }
     public static List<Project> Project.findproject(String projectCode) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleProject.class);
        criteria.add(Restrictions.eq("projectCode", projectCode));
        return criteria.list();
    }

    public static List<Project> Project.findProjectByIdProject(long projectID) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
        criteria.add(Restrictions.eq("id", projectID));
        return criteria.list();
    }


    public static List<Project> Project.findAllProject() {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
        return criteria.list();
    }



    public static List<Project> Project.finProjectOfDataPagingData(String StDateBegin,
                                                                   String StDateEnd,
                                                                   String FnDateBegin,
                                                                   String FnDateEnd,
                                                                   Integer costStart,
                                                                   Integer costEnd,
                                                                   String projectManage,
                                                                   Integer maxResult,
                                                                   Integer firstResult

    ){
        Criteria criteria = Project.findProjectSearchData(StDateBegin,StDateEnd,FnDateBegin,FnDateEnd,costStart,costEnd,projectManage)
                .setFirstResult(firstResult)
                .setMaxResults(maxResult);
        return criteria.list();
    }
    public static  Long Project.finProjectOfDataPagingSize(String StDateBegin,
                                                           String StDateEnd,
                                                           String FnDateBegin,
                                                           String FnDateEnd,
                                                           Integer costStart,
                                                           Integer costEnd,
                                                           String projectManage

    ){
        Criteria criteria = Project.findProjectSearchData(StDateBegin,StDateEnd,FnDateBegin,FnDateEnd,costStart,costEnd,projectManage)
                .setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

    public static Project Project.updateProjectByIdProject(long id,String projectCode, String projectName, Integer projectCost, Date dateStart, Date dateEnd) {
        EntityManager ent = Project.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
        List<Project> listProject = Project.findProjectByIdProject(id);
        Project project = listProject.get(0);
        project.setProjectCode(projectCode);
        project.setProjectName(projectName);
        project.setProjectCost(projectCost);
        project.setDateStart(dateStart);
        project.setDateEnd(dateEnd);
        project.merge();
        return project;
    }
}
