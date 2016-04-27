package com.app2.app2t.domain.pjm;


import com.app2.app2t.util.ConstantApplication;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;

import javax.persistence.EntityManager;

import java.util.List;

public aspect FollowerTask_Custom_Jpa_ActiveRecord {

    public static Criteria FollowerTask.selectTaskFollow(String empCode) {

        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(FollowerTask.class, "follow");
        criteria.add(Restrictions.eq("follow.empCode", empCode));
        criteria.createAlias("follow.task", "task");
        criteria.add(Restrictions.not(Restrictions.eq("task.taskStatus", ConstantApplication.getTaskStatusComplete())));
        return criteria;
    }

    public static List<FollowerTask> FollowerTask.selectTaskFollowTofirstPage(String empCode,
                                                                              Integer maxResult,
                                                                              Integer firstResult

    ) {
        Criteria criteria = FollowerTask.selectTaskFollow(empCode)
                .addOrder(Order.desc("task.progress"))
                .addOrder(Order.asc("task.dateEnd"))
                .setFirstResult(firstResult)
                .setMaxResults(maxResult);

        return criteria.list();
    }
    public static Long FollowerTask.taskFollowPaggingSizeTask(String empCode

    ) {
        Criteria criteria = FollowerTask.selectTaskFollow(empCode)
                .setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

    public static List<FollowerTask> FollowerTask.findFollowerTaskByTaskId(Long taskId) {
        EntityManager ent = FollowerTask.entityManager();
        Criteria cr = ((Session) ent.getDelegate()).createCriteria(FollowerTask.class, "FollowerTask");
        cr.createAlias("FollowerTask.task", "Task");
        cr.add(Restrictions.eq("Task.id", taskId));
        return cr.list();
    }

    public static List<FollowerTask> FollowerTask.findFollowerTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus(
            Integer maxResult,
            Integer firstResult,
            String projectId,
            String moduleId,
            String typeTaskId,
            String statusTask,
            String option,
            String empCode
    ){
        EntityManager ent = FollowerTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(FollowerTask.class,"followerTask");
        criteria.createAlias("followerTask.task", "task", JoinType.LEFT_OUTER_JOIN);
        criteria.createAlias("task.program", "program", JoinType.LEFT_OUTER_JOIN);
        criteria.createAlias("program.moduleProject", "moduleProject", JoinType.LEFT_OUTER_JOIN);
        criteria.createAlias("moduleProject.project", "project", JoinType.LEFT_OUTER_JOIN);
        if(!projectId.equals("")) criteria.add(Restrictions.eq("project.id", Long.parseLong(projectId)));
        if(!moduleId.equals("")) criteria.add(Restrictions.eq("moduleProject.id", Long.parseLong(moduleId)));
        if(!typeTaskId.equals("")) criteria.add(Restrictions.eq("task.typeTask.id", Long.parseLong(typeTaskId)));
        if(!statusTask.equals("")) criteria.add(Restrictions.eq("task.taskStatus", statusTask));
        if(!empCode.equals("")) criteria.add(Restrictions.eq("followerTask.empCode", empCode));
        if(!option.toLowerCase().equals("size")) {
            criteria.setFirstResult(firstResult);
            criteria.setMaxResults(maxResult);
        }
        return criteria.list();
    }

    public static FollowerTask FollowerTask.saveTaskFollower(Task task, String empCode) {
        EntityManager ent = FollowerTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(FollowerTask.class);
        FollowerTask followerTask = new FollowerTask();
        followerTask.setTask(task);
        followerTask.setEmpCode(empCode);
        followerTask.persist();
        return followerTask;
    }

    public static List<FollowerTask> FollowerTask.findEmpCodeByTaskID(long taskId) {
        EntityManager ent = FollowerTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(FollowerTask.class, "FollowerTask");
        criteria.createAlias("FollowerTask.task", "task");
        criteria.add(Restrictions.eq("task.id", taskId));
        return criteria.list();
    }

    public static List<FollowerTask> FollowerTask.findDeleteFollowerTask(Long taskId) {
        EntityManager ent = FollowerTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(FollowerTask.class, "FollowerTask");
        criteria.createAlias("FollowerTask.task", "task");
        criteria.add(Restrictions.eq("task.id", taskId));
        List<FollowerTask> followerTask = criteria.list();
        for(int i = 0; i < followerTask.size(); i++){  
            FollowerTask edfollowerTask = followerTask.get(i);
            edfollowerTask.remove();
        }
        return criteria.list();
    }
}
