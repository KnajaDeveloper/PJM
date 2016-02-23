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

    //รับ ค่าจาก Controller เก็บใน string
    public static List<TypeTask> TypeTask.findAllProject(String typeTCode, String typeTName) {
        EntityManager ent = TypeTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
        //เช็คเงื่อนไข
            criteria.add(Restrictions.like("typeTaskCode", "%"+typeTCode+"%" ));
            criteria.add(Restrictions.like("typeTaskName", "%"+typeTName+"%"));
        //return กลับไป Controller
        return criteria.list();
    }

    //---------Check Data---------------------------------------------------------------------------

    public static List<TypeTask> TypeTask.checkAllProject(String typeTCode) {
        EntityManager ent = TypeTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
        // ใน .java
        criteria.add(Restrictions.eq("typeTaskCode", typeTCode ));


        return criteria.list();
    }

    //---------Edit Data---------------------------------------------------------------------------

    public static List<TypeTask> TypeTask.editAllProject(String typeTCode, String typeTName) {
        EntityManager ent = TypeTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
        criteria.add(Restrictions.eq("typeTaskCode", typeTCode));
        List<TypeTask> result = criteria.list();
        TypeTask edTypeTask = result.get(0);
        edTypeTask.setTypeTaskName(typeTName);
        edTypeTask.merge();
        return criteria.list();
    }

    //---------Delete Data---------------------------------------------------------------------------
//check ว่าตารางนั้นมีข้อมูลไหมถ้ามีแสดงว่ามีการเรียกใช้อยู่
    public static List<TypeTask> TypeTask.deleteAllProject(String typeTCode) {
        EntityManager ent = TypeTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
        criteria.add(Restrictions.eq("typeTaskCode", typeTCode));
        List<TypeTask> result = criteria.list();
        TypeTask deTypeTask = result.get(0);
        deTypeTask.remove();
        return criteria.list();
    }

    public static List<TypeTask> TypeTask.findAllTypeTask() {
        EntityManager ent = TypeTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
        return criteria.list();
    }

    public static List<TypeTask> TypeTask.findTypeTaskByTypeTaskCode(String typeTaskCode) {
        EntityManager ent = TypeTask.entityManager();
        Criteria criteria = ((Session) ent.getDelegate()).createCriteria(TypeTask.class);
        criteria.add(Restrictions.eq("typeTaskCode", typeTaskCode));
        return criteria.list();
    }
}
