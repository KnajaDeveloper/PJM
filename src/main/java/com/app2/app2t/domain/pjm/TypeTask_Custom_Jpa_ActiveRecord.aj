// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import java.util.List;

privileged aspect TypeTask_Custom_Jpa_ActiveRecord {

    protected static Logger LOGGER = LoggerFactory.getLogger(TypeTask_Custom_Jpa_ActiveRecord.class);

    public static List<TypeTask> TypeTask.findAllProject(String typeTCode, String typeTName) {
        EntityManager ent = TypeTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
            criteria.add(Restrictions.like("typeTaskCode", "%"+typeTCode+"%" ));
            criteria.add(Restrictions.like("typeTaskName", "%"+typeTName+"%"));


        return criteria.list();
    }


}
