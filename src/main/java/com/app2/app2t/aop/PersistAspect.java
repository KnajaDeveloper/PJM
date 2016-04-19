package com.app2.app2t.aop;

import com.app2.app2t.base.BaseEntity;
import com.app2.app2t.util.AuthorizeUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Configurable;

import javax.persistence.EntityManager;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by kcnp.
 * Created Date : 08/06/2015.
 */
@Aspect
@Configurable
public class PersistAspect {
    private static Logger LOGGER = LoggerFactory.getLogger(PersistAspect.class);

    @Pointcut("execution  (* com.app2.app2t.base.*BaseEntity*.persist(..))")
    private void executePersistPointCut() {
    }

    @Pointcut("execution  (* com.app2.app2t.base.*BaseEntity*.merge(..))")
    private void executeMergePointCut() {
    }

    @Pointcut("execution  (* com.app2.app2t.base.BaseEntity*.setId(..))")
    private void executePaseJsonPutController() {
    }

    @Before("executePersistPointCut()")
    public void beforePersistData(JoinPoint joinPoint) throws Exception {
        Date today = Calendar.getInstance().getTime();
        BaseEntity entity = (BaseEntity) joinPoint.getThis();
        entity.setCreatedBy(AuthorizeUtil.getUserName());
        entity.setCreatedDate(today);
//        entity.setUpdatedBy(AuthorizeUtil.getUserName());
//        entity.setUpdatedDate(today);
    }

    @Before("executeMergePointCut()")
    public void beforeMergeData(JoinPoint joinPoint) throws Exception {
        Date today = Calendar.getInstance().getTime();
        BaseEntity entity = (BaseEntity) joinPoint.getThis();
        entity.setUpdatedBy(AuthorizeUtil.getUserName());
        entity.setUpdatedDate(today);
    }

    @After("executePaseJsonPutController()")
    public void afterPutControllerData(JoinPoint joinPoint) throws Exception {

        BaseEntity entity = (BaseEntity)joinPoint.getThis();
        if(entity.getId() != null){
            EntityManager em = BaseEntity.entityManager();
            BaseEntity baseTemp = (BaseEntity)em.find(joinPoint.getThis().getClass(), entity.getId());
            LOGGER.debug("After Parse Json Save : {}",baseTemp);
            Date today = Calendar.getInstance().getTime();
            entity.setCreatedBy(baseTemp.getCreatedBy());
            entity.setCreatedDate(baseTemp.getCreatedDate());
            entity.setUpdatedBy(AuthorizeUtil.getUserName());
            entity.setUpdatedDate(today);
        }
    }
}
