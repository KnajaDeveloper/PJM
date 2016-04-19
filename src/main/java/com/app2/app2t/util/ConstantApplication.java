package com.app2.app2t.util;

/**
 * Created by Kiki Kung on 19/4/2559.
 */
public class ConstantApplication {
    private static String TASK_STATUS_NEW = "N";
    private static String TASK_STATUS_READY = "R";
    private static String TASK_STATUS_COMPLETE = "C";

    public static String getTaskStatusNew(){
        return TASK_STATUS_NEW;
    }
    public static String getTaskStatusReady(){
        return TASK_STATUS_READY;
    }
    public static String getTaskStatusComplete(){
        return TASK_STATUS_COMPLETE;
    }
}
