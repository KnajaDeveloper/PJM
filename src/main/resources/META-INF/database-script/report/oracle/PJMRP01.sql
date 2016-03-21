CREATE OR REPLACE FORCE VIEW "PJMRP01"  AS
SELECT p.id as PLAN_ID,
t.id as TASK_ID ,
ot.id as OT_ID,
t.TASK_NAME as T_NAME,
ot.TASK_NAME as OT_NAME,
mop.module_name AS MO_NAME,
SUBSTR(CAST(DATE(p.date_end) AS CHAR(10)),6,2) AS MONTH,
SUBSTR(CAST(DATE(p.DATE_START) AS CHAR(10)),9,2)||'/'||SUBSTR(CAST(DATE(p.DATE_START) AS CHAR(10)),6,2)||'/' as SUB_DATE_START,
SUBSTR(CAST(DATE(p.DATE_START) AS CHAR(10)),1,4) AS SUB_YEAR_START,
SUBSTR(CAST(DATE(p.DATE_END) AS CHAR(10)),9,2)||'/'||SUBSTR(CAST(DATE(p.DATE_END) AS CHAR(10)),6,2)||'/' as SUB_DATE_END,
SUBSTR(CAST(DATE(p.DATE_END) AS CHAR(10)),1,4)as SUB_YEAR_END,
proj.project_name as PRO_NAME,
p.DATE_START  as D_START,
p.DATE_END as D_END,
cut.tcost as T_COST,
cut.otcost as OT_COST,
t.EMP_CODE as TASK_EMPCODE,
ot.EMP_CODE as OT_EMPCODE
FROM PLAN p
LEFT JOIN(
		SELECT 	p.TASK,
				p.OTHER_TASK,
				t.TASK_COST as tcost,
				ot.TASK_COST as otcost,
				max(p.ID) as ID
				 from PLAN p
				 JOIN TASK t on t.id = p.TASK
			     LEFT JOIN OTHER_TASK ot ON ot.ID = p.OTHER_TASK
				 GROUP BY p.OTHER_TASK,p.TASK,t.TASK_COST,ot.TASK_COST
		UNION
		SELECT	p.TASK,
				p.OTHER_TASK,
				t.TASK_COST as tcost,
				ot.TASK_COST as otcost,
				max(p.ID) as ID
				from PLAN p
			     LEFT JOIN TASK t on t.id = p.TASK
				JOIN OTHER_TASK ot on ot.id = p.OTHER_TASK
				GROUP BY p.OTHER_TASK,p.TASK,t.TASK_COST,ot.TASK_COST
		) cut on cut.ID = p.id
LEFT JOIN OTHER_TASK ot on ot.id = p.OTHER_TASK
LEFT JOIN TASK t ON t.id = p.TASK
LEFT JOIN PROGRAM pro ON pro.id = t.PROGRAM
LEFT JOIN MODULE_PROJECT mop ON mop.id = pro.MODULE_PROJECT
LEFT JOIN PROJECT proj ON proj.id = mop.PROJECT;