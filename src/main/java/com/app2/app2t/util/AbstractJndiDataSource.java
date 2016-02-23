package com.app2.app2t.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by firstsut on 10/05/2015.
 */

public abstract class AbstractJndiDataSource {

    private DataSource dataSource;
    private Connection connection;
    private static Logger LOGGER = LoggerFactory.getLogger(AbstractJndiDataSource.class);

    //private final String JNDIName = "java:/comp/env/jdbc/HRMS";
    private final String JNDIName = "jdbc/HRMS";
    private Statement statement;
    private ResultSet resultSet;

    public AbstractJndiDataSource() {
        try{
            dataSource = (DataSource) new InitialContext().lookup(JNDIName);
            LOGGER.debug("== DataSource Is {} =="+dataSource);
        } catch (NamingException e) {
            e.printStackTrace();
            LOGGER.error("Exception : DataSource Not Lookup JNDIName",e.getMessage());
            //throw new RuntimeException(e);
        }
    }

    public DataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Connection getConnection() {
        try {
            connection = dataSource.getConnection();
        }catch(Exception e){
            LOGGER.error("Can 't get connection",e);
            throw new RuntimeException(e);
        }
        return connection;
    }

    public void setConnection(Connection connection) {
        this.connection = connection;
    }

    public Statement getStatement() {
        return statement;
    }

    public void setStatement(Statement statement) {
        this.statement = statement;
    }

    public ResultSet getResultSet() {
        return resultSet;
    }

    public void setResultSet(ResultSet resultSet) {
        this.resultSet = resultSet;
    }

    public  ResultSet getResultSetDataSource(String query){
        LOGGER.debug("== DataSource Is {} =="+dataSource);
        LOGGER.debug("String Query"+query);
        try {
            connection = dataSource.getConnection();
            LOGGER.debug(" == Connection  {} =="+connection);
            if(connection==null){
                LOGGER.debug("Exception : Connection Is Null");
                return null;
            }else{
                statement=connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
                resultSet=statement.executeQuery(query);
            }
        } catch (SQLException e) {
            LOGGER.error("Exception : Connection Not Connect",e);
        }finally {
            try {
                statement.close();
                connection.close();
            } catch (Exception e) {
                LOGGER.error("Exception : cannot close connection", e);
            }
        }
        LOGGER.debug("ResultSet"+resultSet);
        return resultSet;
    }
}
