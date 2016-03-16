package com.app2.app2t.web.report;

import com.app2.app2t.service.EmRestService;
import com.app2.app2t.util.AbstractReportJasperXLS;
import com.app2.app2t.util.AuthorizeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequestMapping("/reports")
@Controller
public class ReportController extends AbstractReportJasperXLS {

    protected Logger LOGGER = LoggerFactory.getLogger(ReportController.class);

    @Autowired
    EmRestService emRestService;

//------JSPX 001----------------------------------------------------------------------------------------

    @RequestMapping(value = "/PJMRP01", produces = "text/html")
    public String PJMRP01(Model uiModel) {

        return "reports/PJMRP01";
    }

    //------JSPX 002----------------------------------------------------------------------------------------

    @RequestMapping(value = "/PJMRP02", produces = "text/html")
    public String PJMRP02(Model uiModel) {

        return "reports/PJMRP02";
    }


//------Export 01--------------------------------------------------------------------------------------

    @RequestMapping(value = "/exportPJMRP01", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public void testExport(HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView
                           //value รับค่าจาก js เก็บ string ตรงกับใน function
            , @RequestParam(value = "empCode", required = false) String empCode
            , @RequestParam(value = "dateStartBase", required = false) String dateStartBase
            , @RequestParam(value = "dateEndBase", required = false) String dateEndBase
            , @RequestParam(value = "dateStart", required = false) String dateStart
            , @RequestParam(value = "dateEnd", required = false) String dateEnd
            , @RequestParam(value = "printDate", required = false) String printDate
            , @RequestParam(value = "plusYear", required = false) Integer plusYear


    ) throws ParseException {
        LOGGER.debug(dateStartBase);
        LOGGER.debug(dateEndBase);
//-------------------------------------------------------------------------------------
        List<Map> listMap = emRestService.getEmpNameByEmpCode(empCode);
        Map<String, String> map = listMap.get(0);

        String Fname = map.get("Fname");
        String Lname = map.get("Lname");

        LOGGER.debug(Fname);
        LOGGER.debug(Lname);

//-------------------------------------------------------------------------------------
        //emRestService.getEmpNameByUserName(AuthorizeUtil.getUserName()) ส่งไป service
        //List<Map> listMapp return มาเก็บไว้ ใน listmapp
        List<Map> listMapp = emRestService.getEmpNameByUserName(AuthorizeUtil.getUserName());
        Map<String, String> mapp = listMapp.get(0);

        String UFname = mapp.get("UFname");
        String ULname = mapp.get("ULname");

        LOGGER.debug(UFname);
        LOGGER.debug(ULname);

        Integer number = 1;
        String reportName = "PJMRP01";
        String reportFileName = "PJMRP01.xls";
        String jasperFileName = "PJMRP01.jasper";


        Map<String, Object> params = new HashMap<String, Object>();
        params.put("fTitle", getLabelFromPropertiesFile("L0002"));
        params.put("fempName", getLabelFromPropertiesFile("L0003"));
        params.put("fDateStart", getLabelFromPropertiesFile("L0004"));
        params.put("fDateEnd", getLabelFromPropertiesFile("L0005"));
        params.put("fPrintName", getLabelFromPropertiesFile("L0006"));
        params.put("fPrintDate", getLabelFromPropertiesFile("L0007"));
        params.put("fProjectName", getLabelFromPropertiesFile("L0008"));
        params.put("fModuleName", getLabelFromPropertiesFile("L0009"));
        params.put("tDateStart", getLabelFromPropertiesFile("L0010"));
        params.put("tDateEnd", getLabelFromPropertiesFile("L0011"));
        params.put("January", getLabelFromPropertiesFile("L0013"));
        params.put("February", getLabelFromPropertiesFile("L0014"));
        params.put("March", getLabelFromPropertiesFile("L0015"));
        params.put("April", getLabelFromPropertiesFile("L0016"));
        params.put("May", getLabelFromPropertiesFile("L0017"));
        params.put("June", getLabelFromPropertiesFile("L0018"));
        params.put("July", getLabelFromPropertiesFile("L0019"));
        params.put("August", getLabelFromPropertiesFile("L0020"));
        params.put("September", getLabelFromPropertiesFile("L0021"));
        params.put("October", getLabelFromPropertiesFile("L0022"));
        params.put("November", getLabelFromPropertiesFile("L0023"));
        params.put("December", getLabelFromPropertiesFile("L0024"));
        params.put("Error", getLabelFromPropertiesFile("L0025"));
        params.put("fTaskName", getLabelFromPropertiesFile("L0028"));
        params.put("tPoint", getLabelFromPropertiesFile("L0030"));
        params.put("otherTask", getLabelFromPropertiesFile("L0053"));
        params.put("totalTask", getLabelFromPropertiesFile("L0012"));
        params.put("totalOT", getLabelFromPropertiesFile("L0066"));
        params.put("dateStart", dateStart);
        params.put("dateEnd", dateEnd);
        params.put("printDate", printDate);
        params.put("PlusYear", plusYear);
        params.put("EmpFirstName", Fname);
        params.put("EmpLastName", Lname);
        params.put("printFName", UFname);
        params.put("printLName", ULname);


        StringBuilder sqlQuery = new StringBuilder();

        // where ตรงกับตอน2 สร้าง view VIEW PJMRP01 (TASKNAME,MODULENAME,MONTH,PROJECTNAME,DATEEND,DATESTART,PROJECTCOST) AS
        sqlQuery.append(" SELECT * FROM PJMRP01 WHERE TASK_EMPCODE = ? OR OT_EMPCODE = ?  ");
        sqlQuery.append(" and D_START >= ? and D_END <= ? ");
        sqlQuery.append(" ORDER BY MONTH,D_END ASC");

        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        Date datestart = format.parse(dateStartBase);
        Date dateend = format.parse(dateEndBase);


        //       LOGGER.error("sql >> {}",sqlQuery.toString());
        try {
            Connection c = this.getConnection();
            PreparedStatement preparedStatement = c.prepareStatement(sqlQuery.toString(), ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
            preparedStatement.setString(number++, empCode);
            preparedStatement.setString(number++, empCode);
            preparedStatement.setDate(number++, new java.sql.Date(datestart.getTime()));
            preparedStatement.setDate(number++, new java.sql.Date(dateend.getTime()));


            ResultSet resultSet = preparedStatement.executeQuery();
            Map<String, Object> configure = new HashMap<>();
            configure.put("REPORT_NAME", reportName);
            configure.put("REPORT_FILE_NAME", reportFileName);
            configure.put("JASPER_FILE_NAME", jasperFileName);
            configure.put("PARAM", params);
            configure.put("SQL_QUERY", sqlQuery.toString());
            exportReportByResultSet(request, response, modelAndView, configure, resultSet);
            preparedStatement.close();
            c.close();
        } catch (Exception e) {
            LOGGER.error("Can't generate PJMRP01", e);
            throw new RuntimeException(e);
        }
    }


//------Export 002--------------------------------------------------------------------------------------

    @RequestMapping(value = "/exportPJMRP02", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public void testExport(HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView
            , @RequestParam(value = "projectId", required = false) String projectId
            , @RequestParam(value = "moduleCode", required = false) String moduleCode
            , @RequestParam(value = "moduleName", required = false) String moduleName
            , @RequestParam(value = "printDate", required = false) String printDate


    ) throws ParseException{

        //-------------------------------------------------------------------------------------
        //emRestService.getEmpNameByUserName(AuthorizeUtil.getUserName()) ส่งไป service
        //List<Map> listMapp return มาเก็บไว้ ใน listmapp
        List<Map> listMapp = emRestService.getEmpNameByUserName(AuthorizeUtil.getUserName());
        Map<String, String> mapp = listMapp.get(0);

        String UFname = mapp.get("UFname");
        String ULname = mapp.get("ULname");

        LOGGER.debug(UFname);
        LOGGER.debug(ULname);


        Integer number = 1;
        String reportName = "PJMRP02";
        String reportFileName = "PJMRP02.xls";
        String jasperFileName = "PJMRP02.jasper";


        Map<String, Object> params = new HashMap<String, Object>();
        params.put("fTitle",getLabelFromPropertiesFile("L0026"));
        params.put("fProjectName",getLabelFromPropertiesFile("L0008"));
        params.put("fModuleName",getLabelFromPropertiesFile("L0009"));
        params.put("fempName",getLabelFromPropertiesFile("L0003"));
        params.put("fPrintName",getLabelFromPropertiesFile("L0006"));
        params.put("fPrintDate",getLabelFromPropertiesFile("L0007"));
        params.put("tDateStart",getLabelFromPropertiesFile("L0010"));
        params.put("tDateEnd",getLabelFromPropertiesFile("L0011"));
        params.put("total",getLabelFromPropertiesFile("L0067"));
        params.put("fProjectName",getLabelFromPropertiesFile("L0027"));
        params.put("fTaskCode",getLabelFromPropertiesFile("L0033"));
        params.put("fTaskName",getLabelFromPropertiesFile("L0034"));
        params.put("tPoint",getLabelFromPropertiesFile("L0030"));
        params.put("moduleName",moduleName);
        params.put("printDate",printDate);
        params.put("printFName", UFname);
        params.put("printLName", ULname);

        StringBuilder sqlQuery = new StringBuilder();

        // where ตรงกับตอน2 สร้าง view VIEW PJMRP02 (TASKNAME,MODULENAME,MONTH,PROJECTNAME,DATEEND,DATESTART,PROJECTCOST) AS
        if (moduleCode.equals("NULL") ) {
            sqlQuery.append(" SELECT * FROM PJMRP02 WHERE PROJECTID = ? ");
        }else {
            sqlQuery.append(" SELECT * FROM PJMRP02 WHERE PROJECTID = ? ");
            sqlQuery.append(" and MODULECODE = ? ");
        }




        //       LOGGER.error("sql >> {}",sqlQuery.toString());
        try{
            Connection c = this.getConnection();
            PreparedStatement preparedStatement = c.prepareStatement(sqlQuery.toString(), ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
            if (moduleCode.equals("NULL")) {
            preparedStatement.setString(number++, projectId);
            }else {
                preparedStatement.setString(number++, projectId);
            preparedStatement.setString(number++, moduleCode);
            }

            ResultSet resultSet = preparedStatement.executeQuery();
            Map<String, Object> configure = new HashMap<>();
            configure.put("REPORT_NAME", reportName);
            configure.put("REPORT_FILE_NAME", reportFileName);
            configure.put("JASPER_FILE_NAME", jasperFileName);
            configure.put("PARAM", params);
            configure.put("SQL_QUERY", sqlQuery.toString());
            exportReportByResultSet(request, response, modelAndView, configure, resultSet);
            preparedStatement.close();
            c.close();
        }catch(Exception e){
            LOGGER.error("Can't generate PJMRP02",e);
            throw new RuntimeException(e);
        }
    }

}