// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.domain.pjm;

import com.app2.app2t.domain.pjm.ProjectManager;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect ProjectManager_Roo_Json {
    
    public String ProjectManager.toJson() {
        return new JSONSerializer()
        .exclude("*.class").serialize(this);
    }
    
    public String ProjectManager.toJson(String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(this);
    }
    
    public static ProjectManager ProjectManager.fromJsonToProjectManager(String json) {
        return new JSONDeserializer<ProjectManager>()
        .use(null, ProjectManager.class).deserialize(json);
    }
    
    public static String ProjectManager.toJsonArray(Collection<ProjectManager> collection) {
        return new JSONSerializer()
        .exclude("*.class").serialize(collection);
    }
    
    public static String ProjectManager.toJsonArray(Collection<ProjectManager> collection, String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(collection);
    }
    
    public static Collection<ProjectManager> ProjectManager.fromJsonArrayToProjectManagers(String json) {
        return new JSONDeserializer<List<ProjectManager>>()
        .use("values", ProjectManager.class).deserialize(json);
    }
    
}
