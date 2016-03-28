package com.app2.app2t.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.Properties;


public class ApplicationConstant {
    public static  Logger LOGGER = LoggerFactory.getLogger(ApplicationConstant.class);
    public static  Properties connectProperties = null;
    public static  Properties connectProperties1 = null;

    public static  String PATH_PJM_IMAGE = "/tmp/HRMS/image/";
    public static  String PATH_PJM_FILE = "/tmp/HRMS/file/RC/";

    static {
        Resource resource = new ClassPathResource("/config.properties");

        try{
            connectProperties = PropertiesLoaderUtils.loadProperties(resource);
            PATH_PJM_IMAGE = ((connectProperties == null) ? PATH_PJM_IMAGE : (String)connectProperties.get("Path-HRMSServer"));
            connectProperties1 = PropertiesLoaderUtils.loadProperties(resource);
            PATH_PJM_FILE = ((connectProperties1 == null) ? PATH_PJM_FILE : (String)connectProperties1.get("PathFileRC-HRMSServer"));
        } catch (IOException e){
            LOGGER.error("Error : {}", e);
        }

    }
}
