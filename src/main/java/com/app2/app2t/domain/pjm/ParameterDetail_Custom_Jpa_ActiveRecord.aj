package com.app2.app2t.domain.pjm;

import com.app2.app2t.domain.ParameterDetail;
import org.apache.derby.vti.Restriction;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import java.util.List;

privileged aspect ParameterDetail_Custom_Jpa_ActiveRecord {

    protected static Logger LOGGER = LoggerFactory.getLogger(ParameterDetail_Custom_Jpa_ActiveRecord.class);

    public static List<ParameterDetail> ParameterDetail.getStatusTask(long appParameterId){
        EntityManager ent = ParameterDetail.entityManager();
        Criteria cr = ((Session) ent.getDelegate()).createCriteria(ParameterDetail.class);
        cr.add(Restrictions.eq("appParameter.id", appParameterId));
        return cr.list();
    }
}
