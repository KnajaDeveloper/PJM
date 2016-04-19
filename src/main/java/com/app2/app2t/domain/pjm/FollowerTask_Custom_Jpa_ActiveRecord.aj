package com.app2.app2t.domain.pjm;


import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import javax.persistence.EntityManager;
import java.util.List;

public aspect FollowerTask_Custom_Jpa_ActiveRecord {

    public static Criteria FollowerTask.selectTaskFollow(String empCode) {

        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(FollowerTask.class,"follow");
        criteria.add(Restrictions.eq("follow.empCode",empCode));
        criteria.createAlias("follow.task","task");
        criteria.add(Restrictions.eq("task.taskStatus","R"));
        return criteria;
    }

    public static List<FollowerTask> FollowerTask.selectTaskFollowTofirstPage(String empCode,
                                                                              Integer maxResult,
                                                                              Integer firstResult

    ){
        Criteria criteria = FollowerTask.selectTaskFollow(empCode)
                .setFirstResult(firstResult)
                .setMaxResults(maxResult);
        return criteria.list();
    }
    public static  Long FollowerTask.taskFollowPaggingSizeTask(String empCode

    ){
        Criteria criteria = FollowerTask.selectTaskFollow(empCode)
                .setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

}
