// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

privileged aspect Task_Custom_Jpa_ActiveRecord {

    protected static Logger LOGGER = LoggerFactory.getLogger(Task_Custom_Jpa_ActiveRecord.class);

    public static List<Task> Task.findTaskByModuleAndTypeTask(List<Long> listModuleId, List<Long> listTypeTaskId, boolean getMyTask, boolean getOtherTask, String empCode) {

        DetachedCriteria subCriteria = DetachedCriteria.forClass(Plan.class);
        subCriteria.add(Restrictions.not(Restrictions.isNull("task")));
        subCriteria.setProjection(Projections.distinct(Projections.property("task")));

        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "Task");
        criteria.add(Restrictions.lt("progress", 100));
        criteria.createAlias("Task.typeTask", "typeTask");
        criteria.createAlias("Task.program", "program");
        criteria.createAlias("program.moduleProject", "moduleProject");
        criteria.add(Restrictions.in("moduleProject.id", listModuleId));                    // where in my module
        criteria.add(Subqueries.propertyNotIn("Task.id", subCriteria));                     // not in my plan

        if (listTypeTaskId.size() > 0) {
            criteria.add(Restrictions.in("typeTask.id", listTypeTaskId));
        }

        if (getMyTask && !getOtherTask) {
            criteria.add(Restrictions.eq("empCode", empCode));
        } else if (!getMyTask && getOtherTask) {
            criteria.add(Restrictions.eq("empCode", ""));
        } else {
            criteria.add(Restrictions.or(Restrictions.eq("empCode", ""), Restrictions.eq("empCode", empCode)));
        }

        criteria.addOrder(Order.desc("empCode"))
                .addOrder(Order.asc("typeTask.typeTaskName"))
                .addOrder(Order.asc("dateStart"))
                .addOrder(Order.asc("dateEnd"));
        List<Task> tasks = criteria.list();
        return tasks;
    }

    public static List<Task> Task.findProjectByTask(long typeCode) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "Task");
        criteria.createAlias("Task.typeTask", "typeTask");
        try {
            criteria.add(Restrictions.eq("typeTask.id", typeCode));
            List<Task> emEmployees = criteria.list();
            Task emEmployee = emEmployees.get(0);

        } catch (IndexOutOfBoundsException e) {

            return criteria.list();
        }
        return criteria.list();
    }

    public static Task Task.updateEmpCode(Long taskId, String empCode) {
        try {
            EntityManager ent = Task.entityManager();
            Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class);
            criteria.add(Restrictions.eq("id", taskId));
            List<Task> tasks = criteria.list();
            Task task = tasks.get(0);
            task.setEmpCode(empCode);
            task.merge();

            return task;
        } catch (Exception ex) {
            LOGGER.debug("{}", ex);
        }

        return null;
    }

    public static Criteria Task.queryTaskPagging(Long id){
        Session session = (Session) Task.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "moduleProject");
        criteria.add(Restrictions.eq("moduleProject.id", id));
        return criteria;
    }

    public static  List<Task> Task.findTaskDataPagingData(
        Long id
        ,Integer firstResult
        ,Integer maxResult
    ){
        Criteria criteria = Task.queryTaskPagging(id)
                .setFirstResult(firstResult)
                .setMaxResults(maxResult);
        return criteria.list();
    }

    public static  Long Task.findTaskDataPagingSize(
        Long id
    ){
        Criteria criteria = Task.queryTaskPagging(id)
                .setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

    public static Task Task.saveTask(String taskCode, String taskName, Integer taskCost,
        TypeTask typeTask, String empCode, Date dateStart, Date dateEnd, String fileName,
        String detail, Integer progress, Program program) {

        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class);
        Task task = new Task();
        task.setTaskCode(taskCode);
        task.setTaskName(taskName);
        task.setTaskCost(taskCost);
        task.setTypeTask(typeTask);
        if(empCode == "")
            empCode = null;
        task.setEmpCode(empCode);
        task.setDateStart(dateStart);
        task.setDateEnd(dateEnd);
        if(detail == "")
            detail = null;
        task.setDetail(detail);
        if(fileName == "")
            fileName = null;
        task.setFileName(fileName);
        task.setProgress(progress);
        task.setProgram(program);
        task.persist();

        return task;
    }

    public static List<Task> Task.findEditTask(Long id, String taskCode,
        String taskName, Integer taskCost, TypeTask typeTask, String empCode,
        Date dateStart, Date dateEnd, String fileName, String detail, Integer progress) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class);
        criteria.add(Restrictions.eq("id", id));
        criteria.add(Restrictions.eq("taskCode", taskCode));
        List<Task> et = criteria.list();
        Task edTask = et.get(0);
        edTask.setTaskName(taskName);
        edTask.setTaskCost(taskCost);
        edTask.setTypeTask(typeTask);
        edTask.setEmpCode(empCode);
        edTask.setDateStart(dateStart);
        edTask.setDateEnd(dateEnd);
        edTask.setFileName(fileName);
        edTask.setDetail(detail);
        edTask.setProgress(progress);
        edTask.merge();
        return criteria.list();
    }

    public static List<Task> Task.findDeleteTask(Long id, Long taskID) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.add(Restrictions.eq("program.id", id));
        criteria.add(Restrictions.eq("id", taskID));
        List<Task> et = criteria.list();
        Task edTask = et.get(0);
        edTask.remove();
        return criteria.list();
    }

    public static List<Task> Task.findSizeTaskByTaskCode(Long id, String taskCode) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.add(Restrictions.eq("program.id", id));
        criteria.add(Restrictions.eq("taskCode", taskCode));
        return criteria.list();
    }

    public static List<Task> Task.findCheckProgramCode(Program program) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.add(Restrictions.eq("program", program));
        return criteria.list();
    }

    public static List Task.findTaskCostforSum(Long id) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.createAlias("program.moduleProject", "moduleProject");
        criteria.add(Restrictions.eq("moduleProject.id", id));
        criteria.setProjection(Projections.sum("task.taskCost"));
        return criteria.list();
    }

    public static List<Task> Task.findTaskProgestByProgram(Program program) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Program.class, "taskProgest");
        criteria.createAlias("taskProgest.program", "program");
        criteria.add(Restrictions.eq("program", program));
        return criteria.list();
    }

    public static Long Task.findProgramByID(Long id) {
        Session session = (Session) Task.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Task.class, "Task");
        criteria.createAlias("Task.program", "program");
        criteria.add(Restrictions.eq("program.id", id));
        criteria.setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

    public static Long Task.findAllTypeTaskByID(Long id) {
        Session session = (Session) Task.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Task.class, "task");
        criteria.createAlias("task.typeTask", "typeTask");
        criteria.add(Restrictions.eq("typeTask.id", id));
        criteria.setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }
    public static List Task.findTaskProgressforAVG(Long id) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.createAlias("program.moduleProject", "moduleProject");
        criteria.add(Restrictions.eq("moduleProject.id", id));
        criteria.setProjection(Projections.avg("task.progress"));
        return criteria.list();
    }

    public static List Task.findEmptyTask() {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.createAlias("program.moduleProject", "moduleProject");
        criteria.add(Restrictions.eq("task.empCode",""));
        return criteria.list();
    }
}