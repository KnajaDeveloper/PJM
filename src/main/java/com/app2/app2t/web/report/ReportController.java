package com.app2.app2t.web.report;

import com.app2.app2t.service.EmRestService;
import com.app2.app2t.util.AbstractReportJasperXLS;
import com.app2.app2t.util.AuthorizeUtil;
import com.app2.app2t.util.ConstantApplication;
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
            , @RequestParam(value = "empCodeFrom", required = false) String empCodeFrom
            , @RequestParam(value = "empCodeFromCheck", required = false) String empCodeFromCheck
            , @RequestParam(value = "empCodeTo", required = false) String empCodeTo
            , @RequestParam(value = "empCodeToCheck", required = false) String empCodeToCheck
            , @RequestParam(value = "team", required = false) String team
            , @RequestParam(value = "teamCheck", required = false) String teamCheck
            , @RequestParam(value = "teamBase", required = false) String teamBase
            , @RequestParam(value = "dateStartBase", required = false) String dateStartBase
            , @RequestParam(value = "dateEndBase", required = false) String dateEndBase
            , @RequestParam(value = "dateStart", required = false) String dateStart
            , @RequestParam(value = "dateEnd", required = false) String dateEnd
            , @RequestParam(value = "printDate", required = false) String printDate
            , @RequestParam(value = "plusYear", required = false) Integer plusYear


    ) throws ParseException {
        LOGGER.debug(dateStartBase);
        LOGGER.debug(dateEndBase);
        LOGGER.debug(teamBase);
//-------------------------------------------------------------------------------------
//        List<Map> listMap = emRestService.getEmpNameByEmpCode(empCodeFrom);
//        Map<String, String> map = listMap.get(0);
//
//
//        String Fname = map.get("Fname");
//        String Lname = map.get("Lname");
//
//        LOGGER.debug(Fname);
//        LOGGER.debug(Lname);

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
        params.put("fTeam", getLabelFromPropertiesFile("L0131"));
        params.put("fEmpFrom", getLabelFromPropertiesFile("L0001"));
        params.put("fEmpTo", getLabelFromPropertiesFile("L0005"));
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
        params.put("totalTaskAll", getLabelFromPropertiesFile("L0126"));
        params.put("totalOtAll", getLabelFromPropertiesFile("L0127"));
        params.put("totalAll", getLabelFromPropertiesFile("L0128"));
        params.put("total", getLabelFromPropertiesFile("L0067"));
        params.put("summaryPointEmp", getLabelFromPropertiesFile("L0136"));
        params.put("fReportCode", getLabelFromPropertiesFile("L0141"));
        params.put("reportCode", getLabelFromPropertiesFile("L0142"));
        params.put("dateStart", dateStart);
        params.put("dateEnd", dateEnd);
        params.put("printDate", printDate);
        params.put("PlusYear", plusYear);
        params.put("Team", team);
        params.put("EmpFrom", empCodeFrom);
        params.put("EmpTo", empCodeTo);
        params.put("printFName", UFname);
        params.put("printLName", ULname);
        params.put("c", ConstantApplication.getTaskStatusComplete());


        StringBuilder sqlQuery = new StringBuilder();

        // where ตรงกับตอน สร้าง view VIEW PJMRP01 (TASKNAME,MODULENAME,MONTH,PROJECTNAME,DATEEND,DATESTART,PROJECTCOST) AS
        if (teamCheck.equals("")) {
            if (empCodeFromCheck.equals("") && empCodeToCheck.equals("")) {
                sqlQuery.append(" SELECT * FROM PJMRP01 WHERE (D_START >= ? and D_END <= ?) ");
            } else if (empCodeToCheck.equals("")) {
                sqlQuery.append(" SELECT * FROM PJMRP01 WHERE (EMPCODE  >=  ? )");//from
                sqlQuery.append(" and (D_START >= ? and D_END <= ?) ");
            } else if (empCodeFromCheck.equals("")) {
                sqlQuery.append(" SELECT * FROM PJMRP01 WHERE (EMPCODE  <=  ? )");//to
                sqlQuery.append(" and (D_START >= ? and D_END <= ?) ");
            } else {
                sqlQuery.append(" SELECT * FROM PJMRP01 WHERE (EMPCODE  >=  ?  and EMPCODE <= ? )");
                sqlQuery.append(" and (D_START >= ? and D_END <= ?) ");
            }
        } else if (teamCheck.equals("C")) {
            if (empCodeFromCheck.equals("C")) {
                if (empCodeToCheck.equals("")) {
                    sqlQuery.append(" SELECT * FROM PJMRP01 WHERE (T_EM_TEAM  =  ? OR OT_EM_TEAM  =  ?)");
                    sqlQuery.append(" and (EMPCODE  >=  ?  ) ");//from
                    sqlQuery.append(" and (D_START >= ? and D_END <= ?) ");
                } else if (empCodeToCheck.equals("C")) {
                    sqlQuery.append(" SELECT * FROM PJMRP01 WHERE (T_EM_TEAM  =  ? OR OT_EM_TEAM  =  ?)");
                    sqlQuery.append(" and (EMPCODE  >=  ?  and EMPCODE <= ? ) ");
                    sqlQuery.append(" and (D_START >= ? and D_END <= ?) ");
                }
            } else if (empCodeToCheck.equals("C")) {
                if (empCodeFromCheck.equals("")) {
                    sqlQuery.append(" SELECT * FROM PJMRP01 WHERE (T_EM_TEAM  =  ? OR OT_EM_TEAM  =  ?)");
                    sqlQuery.append(" and (EMPCODE  <=  ?  ) ");//to
                    sqlQuery.append(" and (D_START >= ? and D_END <= ?) ");
                } else if (empCodeFromCheck.equals("C")) {
                    sqlQuery.append(" SELECT * FROM PJMRP01 WHERE (T_EM_TEAM  =  ? OR OT_EM_TEAM  =  ?)");
                    sqlQuery.append(" and (EMPCODE  >=  ?  and EMPCODE <= ? ) ");
                    sqlQuery.append(" and (D_START >= ? and D_END <= ?) ");
                }

            } else if (empCodeFromCheck.equals("") && empCodeToCheck.equals("")) {
                sqlQuery.append(" SELECT * FROM PJMRP01 WHERE (T_EM_TEAM  =  ? OR OT_EM_TEAM  =  ?)");
                sqlQuery.append(" and (D_START >= ? and D_END <= ?) ");
            }
        }


        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        Date datestart = format.parse(dateStartBase);
        Date dateend = format.parse(dateEndBase);


        //       LOGGER.error("sql >> {}",sqlQuery.toString());
        try {
            Connection c = this.getConnection();
            PreparedStatement preparedStatement = c.prepareStatement(sqlQuery.toString(), ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);

            if (teamCheck.equals("")) {
                if (empCodeFromCheck.equals("") && empCodeToCheck.equals("")) {
                    preparedStatement.setDate(number++, new java.sql.Date(datestart.getTime()));
                    preparedStatement.setDate(number++, new java.sql.Date(dateend.getTime()));
                } else if (empCodeToCheck.equals("")) {
                    preparedStatement.setString(number++, empCodeFrom);
                    preparedStatement.setDate(number++, new java.sql.Date(datestart.getTime()));
                    preparedStatement.setDate(number++, new java.sql.Date(dateend.getTime()));
                } else if (empCodeFromCheck.equals("")) {
                    preparedStatement.setString(number++, empCodeTo);
                    preparedStatement.setDate(number++, new java.sql.Date(datestart.getTime()));
                    preparedStatement.setDate(number++, new java.sql.Date(dateend.getTime()));
                } else {
                    preparedStatement.setString(number++, empCodeFrom);
                    preparedStatement.setString(number++, empCodeTo);
                    preparedStatement.setDate(number++, new java.sql.Date(datestart.getTime()));
                    preparedStatement.setDate(number++, new java.sql.Date(dateend.getTime()));
                }
            } else if (teamCheck.equals("C")) {
                if (empCodeFromCheck.equals("C")) {
                    if (empCodeToCheck.equals("")) {
                        preparedStatement.setString(number++, teamBase);
                        preparedStatement.setString(number++, teamBase);
                        preparedStatement.setString(number++, empCodeFrom);
                        preparedStatement.setDate(number++, new java.sql.Date(datestart.getTime()));
                        preparedStatement.setDate(number++, new java.sql.Date(dateend.getTime()));
                    } else if (empCodeToCheck.equals("C")) {
                        preparedStatement.setString(number++, teamBase);
                        preparedStatement.setString(number++, teamBase);
                        preparedStatement.setString(number++, empCodeFrom);
                        preparedStatement.setString(number++, empCodeTo);
                        preparedStatement.setDate(number++, new java.sql.Date(datestart.getTime()));
                        preparedStatement.setDate(number++, new java.sql.Date(dateend.getTime()));
                    }
                } else if (empCodeToCheck.equals("C")) {
                    if (empCodeFromCheck.equals("")) {
                        preparedStatement.setString(number++, teamBase);
                        preparedStatement.setString(number++, teamBase);
                        preparedStatement.setString(number++, empCodeTo);
                        preparedStatement.setDate(number++, new java.sql.Date(datestart.getTime()));
                        preparedStatement.setDate(number++, new java.sql.Date(dateend.getTime()));
                    } else if (empCodeFromCheck.equals("C")) {
                        preparedStatement.setString(number++, teamBase);
                        preparedStatement.setString(number++, teamBase);
                        preparedStatement.setString(number++, empCodeFrom);
                        preparedStatement.setString(number++, empCodeTo);
                        preparedStatement.setDate(number++, new java.sql.Date(datestart.getTime()));
                        preparedStatement.setDate(number++, new java.sql.Date(dateend.getTime()));
                    }
                } else if (empCodeFromCheck.equals("") && empCodeToCheck.equals("")) {
                    preparedStatement.setString(number++, teamBase);
                    preparedStatement.setString(number++, teamBase);
                    preparedStatement.setDate(number++, new java.sql.Date(datestart.getTime()));
                    preparedStatement.setDate(number++, new java.sql.Date(dateend.getTime()));
                }
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
            , @RequestParam(value = "projectName", required = false) String projectName
            , @RequestParam(value = "moduleCode", required = false) String moduleCode
            , @RequestParam(value = "moduleName", required = false) String moduleName
            , @RequestParam(value = "printDate", required = false) String printDate
            , @RequestParam(value = "plusYear", required = false) Integer plusYear

    ) throws ParseException {

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
        params.put("fTitle", getLabelFromPropertiesFile("L0026"));
        params.put("fProjectName", getLabelFromPropertiesFile("L0008"));
        params.put("fModuleName", getLabelFromPropertiesFile("L0009"));
        params.put("fempName", getLabelFromPropertiesFile("L0003"));
        params.put("fPrintName", getLabelFromPropertiesFile("L0006"));
        params.put("fPrintDate", getLabelFromPropertiesFile("L0007"));
        params.put("tDateStart", getLabelFromPropertiesFile("L0010"));
        params.put("tDateEnd", getLabelFromPropertiesFile("L0011"));
        params.put("total", getLabelFromPropertiesFile("L0067"));
        params.put("fProjectName", getLabelFromPropertiesFile("L0027"));
        params.put("fTaskCode", getLabelFromPropertiesFile("L0033"));
        params.put("fTaskName", getLabelFromPropertiesFile("L0034"));
        params.put("tPoint", getLabelFromPropertiesFile("L0030"));
        params.put("totalAll", getLabelFromPropertiesFile("L0128"));
        params.put("summaryPointProject", getLabelFromPropertiesFile("L0137"));
        params.put("fReportCode", getLabelFromPropertiesFile("L0141"));
        params.put("reportCode", getLabelFromPropertiesFile("L0143"));
        params.put("tProgress", getLabelFromPropertiesFile("L0037"));
        params.put("projectName", projectName);
        params.put("moduleName", moduleName);
        params.put("printDate", printDate);
        params.put("PlusYear", plusYear);
        params.put("printFName", UFname);
        params.put("printLName", ULname);

        StringBuilder sqlQuery = new StringBuilder();

        // where ตรงกับตอน2 สร้าง view VIEW PJMRP02 (TASKNAME,MODULENAME,MONTH,PROJECTNAME,DATEEND,DATESTART,PROJECTCOST) AS
        if (moduleCode.equals("")) {
            sqlQuery.append(" SELECT * FROM PJMRP02 WHERE PROJECTID = ? ");
        } else {
            sqlQuery.append(" SELECT * FROM PJMRP02 WHERE PROJECTID = ? ");
            sqlQuery.append(" and MODULECODE = ? ");
        }


        //       LOGGER.error("sql >> {}",sqlQuery.toString());
        try {
            Connection c = this.getConnection();
            PreparedStatement preparedStatement = c.prepareStatement(sqlQuery.toString(), ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
            if (moduleCode.equals("")) {
                preparedStatement.setString(number++, projectId);
            } else {
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
        } catch (Exception e) {
            LOGGER.error("Can't generate PJMRP02", e);
            throw new RuntimeException(e);
        }
    }

}