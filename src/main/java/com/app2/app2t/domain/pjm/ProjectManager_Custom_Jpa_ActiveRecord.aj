// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import com.app2.app2t.domain.pjm.ProjectManager;
import java.util.List;

import com.sun.xml.internal.ws.api.server.Module;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

privileged aspect ProjectManager_Custom_Jpa_ActiveRecord {
    protected static Logger LOGGER = LoggerFactory.getLogger(Project_Custom_Jpa_ActiveRecord.class);

    public static void ProjectManager.saveProjectManagerByProJect(Project project,String[] empCode) {
        EntityManager ent = ProjectManager.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ProjectManager.class);
        for(String name : empCode){
            ProjectManager pjm = new ProjectManager();
            pjm.setEmpCode(name);
            pjm.setProject(project);
            pjm.persist();
        }
    }


    @Transactional
    public static void ProjectManager.findDeleteProjectManager(long deleteCode) {
        EntityManager ent = ProjectManager.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ProjectManager.class,"Pm");
        criteria.createAlias("Pm.project","project");
        criteria.add(Restrictions.eq("project.id", deleteCode));
        List<ProjectManager> projectManagers = criteria.list();
        for(int i= 0; projectManagers.size() >i ; i++)
        {
            ProjectManager projectManager = projectManagers.get(i);
            projectManager.remove();
        }


    }
    public static List<ProjectManager> ProjectManager.findManagerByProject(Project project) {
        EntityManager ent = ProjectManager.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ProjectManager.class, "modul");
        criteria.createAlias("modul.project", "project");
        criteria.add(Restrictions.eq("project", project));
        return criteria.list();
    }

    public static void ProjectManager.updateProjectManagerByProjectID(Project project,String[] empCode) {
        EntityManager ent = ProjectManager.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ProjectManager.class);
        for(String name : empCode){
            ProjectManager pjm = new ProjectManager();
            pjm.setEmpCode(name);
            pjm.setProject(project);
            pjm.merge();
        }
    }



}
