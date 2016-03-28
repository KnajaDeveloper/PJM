// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import java.util.List;

privileged aspect ModuleMember_Custom_Jpa_ActiveRecord {

    protected static Logger LOGGER = LoggerFactory.getLogger(ModuleMember_Custom_Jpa_ActiveRecord.class);
    
    public static List<Long> ModuleMember.findDistinctModuleByEmpCode(String empCode) {
        EntityManager ent = ModuleMember.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleMember.class);
        criteria.add(Restrictions.eq("empCode", empCode));
        criteria.setProjection(Projections.distinct(Projections.property("moduleProject.id")));
        List<Long> moduleId = criteria.list();
        return moduleId;
    }

    public static void ModuleMember.saveModuleMemberByModuleProject(ModuleProject moduleproject,String[] empCode) {
        EntityManager ent = ModuleMember.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleMember.class);
        for(String name : empCode){
            ModuleMember mm = new ModuleMember();
            mm.setEmpCode(name);
            mm.setModuleProject(moduleproject);
            mm.persist();
        }
    }

    public static void ModuleMember.deleteModuleMemberByModuleProject(ModuleProject moduleproject) {
        EntityManager ent = ProjectManager.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleMember.class);
        criteria.add(Restrictions.eq("moduleProject", moduleproject));
        List<ModuleMember> moduleMembersList = criteria.list();
        for(int i=0;i<moduleMembersList.size();i++){
            ModuleMember mm = moduleMembersList.get(i);
            mm.remove();
        }
    }

    public static List<ModuleMember> ModuleMember.findModuleMemberByModuleProject(ModuleProject moduleproject) {
        EntityManager ent = ModuleMember.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ModuleMember.class);
        criteria.add(Restrictions.eq("moduleProject", moduleproject));
        List<ModuleMember> moduleMembers = criteria.list();
        return moduleMembers;
    }

}
