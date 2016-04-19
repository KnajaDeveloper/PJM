package com.app2.app2t.domain.pjm;

import com.app2.app2t.base.BaseEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
@RooJson
public class OtherTask extends BaseEntity {

    /**
     */
    @Size(max = 255)
    @NotNull
    private String taskName;

    /**
     */
    @NotNull
    @Digits(integer = 7, fraction = 4)
    private Double taskCost;

    /**
     */
    @Size(max = 255)
    @NotNull
    private String empCode;

    /**
     */
    @Size(max = 255)
    private String detail;

    /**
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "typeTask")
    private TypeTask typeTask;

    /**
     */
    @Digits(integer= 3, fraction = 0)
    @NotNull
    private Integer progress;
}
