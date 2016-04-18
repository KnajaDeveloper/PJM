// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.FollowerTask;
import com.app2.app2t.domain.pjm.ImportanceTask;
import com.app2.app2t.domain.pjm.ModuleManager;
import com.app2.app2t.domain.pjm.ModuleMember;
import com.app2.app2t.domain.pjm.ModuleProject;
import com.app2.app2t.domain.pjm.OtherTask;
import com.app2.app2t.domain.pjm.Plan;
import com.app2.app2t.domain.pjm.Program;
import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.domain.pjm.ProjectManager;
import com.app2.app2t.domain.pjm.Task;
import com.app2.app2t.domain.pjm.TypeTask;
import com.app2.app2t.web.pjm.ApplicationConversionServiceFactoryBean;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;

privileged aspect ApplicationConversionServiceFactoryBean_Roo_ConversionService {
    
    declare @type: ApplicationConversionServiceFactoryBean: @Configurable;
    
    public Converter<FollowerTask, String> ApplicationConversionServiceFactoryBean.getFollowerTaskToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.FollowerTask, java.lang.String>() {
            public String convert(FollowerTask followerTask) {
                return new StringBuilder().append(followerTask.getCreatedBy()).append(' ').append(followerTask.getUpdatedBy()).append(' ').append(followerTask.getStatus()).append(' ').append(followerTask.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, FollowerTask> ApplicationConversionServiceFactoryBean.getIdToFollowerTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.FollowerTask>() {
            public com.app2.app2t.domain.pjm.FollowerTask convert(java.lang.Long id) {
                return FollowerTask.findFollowerTask(id);
            }
        };
    }
    
    public Converter<String, FollowerTask> ApplicationConversionServiceFactoryBean.getStringToFollowerTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.FollowerTask>() {
            public com.app2.app2t.domain.pjm.FollowerTask convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), FollowerTask.class);
            }
        };
    }
    
    public Converter<ImportanceTask, String> ApplicationConversionServiceFactoryBean.getImportanceTaskToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.ImportanceTask, java.lang.String>() {
            public String convert(ImportanceTask importanceTask) {
                return new StringBuilder().append(importanceTask.getCreatedBy()).append(' ').append(importanceTask.getUpdatedBy()).append(' ').append(importanceTask.getStatus()).append(' ').append(importanceTask.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, ImportanceTask> ApplicationConversionServiceFactoryBean.getIdToImportanceTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.ImportanceTask>() {
            public com.app2.app2t.domain.pjm.ImportanceTask convert(java.lang.Long id) {
                return ImportanceTask.findImportanceTask(id);
            }
        };
    }
    
    public Converter<String, ImportanceTask> ApplicationConversionServiceFactoryBean.getStringToImportanceTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.ImportanceTask>() {
            public com.app2.app2t.domain.pjm.ImportanceTask convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), ImportanceTask.class);
            }
        };
    }
    
    public Converter<ModuleManager, String> ApplicationConversionServiceFactoryBean.getModuleManagerToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.ModuleManager, java.lang.String>() {
            public String convert(ModuleManager moduleManager) {
                return new StringBuilder().append(moduleManager.getCreatedBy()).append(' ').append(moduleManager.getUpdatedBy()).append(' ').append(moduleManager.getStatus()).append(' ').append(moduleManager.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, ModuleManager> ApplicationConversionServiceFactoryBean.getIdToModuleManagerConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.ModuleManager>() {
            public com.app2.app2t.domain.pjm.ModuleManager convert(java.lang.Long id) {
                return ModuleManager.findModuleManager(id);
            }
        };
    }
    
    public Converter<String, ModuleManager> ApplicationConversionServiceFactoryBean.getStringToModuleManagerConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.ModuleManager>() {
            public com.app2.app2t.domain.pjm.ModuleManager convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), ModuleManager.class);
            }
        };
    }
    
    public Converter<ModuleMember, String> ApplicationConversionServiceFactoryBean.getModuleMemberToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.ModuleMember, java.lang.String>() {
            public String convert(ModuleMember moduleMember) {
                return new StringBuilder().append(moduleMember.getCreatedBy()).append(' ').append(moduleMember.getUpdatedBy()).append(' ').append(moduleMember.getStatus()).append(' ').append(moduleMember.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, ModuleMember> ApplicationConversionServiceFactoryBean.getIdToModuleMemberConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.ModuleMember>() {
            public com.app2.app2t.domain.pjm.ModuleMember convert(java.lang.Long id) {
                return ModuleMember.findModuleMember(id);
            }
        };
    }
    
    public Converter<String, ModuleMember> ApplicationConversionServiceFactoryBean.getStringToModuleMemberConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.ModuleMember>() {
            public com.app2.app2t.domain.pjm.ModuleMember convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), ModuleMember.class);
            }
        };
    }
    
    public Converter<ModuleProject, String> ApplicationConversionServiceFactoryBean.getModuleProjectToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.ModuleProject, java.lang.String>() {
            public String convert(ModuleProject moduleProject) {
                return new StringBuilder().append(moduleProject.getCreatedBy()).append(' ').append(moduleProject.getUpdatedBy()).append(' ').append(moduleProject.getStatus()).append(' ').append(moduleProject.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, ModuleProject> ApplicationConversionServiceFactoryBean.getIdToModuleProjectConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.ModuleProject>() {
            public com.app2.app2t.domain.pjm.ModuleProject convert(java.lang.Long id) {
                return ModuleProject.findModuleProject(id);
            }
        };
    }
    
    public Converter<String, ModuleProject> ApplicationConversionServiceFactoryBean.getStringToModuleProjectConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.ModuleProject>() {
            public com.app2.app2t.domain.pjm.ModuleProject convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), ModuleProject.class);
            }
        };
    }
    
    public Converter<OtherTask, String> ApplicationConversionServiceFactoryBean.getOtherTaskToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.OtherTask, java.lang.String>() {
            public String convert(OtherTask otherTask) {
                return new StringBuilder().append(otherTask.getCreatedBy()).append(' ').append(otherTask.getUpdatedBy()).append(' ').append(otherTask.getStatus()).append(' ').append(otherTask.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, OtherTask> ApplicationConversionServiceFactoryBean.getIdToOtherTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.OtherTask>() {
            public com.app2.app2t.domain.pjm.OtherTask convert(java.lang.Long id) {
                return OtherTask.findOtherTask(id);
            }
        };
    }
    
    public Converter<String, OtherTask> ApplicationConversionServiceFactoryBean.getStringToOtherTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.OtherTask>() {
            public com.app2.app2t.domain.pjm.OtherTask convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), OtherTask.class);
            }
        };
    }
    
    public Converter<Plan, String> ApplicationConversionServiceFactoryBean.getPlanToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.Plan, java.lang.String>() {
            public String convert(Plan plan) {
                return new StringBuilder().append(plan.getCreatedBy()).append(' ').append(plan.getUpdatedBy()).append(' ').append(plan.getStatus()).append(' ').append(plan.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, Plan> ApplicationConversionServiceFactoryBean.getIdToPlanConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.Plan>() {
            public com.app2.app2t.domain.pjm.Plan convert(java.lang.Long id) {
                return Plan.findPlan(id);
            }
        };
    }
    
    public Converter<String, Plan> ApplicationConversionServiceFactoryBean.getStringToPlanConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.Plan>() {
            public com.app2.app2t.domain.pjm.Plan convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), Plan.class);
            }
        };
    }
    
    public Converter<Program, String> ApplicationConversionServiceFactoryBean.getProgramToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.Program, java.lang.String>() {
            public String convert(Program program) {
                return new StringBuilder().append(program.getCreatedBy()).append(' ').append(program.getUpdatedBy()).append(' ').append(program.getStatus()).append(' ').append(program.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, Program> ApplicationConversionServiceFactoryBean.getIdToProgramConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.Program>() {
            public com.app2.app2t.domain.pjm.Program convert(java.lang.Long id) {
                return Program.findProgram(id);
            }
        };
    }
    
    public Converter<String, Program> ApplicationConversionServiceFactoryBean.getStringToProgramConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.Program>() {
            public com.app2.app2t.domain.pjm.Program convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), Program.class);
            }
        };
    }
    
    public Converter<Project, String> ApplicationConversionServiceFactoryBean.getProjectToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.Project, java.lang.String>() {
            public String convert(Project project) {
                return new StringBuilder().append(project.getCreatedBy()).append(' ').append(project.getUpdatedBy()).append(' ').append(project.getStatus()).append(' ').append(project.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, Project> ApplicationConversionServiceFactoryBean.getIdToProjectConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.Project>() {
            public com.app2.app2t.domain.pjm.Project convert(java.lang.Long id) {
                return Project.findProject(id);
            }
        };
    }
    
    public Converter<String, Project> ApplicationConversionServiceFactoryBean.getStringToProjectConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.Project>() {
            public com.app2.app2t.domain.pjm.Project convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), Project.class);
            }
        };
    }
    
    public Converter<ProjectManager, String> ApplicationConversionServiceFactoryBean.getProjectManagerToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.ProjectManager, java.lang.String>() {
            public String convert(ProjectManager projectManager) {
                return new StringBuilder().append(projectManager.getCreatedBy()).append(' ').append(projectManager.getUpdatedBy()).append(' ').append(projectManager.getStatus()).append(' ').append(projectManager.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, ProjectManager> ApplicationConversionServiceFactoryBean.getIdToProjectManagerConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.ProjectManager>() {
            public com.app2.app2t.domain.pjm.ProjectManager convert(java.lang.Long id) {
                return ProjectManager.findProjectManager(id);
            }
        };
    }
    
    public Converter<String, ProjectManager> ApplicationConversionServiceFactoryBean.getStringToProjectManagerConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.ProjectManager>() {
            public com.app2.app2t.domain.pjm.ProjectManager convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), ProjectManager.class);
            }
        };
    }
    
    public Converter<Task, String> ApplicationConversionServiceFactoryBean.getTaskToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.Task, java.lang.String>() {
            public String convert(Task task) {
                return new StringBuilder().append(task.getCreatedBy()).append(' ').append(task.getUpdatedBy()).append(' ').append(task.getStatus()).append(' ').append(task.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, Task> ApplicationConversionServiceFactoryBean.getIdToTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.Task>() {
            public com.app2.app2t.domain.pjm.Task convert(java.lang.Long id) {
                return Task.findTask(id);
            }
        };
    }
    
    public Converter<String, Task> ApplicationConversionServiceFactoryBean.getStringToTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.Task>() {
            public com.app2.app2t.domain.pjm.Task convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), Task.class);
            }
        };
    }
    
    public Converter<TypeTask, String> ApplicationConversionServiceFactoryBean.getTypeTaskToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.app2.app2t.domain.pjm.TypeTask, java.lang.String>() {
            public String convert(TypeTask typeTask) {
                return new StringBuilder().append(typeTask.getCreatedBy()).append(' ').append(typeTask.getUpdatedBy()).append(' ').append(typeTask.getStatus()).append(' ').append(typeTask.getCreatedDate()).toString();
            }
        };
    }
    
    public Converter<Long, TypeTask> ApplicationConversionServiceFactoryBean.getIdToTypeTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.app2.app2t.domain.pjm.TypeTask>() {
            public com.app2.app2t.domain.pjm.TypeTask convert(java.lang.Long id) {
                return TypeTask.findTypeTask(id);
            }
        };
    }
    
    public Converter<String, TypeTask> ApplicationConversionServiceFactoryBean.getStringToTypeTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.app2.app2t.domain.pjm.TypeTask>() {
            public com.app2.app2t.domain.pjm.TypeTask convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), TypeTask.class);
            }
        };
    }
    
    public void ApplicationConversionServiceFactoryBean.installLabelConverters(FormatterRegistry registry) {
        registry.addConverter(getFollowerTaskToStringConverter());
        registry.addConverter(getIdToFollowerTaskConverter());
        registry.addConverter(getStringToFollowerTaskConverter());
        registry.addConverter(getImportanceTaskToStringConverter());
        registry.addConverter(getIdToImportanceTaskConverter());
        registry.addConverter(getStringToImportanceTaskConverter());
        registry.addConverter(getModuleManagerToStringConverter());
        registry.addConverter(getIdToModuleManagerConverter());
        registry.addConverter(getStringToModuleManagerConverter());
        registry.addConverter(getModuleMemberToStringConverter());
        registry.addConverter(getIdToModuleMemberConverter());
        registry.addConverter(getStringToModuleMemberConverter());
        registry.addConverter(getModuleProjectToStringConverter());
        registry.addConverter(getIdToModuleProjectConverter());
        registry.addConverter(getStringToModuleProjectConverter());
        registry.addConverter(getOtherTaskToStringConverter());
        registry.addConverter(getIdToOtherTaskConverter());
        registry.addConverter(getStringToOtherTaskConverter());
        registry.addConverter(getPlanToStringConverter());
        registry.addConverter(getIdToPlanConverter());
        registry.addConverter(getStringToPlanConverter());
        registry.addConverter(getProgramToStringConverter());
        registry.addConverter(getIdToProgramConverter());
        registry.addConverter(getStringToProgramConverter());
        registry.addConverter(getProjectToStringConverter());
        registry.addConverter(getIdToProjectConverter());
        registry.addConverter(getStringToProjectConverter());
        registry.addConverter(getProjectManagerToStringConverter());
        registry.addConverter(getIdToProjectManagerConverter());
        registry.addConverter(getStringToProjectManagerConverter());
        registry.addConverter(getTaskToStringConverter());
        registry.addConverter(getIdToTaskConverter());
        registry.addConverter(getStringToTaskConverter());
        registry.addConverter(getTypeTaskToStringConverter());
        registry.addConverter(getIdToTypeTaskConverter());
        registry.addConverter(getStringToTypeTaskConverter());
    }
    
    public void ApplicationConversionServiceFactoryBean.afterPropertiesSet() {
        super.afterPropertiesSet();
        installLabelConverters(getObject());
    }
    
}
