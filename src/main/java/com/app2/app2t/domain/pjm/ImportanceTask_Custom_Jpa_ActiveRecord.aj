package com.app2.app2t.domain.pjm;

import com.app2.app2t.util.ConstantApplication;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.*;

import javax.persistence.EntityManager;
import java.util.*;

privileged aspect ImportanceTask_Custom_Jpa_ActiveRecord {
    
    public static List<ImportanceTask> ImportanceTask.findAllTaskImportance() {
        EntityManager ent = ImportanceTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ImportanceTask.class);
        return criteria.list();
    }

    public static List<ImportanceTask> ImportanceTask.findTaskImportanceByImportanceTaskCode(String importanceTaskCode) {
        EntityManager ent = ImportanceTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ImportanceTask.class);
        criteria.add(Restrictions.eq("importanceTaskCode", importanceTaskCode));
        return criteria.list();
    }
}