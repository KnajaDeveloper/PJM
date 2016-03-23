// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

privileged aspect OtherTask_Custom_Jpa_ActiveRecord {

    public static OtherTask OtherTask.insertOtherTask(String taskName, int taskCost, String userName) {
        OtherTask otherTask = new OtherTask();
        otherTask.setTaskName(taskName);
        otherTask.setTaskCost(taskCost);
        otherTask.setProgress(0);
        otherTask.setEmpCode(userName);
        //otherTask.setTypeTask();

        otherTask.persist();

        return  otherTask;
    }


    public static Long OtherTask.findAllTypeTaskByID(Long id) {
        Session session = (Session) OtherTask.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(OtherTask.class, "OtherTask");
        criteria.createAlias("OtherTask.typeTask", "typeTask");
        criteria.add(Restrictions.eq("typeTask.id", id));
        criteria.setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }
    
}
