package com.app2.app2t.domain.pjm;
import com.app2.app2t.base.BaseEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
@RooJson
public class OtherTask extends BaseEntity {

    /**
     */
    private String taskName;

    /**
     */
    private Integer taskCost;

    /**
     */
    private String empCode;

    /**
     */
    private String detail;

    /**
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "typeTask")
    private TypeTask typeTask;

    /**
     */
    private Integer progress;
}
