package com.app2.app2t.domain.pjm;

import com.app2.app2t.base.BaseEntity;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
@RooJson
public class ModuleProject extends BaseEntity {

    /**
     */
    @Size(max = 255)
    @NotNull
    private String moduleCode;

    /**
     */
    @Size(max = 255)
    @NotNull
    private String moduleName;

    /**
     */
    @Digits(integer = 7, fraction = 4)
    @NotNull
    private Double moduleCost;

    /**
     */
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @NotNull
    private Date dateStart;

    /**
     */
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @NotNull
    private Date dateEnd;

    /**
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project")
    private Project project;

    /**
     */
    @Size(max = 255)
    @NotNull
    private String moduleStatus;
    //Success
    //Not Success
}
