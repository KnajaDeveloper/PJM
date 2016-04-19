CREATE VIEW "PJMRP01"  AS
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
empcode.EMP_CODE as EMPCODE,
empt.EMP_FIRST_NAME as T_FIRST_NAME,
empt.EMP_LAST_NAME as T_LAST_NAME,
empot.EMP_FIRST_NAME as OT_FIRST_NAME,
empot.EMP_LAST_NAME as OT_LAST_NAME,
empt.EM_TEAM as T_EM_TEAM,
empot.EM_TEAM as OT_EM_TEAM,
t.TASK_STATUS as T_STATUS,
ot.PROGRESS as OT_PROGRESS
FROM PLAN p
LEFT JOIN(
		SELECT
				p.TASK as t,
				p.OTHER_TASK as ot,
				t.TASK_COST as tcost,
				ot.TASK_COST as otcost,
				max(p.DATE_END) as date_max
				 from PLAN p
				 JOIN TASK t on t.id = p.TASK
			     LEFT JOIN OTHER_TASK ot ON ot.ID = p.OTHER_TASK
				 GROUP BY p.OTHER_TASK,p.TASK,t.TASK_COST,ot.TASK_COST
		UNION
		SELECT
				p.TASK as t,
				p.OTHER_TASK as ot,
				t.TASK_COST as tcost,
				ot.TASK_COST as otcost,
				max(p.DATE_END) as date_max
				from PLAN p
			     LEFT JOIN TASK t on t.id = p.TASK
				JOIN OTHER_TASK ot on ot.id = p.OTHER_TASK
				GROUP BY p.OTHER_TASK,p.TASK,t.TASK_COST,ot.TASK_COST
		) cut on (cut.date_max = p.DATE_END and cut.t = p.TASK )or (cut.date_max = p.DATE_END and cut.ot = p.OTHER_TASK)
LEFT JOIN OTHER_TASK ot on ot.id = p.OTHER_TASK
LEFT JOIN TASK t ON t.id = p.TASK
LEFT JOIN PROGRAM pro ON pro.id = t.PROGRAM
LEFT JOIN MODULE_PROJECT mop ON mop.id = pro.MODULE_PROJECT
LEFT JOIN PROJECT proj ON proj.id = mop.PROJECT
LEFT JOIN EMEMPLOYEE empt ON empt.EMP_CODE = t.EMP_CODE
LEFT JOIN EMEMPLOYEE empot ON empot.EMP_CODE = ot.EMP_CODE
LEFT JOIN (
SELECT EMP_CODE FROM TASK where EMP_CODE IS NOT NULL
UNION
SELECT EMP_CODE FROM OTHER_TASK where EMP_CODE IS NOT NULL) empcode on empcode.EMP_CODE = t.EMP_CODE or empcode.EMP_CODE = ot.EMP_CODE
ORDER BY EMPCODE,MONTH,D_END ASC;