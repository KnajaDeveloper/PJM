package com.app2.app2t.util;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Component
@Scope(value = "session",proxyMode = ScopedProxyMode.TARGET_CLASS)
public class AuthorizeUtil {
    private static String userName = null;
    private Map empData = new HashMap();
    private List<Map> listMenu = new ArrayList<>();

    public static String getUserName() {
        if(userName == null) {
            userName = SecurityContextHolder.getContext().getAuthentication().getName();
        }
        return userName;
    }
    public static void setUserName(String name){
        userName = name;
    }

    public Map getEmpData() {
        return empData;
    }
    public void setEmpDate(List<Map> empDataList) {
        empData = empDataList.get(0);   // get first if more than 1 record
    }

    public List<Map> getMenuList(){
        return listMenu;
    }
    public void setMenuList(List<Map> menuList){
        listMenu = menuList;
    }
}
