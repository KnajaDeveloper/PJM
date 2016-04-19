package com.app2.app2t.domain;

import com.app2.app2t.base.BaseEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
@RooJson
public class ParameterDetail extends BaseEntity {

    /**
     */
    @NotNull
    @Column(unique = true)
    @Size(max = 255)
    private String code;

    /**
     */
    @Size(max = 255)
    private String parameterDescription;

    /**
     */
    @Size(max = 255)
    private String parameterValue1;

    /**
     */
    @Size(max = 255)
    private String parameterValue2;

    /**
     */
    @Size(max = 255)
    private String parameterValue3;

    /**
     */
    @Size(max = 255)
    private String parameterValue4;

    /**
     */
    @Size(max = 255)
    private String parameterValue5;

    /**
     */
    @Size(max = 255)
    private String parameterValue6;

    /**
     */
    @Size(max = 255)
    private String parameterValue7;

    /**
     */
    @Size(max = 255)
    private String parameterValue8;

    /**
     */
    @Size(max = 255)
    private String parameterValue9;

    /**
     */
    @Size(max = 255)
    private String parameterValue10;

    /**
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "appParameter")
    private AppParameter appParameter;
}
