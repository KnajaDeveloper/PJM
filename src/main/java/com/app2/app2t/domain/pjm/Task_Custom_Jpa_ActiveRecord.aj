// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import com.app2.app2t.util.ConstantApplication;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.*;
import org.hibernate.sql.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import java.util.*;

import com.app2.app2t.util.ApplicationConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.*;
import org.apache.commons.io.IOUtils;
import  org.apache.commons.io.FileUtils;
import org.springframework.util.FileCopyUtils;
import java.text.*;
import java.io.*;

privileged aspect Task_Custom_Jpa_ActiveRecord {
    protected static Logger LOGGER = LoggerFactory.getLogger(Task_Custom_Jpa_ActiveRecord.class);

    public static List<Task> Task.findTaskByModuleAndTypeTask(List<Long> listModuleId, List<Long> listTypeTaskId, boolean getMyTask, boolean getOtherTask, String empCode) {
        // find task in plan -------------------------------------------------------------------------------------------
        DetachedCriteria subCriteria = DetachedCriteria.forClass(Plan.class);
        subCriteria.add(Restrictions.not(Restrictions.isNull("task")));
        subCriteria.setProjection(Projections.distinct(Projections.property("task")));

        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "Task");
        criteria.add(Restrictions.eq("taskStatus", ConstantApplication.getTaskStatusNew()));
        criteria.createAlias("Task.typeTask", "typeTask");
        criteria.createAlias("Task.program", "program");
        criteria.createAlias("program.moduleProject", "moduleProject");
        criteria.add(Restrictions.in("moduleProject.id", listModuleId));                    // by module (only member)
        criteria.add(Subqueries.propertyNotIn("Task.id", subCriteria));                     // not in plan

        if (listTypeTaskId.size() > 0) {
            criteria.add(Restrictions.in("typeTask.id", listTypeTaskId));                   // by task type
        }

        if (getMyTask && !getOtherTask) {
            criteria.add(Restrictions.eq("empCode", empCode));
        } else if (!getMyTask && getOtherTask) {
            criteria.add(Restrictions.isNull("empCode"));
        } else {
            criteria.add(Restrictions.or(Restrictions.isNull("empCode"), Restrictions.eq("empCode", empCode)));
        }

        criteria.addOrder(Order.asc("empCode"))
                .addOrder(Order.asc("typeTask.typeTaskName"))
                .addOrder(Order.asc("dateStart"))
                .addOrder(Order.asc("dateEnd"));

        List<Task> tasks = criteria.list();
        return tasks;
    }

    public static List<Task> Task.findTaskByTaskStatus(String taskStatus){
        EntityManager ent = Task.entityManager();
        Criteria cr = ((Session) ent.getDelegate()).createCriteria(Task.class);
        cr.add(Restrictions.eq("taskStatus", taskStatus));
        return cr.list();
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
//            task.setStatus(ConstantApplication.getTaskStatusNew());
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

    public static Task Task.saveTask(String taskCode, String taskName, Double taskCost,
        TypeTask typeTask, String empCode, String dateStart, String dateEnd, String fileName,
        String detail, Integer progress, Program program, ImportanceTask importanceTask) {

        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class);
        Task task = new Task();
        task.setTaskCode(taskCode);
        task.setTaskName(taskName);
        task.setTaskCost(taskCost);
        task.setTypeTask(typeTask);
        task.setEmpCode(empCode.equals("null") ? null : empCode);
        if(dateStart.equals("null")){task.setDateStart(null);}
        else{task.setDateStart(new Date(convertDate(dateStart)));}     
        if(dateEnd.equals("null")){task.setDateEnd(null);}    
        else{task.setDateEnd(new Date(convertDate(dateEnd)));}
        task.setFileName(fileName.equals("null") ? null : fileName);
        task.setDetail(detail.equals("null") ? null : detail);
        task.setProgress(progress);
        task.setProgram(program);
        task.setTaskStatus(ConstantApplication.getTaskStatusNew());
        task.setImportanceTask(importanceTask);
        task.persist();
        return task;
    }

    public static String convertDate(String date){
        String splitDate[] = date.split("-");
        return splitDate[1] + "/" + splitDate[0] + "/" + splitDate[2];
    }

    public static Task Task.findEditTask(Long id, String taskCode,
        String taskName, Double taskCost, TypeTask typeTask, ImportanceTask importanceTask, String empCode,
        String dateStart, String dateEnd, String fileName, String detail, Integer progress) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class);
        criteria.add(Restrictions.eq("id", id));
        criteria.add(Restrictions.eq("taskCode", taskCode));
        List<Task> et = criteria.list();
        Task edTask = et.get(0);
        edTask.setTaskName(taskName);
        edTask.setTaskCost(taskCost);
        edTask.setTypeTask(typeTask);
        edTask.setImportanceTask(importanceTask);
        edTask.setEmpCode(empCode.equals("null") ? null : empCode);
        if(dateStart.equals("null")){edTask.setDateStart(null);}
        else{edTask.setDateStart(new Date(convertDate(dateStart)));}     
        if(dateEnd.equals("null")){edTask.setDateEnd(null);}    
        else{edTask.setDateEnd(new Date(convertDate(dateEnd)));}
        edTask.setFileName(fileName.equals("null") ? null : fileName);
        edTask.setDetail(detail.equals("null") ? null : detail);
        edTask.setProgress(progress);
        edTask.merge();
        return edTask;
    }

    public static List<Task> Task.findDeleteTask(Long programID, Long taskID, String taskCode) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class, "task");
        criteria.createAlias("task.program", "program");
        criteria.add(Restrictions.eq("program.id", programID));
        criteria.add(Restrictions.eq("id", taskID));

        try{
            String pathFile = ApplicationConstant.PATH_PJM_FILE + programID + "/" + taskCode + "/";
            File path = new File(pathFile);
            FileUtils.deleteDirectory(path);
        }catch(Exception e){
            LOGGER.error("Error : {}", e);
            throw new RuntimeException(e);
        }
        
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
        criteria.add(Restrictions.isNull("task.empCode"));
        return criteria.list();
    }

    @Transactional
    public static void Task.uploadFileAndInsertDataFile(Long programID, String taskCode, MultipartHttpServletRequest multipartHttpServletRequest) {
        try{
            MultipartFile multipartFile = multipartHttpServletRequest.getFile("myInput");
            if(!multipartFile.isEmpty()){
                byte[] bytes = multipartFile.getBytes();
                String pathFile = ApplicationConstant.PATH_PJM_FILE + programID + "/" + taskCode + "/";
                File path = new File(pathFile);
                boolean check = path.mkdirs();
                if(check == true){
                    File pathFileNew = new File(pathFile + multipartFile.getOriginalFilename());
                    FileCopyUtils.copy(bytes, new FileOutputStream(pathFileNew));
                }else{
                    FileUtils.deleteDirectory(path);
                    boolean check1 = path.mkdirs();
                    if(check1 == true){
                        File pathFileNew = new File(pathFile + multipartFile.getOriginalFilename());
                        FileCopyUtils.copy(bytes, new FileOutputStream(pathFileNew));
                    }
                }
            }
        }catch(Exception e){
            LOGGER.error("Error : {}", e);
            throw new RuntimeException(e);
        }
    }
    public static List<Task> Task.findTaskByEmpCode(String empCode) {
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class);
        criteria.add(Restrictions.eq("empCode", empCode));
        return criteria.list();
    }

    public static void Task.updateStatusTask(Long taskId, String status,Integer version) {
        boolean statusReturn = false ;
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class);
        criteria.add(Restrictions.eq("id", taskId));
        List<Task> result = criteria.list();
        Task task = result.get(0);
        if(task.getVersion() == version){
            if(status.equals(ConstantApplication.getTaskStatusComplete())){
                status = ConstantApplication.getTaskStatusComplete();
                task.setTaskStatus(status);
            }
            else if(status.equals(ConstantApplication.getTaskStatusReady())){
                status = ConstantApplication.getTaskStatusNew();
                task.setTaskStatus(status);
                task.setProgress(0);
            }
            task.merge();
        }

    }

    public static List<Task> Task.findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus(
            Integer maxResult,
            Integer firstResult,
            String projectId,
            String moduleId,
            String typeTaskId,
            String statusTask,
            String option
    ){
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class,"task");
        criteria.createAlias("task.program", "program", JoinType.LEFT_OUTER_JOIN);
        criteria.createAlias("program.moduleProject", "moduleProject", JoinType.LEFT_OUTER_JOIN);
        criteria.createAlias("moduleProject.project", "project", JoinType.LEFT_OUTER_JOIN);
        if(!projectId.equals("")) criteria.add(Restrictions.eq("project.id", Long.parseLong(projectId)));
        if(!moduleId.equals("")) criteria.add(Restrictions.eq("moduleProject.id", Long.parseLong(moduleId)));
        if(!typeTaskId.equals("")) criteria.add(Restrictions.eq("task.typeTask.id", Long.parseLong(typeTaskId)));
        if(!statusTask.equals("")) criteria.add(Restrictions.eq("task.taskStatus", statusTask));
        if(!option.toLowerCase().equals("size")) {
            criteria.setFirstResult(firstResult);
            criteria.setMaxResults(maxResult);
        }
        return criteria.list();
    }


    public static Long Task.findImportanceByID(Long importance) {
        Session session = (Session) Task.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Task.class, "Task");
        criteria.createAlias("Task.importanceTask", "importanceTask");
        criteria.add(Restrictions.eq("importanceTask.id", importance));
        criteria.setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

    public static boolean Task.updateTaskStatusAndProgress(Long taskId, Integer progress, String note, Integer versionPlan, Integer versionTask) {
        boolean statusTask = false; boolean statusPlan = false ;
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class);
        criteria.add(Restrictions.eq("id", taskId));
        List<Task> result = criteria.list();
        Task task = result.get(0);
        if(task.getVersion() == versionTask){
            task.setProgress(progress);
            if(progress >= 0 && progress < 100)
            {
                task.setTaskStatus(ConstantApplication.getTaskStatusNew());
            }
            else
            {
                task.setTaskStatus(ConstantApplication.getTaskStatusReady());
            }
            task.merge();
            statusTask =true ;
        }
//        if(!note.isEmpty()){
            statusPlan = Plan.updatePlanNotePageHome(task,null,note,versionPlan);
//        }

        if(statusTask && statusPlan)
        {
            return  true ;
        }
        else {
            return  false ;
        }

    }

    public static Long Task.findCherckVersionByIdAndVersion(Long id, Integer version){
        EntityManager ent = Task.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(Task.class);
        criteria.add(Restrictions.eq("id", id));
        criteria.add(Restrictions.eq("version", version));
        criteria.setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }
}