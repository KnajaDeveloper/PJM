// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.*;
import org.hibernate.sql.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.rmi.runtime.Log;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.*;

privileged aspect Task_Custom_Jpa_ActiveRecord {

    protected static Logger LOGGER = LoggerFactory.getLogger(Task_Custom_Jpa_ActiveRecord.class);

    public static List<Task> Task.findTaskByModuleAndTypeTask(List<Long> listModuleId, List<Long> listTypeTaskId, boolean getMyTask, boolean getOtherTask, String userName) {

        DetachedCriteria subCriteria = DetachedCriteria.forClass(Plan.class);
        subCriteria.setProjection(Projections.distinct(Projections.property("task")));

        EntityManager ent = Task.entityManager();

        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "Task");
        criteria.add(Restrictions.lt("progress", 100));
        criteria.createAlias("Task.typeTask", "typeTask");
        criteria.createAlias("Task.program", "program");
        criteria.createAlias("program.moduleProject", "moduleProject");
        criteria.add(Restrictions.in("moduleProject.id", listModuleId));                    // in my module
        criteria.add(Subqueries.propertyNotIn("Task.id", subCriteria));                     // not in my plan

        if (listTypeTaskId.size() > 0) {
            criteria.add(Restrictions.in("typeTask.id", listTypeTaskId));
        }

        if (getMyTask && !getOtherTask) {
            criteria.add(Restrictions.eq("empCode", userName));
        } else if (!getMyTask && getOtherTask) {
            criteria.add(Restrictions.isNull("empCode"));
        } else {
            criteria.add(Restrictions.or(Restrictions.isNull("empCode"), Restrictions.eq("empCode", userName)));
        }

        criteria.addOrder(Order.asc("empCode"))
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
            System.out.print(emEmployee.getId());
        } catch (IndexOutOfBoundsException e) {
            System.out.print(e);
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

    public static Task Task.saveTask(String taskCode, String taskName, Integer taskCost,
        TypeTask typeTask, String empCode, Date dateStart, Date dateEnd, String detail,
        Integer progress, Program program) {

        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class);
        Task task = new Task();
        task.setTaskCode(taskCode);
        task.setTaskName(taskName);
        task.setTaskCost(taskCost);
        task.setTypeTask(typeTask);
        task.setEmpCode(empCode);
        task.setDateStart(dateStart);
        task.setDateEnd(dateEnd);
        task.setDetail(detail);
        task.setProgress(progress);
        task.setProgram(program);
        task.persist();

        return task;
    }

    public static List<Task> Task.findTaskByProgramCode(Program program) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.add(Restrictions.eq("program", program));
        return criteria.list();
    }

    public static List<Task> Task.findEditTask(Program program, String taskCode,
        String taskName, Integer taskCost, TypeTask typeTask, String empCode,
        Date dateStart, Date dateEnd, String detail, Integer progress) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.add(Restrictions.eq("program", program));
        criteria.add(Restrictions.eq("taskCode", taskCode));
        List<Task> et = criteria.list();
        Task edTask = et.get(0);
        edTask.setTaskName(taskName);
        edTask.setTaskCost(taskCost);
        edTask.setTypeTask(typeTask);
        edTask.setEmpCode(empCode);
        edTask.setDateStart(dateStart);
        edTask.setDateEnd(dateEnd);
        edTask.setDetail(detail);
        edTask.setProgress(progress);
        edTask.merge();
        return criteria.list();
    }
    public static List<Task> Task.findDeleteTask(Program program, String taskCode) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.add(Restrictions.eq("program", program));
        criteria.add(Restrictions.eq("taskCode", taskCode));
        List<Task> et = criteria.list();
        Task edTask = et.get(0);
        edTask.remove();
        return criteria.list();
    }

    public static List<Task> Task.findSizeTaskByTaskCode(Program program, String taskCode) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.add(Restrictions.eq("program", program));
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

    public static List Task.findTaskCostforSum(ModuleProject moduleProject) {
        EntityManager ent = Task.entityManager();
        Criteria criteria1 = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria1.createAlias("task.program", "program");
        criteria1.createAlias("program.moduleProject", "moduleProject");
        criteria1.add(Restrictions.eq("moduleProject.id", moduleProject.getId()));
        criteria1.setProjection(Projections.sum("task.taskCost"));
        return criteria1.list();
    }
    public static List<Task> Task.findTaskProgestByProgram(Program program) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Program.class, "taskProgest");
        criteria.createAlias("taskProgest.program", "program");
        criteria.add(Restrictions.eq("program", program));
        return criteria.list();
    }
}