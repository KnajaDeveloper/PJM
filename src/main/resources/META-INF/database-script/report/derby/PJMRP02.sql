CREATE VIEW "PJMRP02" AS
select  TASK.TASK_CODE AS TASKCODE,
TASK.TASK_NAME as TASKNAME,
SUBSTR(CAST(DATE(TASK.DATE_START) AS CHAR(10)),9,2)||'/'||SUBSTR(CAST(DATE(TASK.DATE_START) AS CHAR(10)),6,2)||'/' as EN_TDATESTART,
SUBSTR(CAST(DATE(TASK.DATE_START) AS CHAR(10)),1,4) AS EN_TYEARSTART,
SUBSTR(CAST(DATE(TASK.DATE_END) AS CHAR(10)),9,2)||'/'||SUBSTR(CAST(DATE(TASK.DATE_END) AS CHAR(10)),6,2)||'/' as EN_TDATEEND,
SUBSTR(CAST(DATE(TASK.DATE_END) AS CHAR(10)),1,4) as EN_TYEAREND,
TASK.TASK_COST as TASKCOST,
MODULE_PROJECT.MODULE_NAME as MODULENAME,
PROJECT.ID as PROJECTID,
PROJECT.PROJECT_CODE as PROJECTCODE,
PROJECT.PROJECT_NAME as PROJECTNAME,
MODULE_PROJECT.MODULE_CODE as MODULECODE
from PROJECT
 RIGHT JOIN MODULE_PROJECT
ON MODULE_PROJECT.PROJECT=PROJECT.ID
INNER JOIN PROGRAM
ON PROGRAM.MODULE_PROJECT=MODULE_PROJECT.ID
INNER JOIN TASK
ON TASK.PROGRAM=PROGRAM.ID;