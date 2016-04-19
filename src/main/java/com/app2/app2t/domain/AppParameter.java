package com.app2.app2t.domain;

import com.app2.app2t.base.BaseEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
@RooJson
public class AppParameter extends BaseEntity {

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
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "appParameter")
    private Set<ParameterDetail> parameterDetails = new HashSet<ParameterDetail>();
}
