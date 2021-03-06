CREATE VIEW "PJMRP02" AS
select  t.TASK_CODE AS TASKCODE,
t.TASK_NAME as TASKNAME,
SUBSTR(CAST(DATE(t.DATE_START) AS CHAR(10)),9,2)||'/'||SUBSTR(CAST(DATE(t.DATE_START) AS CHAR(10)),6,2)||'/' as EN_TDATESTART,
SUBSTR(CAST(DATE(t.DATE_START) AS CHAR(10)),1,4) AS EN_TYEARSTART,
SUBSTR(CAST(DATE(t.DATE_END) AS CHAR(10)),9,2)||'/'||SUBSTR(CAST(DATE(t.DATE_END) AS CHAR(10)),6,2)||'/' as EN_TDATEEND,
SUBSTR(CAST(DATE(t.DATE_END) AS CHAR(10)),1,4) as EN_TYEAREND,
ty.TYPE_TASK_NAME as TYPE_NAME,
t.TASK_COST as TASKCOST,
t.PROGRESS as TPROGRESS,
mod.MODULE_NAME as MODULENAME,
pro.ID as PROJECTID,
pro.PROJECT_CODE as PROJECTCODE,
pro.PROJECT_NAME as PROJECTNAME,
mod.MODULE_CODE as MODULECODE
from PROJECT pro
INNER JOIN MODULE_PROJECT mod ON mod.PROJECT=pro.ID
INNER JOIN PROGRAM prog ON prog.MODULE_PROJECT=mod.ID
INNER JOIN TASK t ON t.PROGRAM=prog.ID
INNER JOIN TYPE_TASK ty on t.TYPE_TASK = ty.ID;