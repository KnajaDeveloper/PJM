package com.app2.app2t.domain.pjm;

import com.app2.app2t.base.BaseEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
@RooJson
public class TypeTask extends BaseEntity {

    /**
     */
    @NotNull
    @Size(max = 255)
    @Column(unique = true)
    private String typeTaskCode;

    /**
     */
    @NotNull
    @Size(max = 255)
    private String typeTaskName;
}
