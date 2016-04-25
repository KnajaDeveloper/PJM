package com.app2.app2t.domain.pjm;

import com.app2.app2t.util.ConstantApplication;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.persistence.EntityManager;
import java.util.*;

privileged aspect ImportanceTask_Custom_Jpa_ActiveRecord {
    
    protected static Logger LOGGER = LoggerFactory.getLogger(ImportanceTask_Custom_Jpa_ActiveRecord.class);

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

    public static Criteria ImportanceTask.queryImportancePagging(
        String importanceCode
        ,String importanceName
    ){
        Session session = (Session) ImportanceTask.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(ImportanceTask.class);
        criteria.add(Restrictions.like("importanceTaskCode", "%" + importanceCode + "%"));
        criteria.add(Restrictions.like("importanceTaskName", "%" + importanceName + "%"));
        return criteria;
    }

    public static  List<ImportanceTask> ImportanceTask.findImportanceDataPagingData(
        String importanceCode
        ,String importanceName
        ,Integer firstResult
        ,Integer maxResult
    ){
        Criteria criteria = ImportanceTask.queryImportancePagging(importanceCode, importanceName)
                .setFirstResult(firstResult)
                .setMaxResults(maxResult);
        return criteria.list();
    }

    public static  Long ImportanceTask.findImportanceDataPagingSize(
        String importanceCode
        ,String importanceName
    ){
        Criteria criteria = ImportanceTask.queryImportancePagging(importanceCode, importanceName)
                .setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

    public static List<ImportanceTask> ImportanceTask.findCheckimportanceCode(String importanceCode) {
        EntityManager ent = ImportanceTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ImportanceTask.class);
        criteria.add(Restrictions.eq("importanceTaskCode", importanceCode));
        return criteria.list();
    }

    public static List<ImportanceTask> ImportanceTask.findeditImportance(String importanceCode, String importanceName) {
        EntityManager ent = ImportanceTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ImportanceTask.class);
        criteria.add(Restrictions.eq("importanceTaskCode", importanceCode));
        List<ImportanceTask> importanceTaskes = criteria.list();
        ImportanceTask edImportanceTask = importanceTaskes.get(0);
        edImportanceTask.setImportanceTaskName(importanceName);
        edImportanceTask.merge();
        return criteria.list();
    }

    public static ImportanceTask ImportanceTask.findDeleteImportance(Long importanceID) {
        EntityManager ent = ImportanceTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(ImportanceTask.class);
        criteria.add(Restrictions.eq("id", importanceID));
        List<ImportanceTask> importanceTaskes = criteria.list();
        ImportanceTask delImportanceTask = importanceTaskes.get(0);
        delImportanceTask.remove();
        return delImportanceTask;
    }
}