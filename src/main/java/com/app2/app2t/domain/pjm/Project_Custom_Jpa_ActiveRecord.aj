// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

privileged aspect Project_Custom_Jpa_ActiveRecord {

    protected static Logger LOGGER = LoggerFactory.getLogger(Project_Custom_Jpa_ActiveRecord.class);
    
	public static Project Project.saveOrUpdateProject(String projectCode,String projectName,Integer projectCost,Date dateStart,Date dateEnd) {
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

//    public static List<Project> Project.findProjectSearchData(Date StDateBegin,Date StDateEnd,Date FnDateBegin,Date FnDateEnd,Integer costStart,Integer costEnd,String projectManage) {
//        EntityManager ent = Project.entityManager();
//        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Project.class);
//
////            criteria.add(Restrictions.between("dateStart",StDateBegin,StDateEnd));
////            criteria.add(Restrictions.between("dateEnd",FnDateBegin,FnDateEnd));
////            criteria.add(Restrictions.between("projectCost",costStart,costEnd));
////            criteria.add(Restrictions.like("projectCost",projectManage));
//        try
//        {
//            List<Project> projects = criteria.list();
//            for(int i= 0; projects.size() > i ;i++){
//                Project project = projects.get(i);
//
//                LOGGER.error(">>>"+  project.getId());
//            }
//
//        }
//        catch (IndexOutOfBoundsException e){
//            return  criteria.list();
//        }
//
//        return criteria.list();
//    }
    
}
