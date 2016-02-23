package com.app2.app2t.util;


import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.export.JRXlsAbstractExporterParameter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;

// import java.sql.ResultSet;


public  class AbstractReportJasperXLS extends AbstractJndiDataSource {

	private static Logger LOGGER = LoggerFactory.getLogger(AbstractReportJasperXLS.class);

    @Autowired
    private MessageSource messageSource;

    PreparedStatement preparedStatement;

    public void exportReport(HttpServletRequest request,HttpServletResponse response,ModelAndView modelAndView,Map<String,Object> configure){
        ServletOutputStream outputStream = null;

        try {
            String reportFileName     = (String)configure.get("REPORT_FILE_NAME");
            String jasperFileName     = (String)configure.get("JASPER_FILE_NAME");
            Map<String,Object> params = (Map<String,Object>)configure.get("PARAM");
            String sqlQuery           = (String)configure.get("SQL_QUERY");

            InputStream reportStream = this.getClass().getClassLoader().getResourceAsStream("jasperreports/"+jasperFileName);

            JasperReport jr = (JasperReport) JRLoader.loadObject(reportStream);

            Connection connection = getConnection();
            preparedStatement = connection.prepareStatement(sqlQuery, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
            ResultSet resultSet = preparedStatement.executeQuery();

            JRResultSetDataSource resultSetDataSource = new JRResultSetDataSource(resultSet/*getResultSetDataSource(sqlQuery)*/);

            JasperPrint jp = JasperFillManager.fillReport(jr, params, resultSetDataSource);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            JRXlsExporter exporter = new JRXlsExporter();
            exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
            exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, baos);
            exporter.setParameter(JRXlsAbstractExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.FALSE);
            exporter.setParameter(JRXlsAbstractExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
            exporter.setParameter(JRXlsAbstractExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
            exporter.setParameter(JRXlsAbstractExporterParameter.IS_IGNORE_CELL_BORDER, Boolean.FALSE);
            exporter.exportReport();

            response.setHeader("Content-Disposition", "inline; filename=" + reportFileName);
            response.setContentType("application/vnd.ms-excel");
            response.setContentLength(baos.size());

            outputStream = response.getOutputStream();
            baos.writeTo(outputStream);
            outputStream.flush();

            reportStream.close();
            baos.close();
            outputStream.close();
            preparedStatement.close();
            connection.close();

        } catch (Exception jre) {
            LOGGER.error("Unable to process generate",jre);
            throw new RuntimeException(jre);
        }finally {
            try {
                IOUtils.closeQuietly(outputStream);

                // if(preparedStatement != null){
                //     preparedStatement.close();
                // }
                // if (getStatement() != null) {
                //     getStatement().close();
                // }
                // if (getConnection() != null) {

                //     getConnection().close();
                // }
            } catch (Exception e) {
                LOGGER.error("Close Connection Error",e);
                throw new RuntimeException("Close Connection Error",e);
            }
        }
    }

	public void exportReportByResultSet(HttpServletRequest request, HttpServletResponse response,ModelAndView modelAndView,Map<String,Object> configure,ResultSet resultSet) {
        ServletOutputStream outputStream = null;
        try {
            String reportFileName     = (String)configure.get("REPORT_FILE_NAME");
            String jasperFileName     = (String)configure.get("JASPER_FILE_NAME");
            Map<String,Object> params = (Map<String,Object>)configure.get("PARAM");
            // LOGGER.error("exportReportByResultSet {} reportStream");
            InputStream reportStream = this.getClass().getClassLoader().getResourceAsStream("jasperreports/"+jasperFileName);
            // LOGGER.error("exportReportByResultSet {} JasperReport");
            JasperReport jr = (JasperReport) JRLoader.loadObject(reportStream);
            // LOGGER.error("exportReportByResultSet {} JRResultSetDataSource");
            JRResultSetDataSource resultSetDataSource = new JRResultSetDataSource(resultSet);
            // LOGGER.error("exportReportByResultSet {} JasperPrint");
            JasperPrint jp = JasperFillManager.fillReport(jr, params, resultSetDataSource);
            // LOGGER.error("exportReportByResultSet {} ByteArrayOutputStream");
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            // LOGGER.error("exportReportByResultSet {} JRXlsExporter kCPE");
            JRXlsExporter exporter = new JRXlsExporter();
            // LOGGER.error("after new JRXlsExporter");
            exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
            // LOGGER.error("after JRExporterParameter.JASPER_PRINT");
            exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, baos);
            // LOGGER.error("after JRExporterParameter.OUTPUT_STREAM");
            exporter.setParameter(JRXlsAbstractExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.FALSE);
            exporter.setParameter(JRXlsAbstractExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
            exporter.setParameter(JRXlsAbstractExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
            exporter.setParameter(JRXlsAbstractExporterParameter.IS_IGNORE_CELL_BORDER, Boolean.FALSE);
            exporter.exportReport();

            // LOGGER.error("exportReportByResultSet {} response");
            response.setHeader("Content-Disposition", "inline; filename=" + reportFileName);
            response.setContentType("application/vnd.ms-excel");
            response.setContentLength(baos.size());
            // LOGGER.error("exportReportByResultSet {} outputStream");
            outputStream = response.getOutputStream();
            baos.writeTo(outputStream);
            outputStream.flush();

            // LOGGER.error("exportReportByResultSet {} reportStream");
            reportStream.close();
            baos.close();
            outputStream.close();

        } catch (Exception jre) {
            jre.printStackTrace();
            LOGGER.error("Unable to process generate",jre);
            throw new RuntimeException(jre);
        }
        finally {
            try{
                //may be can't gen in about line below
                IOUtils.closeQuietly(outputStream);
            }catch(Exception e){
                e.printStackTrace();

                LOGGER.error("exportReportByResultSet {} ",e );
            }


            // try {
            //     if (getStatement() != null) {
            //         getStatement().close();
            //     }
            //     if (getConnection() != null) {
            //         getConnection().close();
            //     }
            // } catch (Exception e) {
            //     LOGGER.error("Close Connection Error",e);
            //     throw new RuntimeException("Close Connection Error",e);
            // }
        }
    }

    public String getLabelFromPropertiesFile(String labelCode) {
        // TODO local change from user login
        return messageSource.getMessage(labelCode, null,
                LocaleContextHolder.getLocale());
    }

}