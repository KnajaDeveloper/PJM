package com.app2.app2t.domain.pjm;

import com.app2.app2t.domain.AppParameter;
import com.app2.app2t.domain.ParameterDetail;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import java.util.List;

privileged aspect AppParameter_Custom_Jpa_ActiveRecord {

    protected static Logger LOGGER = LoggerFactory.getLogger(AppParameter_Custom_Jpa_ActiveRecord.class);

    public static List<AppParameter> AppParameter.getIdByCode(String appCode){
        EntityManager ent = AppParameter.entityManager();
        Criteria cr = ((Session) ent.getDelegate()).createCriteria(AppParameter.class);
        cr.add(Restrictions.le("code", appCode));
        return cr.list();
    }
}
