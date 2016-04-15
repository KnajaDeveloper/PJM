package com.app2.app2t.domain.pjm;

import com.app2.app2t.base.BaseEntity;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;
import java.util.Date;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
@RooJson
public class Task extends BaseEntity {

    /**
     */
    @Size(max = 15)
    private String taskCode;

    /**
     */
    @Size(max = 40)
    private String taskName;

    /**
     */
    @Digits(integer = 7, fraction = 4)
    private Double taskCost;

    /**
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "typeTask")
    private TypeTask typeTask;

    /**
     */
    @Size(max = 15)
    private String empCode;

    /**
     */
    @Size(max = 255)
    private String detail;

    /**
     */
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date dateStart;

    /**
     */
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date dateEnd;

    /**
     */
    @Size(max = 100)
    private String fileName;

    /**
     */
    @Size(max = 100)
    private String url;

    /**
     */
    @Digits(integer= 3, fraction = 0)
    private Integer progress;

    /**
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program")
    private Program program;
}
